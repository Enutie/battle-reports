const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('battlereport')
    .setDescription('Submit a Warhammer battle report')
    .addAttachmentOption(option =>
      option
        .setName('photo1')
        .setDescription('Battle photo 1 (optional)')
        .setRequired(false)
    )
    .addAttachmentOption(option =>
      option
        .setName('photo2')
        .setDescription('Battle photo 2 (optional)')
        .setRequired(false)
    )
    .addAttachmentOption(option =>
      option
        .setName('photo3')
        .setDescription('Battle photo 3 (optional)')
        .setRequired(false)
    ),

  async execute(interaction, sessions) {
    const { GAME_TYPES } = require('../data/factions');
    const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

    // Collect photo attachments
    const photos = [];
    for (let i = 1; i <= 3; i++) {
      const photo = interaction.options.getAttachment(`photo${i}`);
      if (photo) {
        photos.push(photo.url);
      }
    }

    // Initialize session for this user
    sessions.set(interaction.user.id, {
      step: 'gameType',
      photos,
      channelId: interaction.channelId,
      gameType: null,
      player1: { name: '', faction: '', factionLabel: '', factionEmoji: '', vp: '', spearhead: '' },
      player2: { name: '', faction: '', factionLabel: '', factionEmoji: '', vp: '', spearhead: '' },
      date: '',
      notes: null,
    });

    // Create game type select menu
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('select_gametype')
      .setPlaceholder('Select game type')
      .addOptions(
        GAME_TYPES.map(gt => ({
          label: gt.label,
          value: gt.value,
          emoji: gt.emoji,
        }))
      );

    const row = new ActionRowBuilder().addComponents(selectMenu);

    await interaction.reply({
      content: '⚔️ **Battle Report Submission**\n\nStep 1/5: Select the game type:',
      components: [row],
      ephemeral: true,
    });
  },
};
