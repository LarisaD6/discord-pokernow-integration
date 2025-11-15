import { SlashCommandBuilder } from 'discord.js';
import { addWin, addLoss } from '../db.js';

export const data = new SlashCommandBuilder()
  .setName('reportwin')
  .setDescription('Record match results: winner and optional losers/chips')
  .addUserOption(opt =>
    opt.setName('winner')
      .setDescription('Winner of the match/hand/session')
      .setRequired(true)
  )
  .addIntegerOption(opt =>
    opt.setName('chips_delta')
      .setDescription('Chip change for the winner (optional)')
  )
  .addUserOption(opt =>
    opt.setName('loser')
      .setDescription('Optional loser to record')
  )
  .addIntegerOption(opt =>
    opt.setName('loser_chips_delta')
      .setDescription('Chip change for the loser (optional, usually negative)')
  );

export async function execute(interaction) {
  // Permissions: only allow admins or a specific role, if needed
  // Example (optional): if (!interaction.memberPermissions.has('Administrator')) { ... }

  const winner = interaction.options.getUser('winner', true);
  const chipsDelta = interaction.options.getInteger('chips_delta') ?? 0;

  const loser = interaction.options.getUser('loser');
  const loserChipsDelta = interaction.options.getInteger('loser_chips_delta') ?? 0;

  // Winner update
  await addWin({
    userId: winner.id,
    username: winner.username,
    chipsDelta
  });

  // Optional loser update
  if (loser) {
    await addLoss({
      userId: loser.id,
      username: loser.username,
      chipsDelta: loserChipsDelta
    });
  }

  const msg = [
    `Recorded: 🏆 ${winner.username} +${chipsDelta} chips`,
    loser ? `; ❌ ${loser.username} ${loserChipsDelta} chips` : ''
  ].join('');

  return interaction.reply({ content: msg, ephemeral: false });
}
