import { SlashCommandBuilder } from 'discord.js';
import { getTopByWins } from '../db.js';

export const data = new SlashCommandBuilder()
  .setName('leaderboard')
  .setDescription('Show top poker players by wins')
  .addIntegerOption(opt =>
    opt.setName('limit')
      .setDescription('How many players to show (default 10)')
      .setMinValue(3)
      .setMaxValue(25)
  );

export async function execute(interaction) {
  const limit = interaction.options.getInteger('limit') ?? 10;
  const top = await getTopByWins(limit);

  if (!top.length) {
    return interaction.reply({ content: 'No results yet. Play a game and report wins to build the leaderboard.', ephemeral: true });
  }

  const lines = top.map((p, i) =>
    `#${i + 1} — ${p.username ?? p.user_id}: ${p.wins} wins, ${p.losses} losses, ${p.chips} chips`
  );

  return interaction.reply({
    content: `Top players (by wins):\n${lines.join('\n')}`,
    ephemeral: false
  });
}
