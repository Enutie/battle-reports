require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  Collection,
  REST,
  Routes,
  Events,
} = require('discord.js');
const battlereportCommand = require('./commands/battlereport');
const { handleSelectMenu, handleModal, handleButton } = require('./handlers/modalHandler');

// Create Discord client
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Store commands
client.commands = new Collection();
client.commands.set(battlereportCommand.data.name, battlereportCommand);

// Session storage for ongoing battle reports (keyed by user ID)
const sessions = new Map();

// Register slash commands
async function registerCommands() {
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  try {
    console.log('🔄 Registering slash commands...');

    const commands = [battlereportCommand.data.toJSON()];

    if (process.env.GUILD_ID) {
      // Register to specific guild (faster for development)
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
      );
      console.log(`✅ Commands registered to guild ${process.env.GUILD_ID}`);
    } else {
      // Register globally
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: commands,
      });
      console.log('✅ Commands registered globally');
    }
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }
}

// Bot ready event
client.once(Events.ClientReady, async c => {
  console.log(`⚔️ Battle Reports bot is online as ${c.user.tag}!`);
  await registerCommands();
});

// Handle interactions
client.on(Events.InteractionCreate, async interaction => {
  try {
    // Handle slash commands
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      await command.execute(interaction, sessions);
    }

    // Handle select menus
    if (interaction.isStringSelectMenu()) {
      await handleSelectMenu(interaction, sessions);
    }

    // Handle modals
    if (interaction.isModalSubmit()) {
      await handleModal(interaction, sessions);
    }

    // Handle buttons
    if (interaction.isButton()) {
      await handleButton(interaction, sessions);
    }
  } catch (error) {
    console.error('Error handling interaction:', error.stack || error);

    const errorMessage = '❌ An error occurred. Please try again.';

    try {
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: errorMessage, ephemeral: true });
      } else {
        await interaction.reply({ content: errorMessage, ephemeral: true });
      }
    } catch (e) {
      console.error('Failed to send error message:', e.message);
    }
  }
});

// Handle uncaught errors
process.on('unhandledRejection', error => {
  console.error('Unhandled rejection:', error);
});

process.on('uncaughtException', error => {
  console.error('Uncaught exception:', error);
});

// Handle disconnections
client.on('error', error => {
  console.error('Client error:', error);
});

client.on('shardError', error => {
  console.error('Shard error:', error);
});

// Login
client.login(process.env.DISCORD_TOKEN);
