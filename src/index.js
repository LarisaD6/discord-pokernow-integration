import 'dotenv/config';
import { Client, Collection, GatewayIntentBits, REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Load commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

const commandsForRegistration = [];
for (const file of commandFiles) {
  const cmd = await import(path.join(commandsPath, file));
  if (cmd.data && cmd.execute) {
    client.commands.set(cmd.data.name, cmd);
    commandsForRegistration.push(cmd.data.toJSON());
  }
}

// Deploy slash commands when `node src/index.js deploy`
if (process.argv[2] === 'deploy') {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  const clientId = process.env.DISCORD_CLIENT_ID;
  const guildId = process.env.DISCORD_GUILD_ID;

  (async () => {
    try {
      if (guildId) {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandsForRegistration });
        console.log('✅ Guild commands deployed.');
      } else {
        await rest.put(Routes.applicationCommands(clientId), { body: commandsForRegistration });
        console.log('✅ Global commands deployed (may take up to 1 hour).');
      }
      process.exit(0);
    } catch (err) {
      console.error('Command deployment failed:', err);
      process.exit(1);
    }
  })();
} else {
  client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
  });

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.deferred || interaction.replied) {
        await interaction.followUp({ content: 'There was an error executing this command.', ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
      }
    }
  });

  client.login(process.env.DISCORD_TOKEN);
}
