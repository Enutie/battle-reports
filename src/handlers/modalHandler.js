const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ButtonBuilder,
  ButtonStyle,
  AttachmentBuilder,
  EmbedBuilder,
} = require('discord.js');
const { getFactionsByGameType, getFactionByValue } = require('../data/factions');
const { generateBattleReportImage } = require('../generators/imageGenerator');

// Helper to split factions into two select menus (Discord max 25 options per menu)
function createFactionSelectMenus(baseId, gameType) {
  const factions = getFactionsByGameType(gameType);
  const mid = Math.ceil(factions.length / 2);
  const first = factions.slice(0, mid);
  const second = factions.slice(mid);

  const menu1 = new StringSelectMenuBuilder()
    .setCustomId(`${baseId}_1`)
    .setPlaceholder('Order & Destruction factions')
    .addOptions(first.map(f => ({ label: f.label, value: f.value, emoji: f.emoji })));

  const menu2 = new StringSelectMenuBuilder()
    .setCustomId(`${baseId}_2`)
    .setPlaceholder('Chaos & Death factions')
    .addOptions(second.map(f => ({ label: f.label, value: f.value, emoji: f.emoji })));

  return [
    new ActionRowBuilder().addComponents(menu1),
    new ActionRowBuilder().addComponents(menu2),
  ];
}

async function handleSelectMenu(interaction, sessions) {
  console.log('handleSelectMenu called:', interaction.customId);
  
  const session = sessions.get(interaction.user.id);
  if (!session) {
    console.log('No session found for user:', interaction.user.id);
    return interaction.reply({
      content: '❌ Session expired. Please start a new battle report with `/battlereport`.',
      flags: 64, // ephemeral
    });
  }

  const customId = interaction.customId;
  const value = interaction.values[0];
  console.log('Selected value:', value);

  try {
    if (customId === 'select_gametype') {
      session.gameType = value;
      session.step = 'player1Faction';

      const rows = createFactionSelectMenus('select_p1_faction', session.gameType);

      await interaction.update({
        content: '⚔️ **Battle Report Submission**\n\nStep 2/5: Select **Player 1** faction:',
        components: rows,
      });
    } else if (customId === 'select_p1_faction_1' || customId === 'select_p1_faction_2') {
      const faction = getFactionByValue(session.gameType, value);
      if (!faction) {
        console.error('Faction not found:', value);
        return interaction.reply({ content: '❌ Faction not found. Please try again.', flags: 64 });
      }
      session.player1.faction = value;
      session.player1.factionLabel = faction.label;
      session.player1.factionEmoji = faction.emoji;
      session.step = 'player2Faction';

      const rows = createFactionSelectMenus('select_p2_faction', session.gameType);

      await interaction.update({
        content: `⚔️ **Battle Report Submission**\n\n✅ Player 1: ${faction.emoji} ${faction.label}\n\nStep 3/5: Select **Player 2** faction:`,
        components: rows,
      });
    } else if (customId === 'select_p2_faction_1' || customId === 'select_p2_faction_2') {
      const faction = getFactionByValue(session.gameType, value);
      if (!faction) {
        console.error('Faction not found:', value);
        return interaction.reply({ content: '❌ Faction not found. Please try again.', flags: 64 });
      }
      session.player2.faction = value;
      session.player2.factionLabel = faction.label;
      session.player2.factionEmoji = faction.emoji;
      session.step = 'details';

    // Show modal for player details
    const modal = new ModalBuilder()
      .setCustomId('modal_details')
      .setTitle('Battle Details');

    const dateInput = new TextInputBuilder()
      .setCustomId('date')
      .setLabel('Battle Date')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('e.g., December 4, 2025')
      .setRequired(true);

    const p1NameInput = new TextInputBuilder()
      .setCustomId('p1_name')
      .setLabel('Player 1 Name')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('Enter Player 1 name')
      .setRequired(true)
      .setMaxLength(30);

    const p1VPInput = new TextInputBuilder()
      .setCustomId('p1_vp')
      .setLabel('Player 1 Victory Points')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('e.g., 24')
      .setRequired(true)
      .setMaxLength(3);

    const p2NameInput = new TextInputBuilder()
      .setCustomId('p2_name')
      .setLabel('Player 2 Name')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('Enter Player 2 name')
      .setRequired(true)
      .setMaxLength(30);

    const p2VPInput = new TextInputBuilder()
      .setCustomId('p2_vp')
      .setLabel('Player 2 Victory Points')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('e.g., 18')
      .setRequired(true)
      .setMaxLength(3);

    modal.addComponents(
      new ActionRowBuilder().addComponents(dateInput),
      new ActionRowBuilder().addComponents(p1NameInput),
      new ActionRowBuilder().addComponents(p1VPInput),
      new ActionRowBuilder().addComponents(p2NameInput),
      new ActionRowBuilder().addComponents(p2VPInput)
    );

    await interaction.showModal(modal);
    }
  } catch (error) {
    console.error('Error in handleSelectMenu:', error);
    throw error;
  }
}

async function handleModal(interaction, sessions) {
  const session = sessions.get(interaction.user.id);
  if (!session) {
    return interaction.reply({
      content: '❌ Session expired. Please start a new battle report with `/battlereport`.',
      ephemeral: true,
    });
  }

  if (interaction.customId === 'modal_details') {
    session.date = interaction.fields.getTextInputValue('date');
    session.player1.name = interaction.fields.getTextInputValue('p1_name');
    session.player1.vp = interaction.fields.getTextInputValue('p1_vp');
    session.player2.name = interaction.fields.getTextInputValue('p2_name');
    session.player2.vp = interaction.fields.getTextInputValue('p2_vp');
    session.step = 'breakdown';

    // Show breakdown options
    const addBreakdownBtn = new ButtonBuilder()
      .setCustomId('btn_add_breakdown')
      .setLabel('Add Points Breakdown')
      .setStyle(ButtonStyle.Secondary)
      .setEmoji('📊');

    const skipBtn = new ButtonBuilder()
      .setCustomId('btn_skip_breakdown')
      .setLabel('Generate Report')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('⚔️');

    const row = new ActionRowBuilder().addComponents(addBreakdownBtn, skipBtn);

    await interaction.reply({
      content: `⚔️ **Battle Report Submission**\n\n✅ ${session.player1.factionEmoji} **${session.player1.name}** (${session.player1.factionLabel}): ${session.player1.vp} VP\n✅ ${session.player2.factionEmoji} **${session.player2.name}** (${session.player2.factionLabel}): ${session.player2.vp} VP\n✅ Date: ${session.date}\n\nStep 5/5: Would you like to add a points breakdown?`,
      components: [row],
      ephemeral: true,
    });
  } else if (interaction.customId === 'modal_breakdown') {
    session.breakdown = interaction.fields.getTextInputValue('breakdown');
    await generateAndPostReport(interaction, session, sessions);
  }
}

async function handleButton(interaction, sessions) {
  const session = sessions.get(interaction.user.id);
  if (!session) {
    return interaction.reply({
      content: '❌ Session expired. Please start a new battle report with `/battlereport`.',
      ephemeral: true,
    });
  }

  if (interaction.customId === 'btn_add_breakdown') {
    const modal = new ModalBuilder()
      .setCustomId('modal_breakdown')
      .setTitle('Points Breakdown');

    const breakdownInput = new TextInputBuilder()
      .setCustomId('breakdown')
      .setLabel('Points Breakdown')
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder('e.g., Objectives: P1 12, P2 8 | Battle Tactics: P1 12, P2 10')
      .setRequired(true)
      .setMaxLength(200);

    modal.addComponents(new ActionRowBuilder().addComponents(breakdownInput));

    await interaction.showModal(modal);
  } else if (interaction.customId === 'btn_skip_breakdown') {
    await generateAndPostReport(interaction, session, sessions);
  }
}

async function generateAndPostReport(interaction, session, sessions) {
  console.log('Starting report generation for:', session.player1.name, 'vs', session.player2.name);
  
  await interaction.update({
    content: '⏳ Generating your battle report...',
    components: [],
  });

  try {
    console.log('Generating image...');
    // Generate the image
    const imageBuffer = generateBattleReportImage(session);
    console.log('Image generated, size:', imageBuffer.length);
    const attachment = new AttachmentBuilder(imageBuffer, { name: 'battle-report.png' });

    // Determine winner
    const p1VP = parseInt(session.player1.vp) || 0;
    const p2VP = parseInt(session.player2.vp) || 0;
    let resultText;
    if (p1VP > p2VP) {
      resultText = `🏆 **${session.player1.name}** claims victory!`;
    } else if (p2VP > p1VP) {
      resultText = `🏆 **${session.player2.name}** claims victory!`;
    } else {
      resultText = `⚔️ An honorable draw!`;
    }

    // Create embed
    const embed = new EmbedBuilder()
      .setColor(0x8b0000)
      .setTitle('⚔️ Battle Report')
      .setDescription(
        `**${session.player1.factionEmoji} ${session.player1.name}** (${session.player1.factionLabel}) vs **${session.player2.factionEmoji} ${session.player2.name}** (${session.player2.factionLabel})\n\n` +
        `📅 ${session.date}\n` +
        `🎮 ${session.gameType.charAt(0).toUpperCase() + session.gameType.slice(1)}\n\n` +
        `**Score:** ${session.player1.vp} - ${session.player2.vp}\n\n` +
        resultText
      )
      .setImage('attachment://battle-report.png')
      .setFooter({ text: 'May your dice roll true' })
      .setTimestamp();

    // Collect all attachments
    const files = [attachment];

    // Add user photos if any
    if (session.photos.length > 0) {
      embed.addFields({
        name: '📸 Battle Photos',
        value: session.photos.map((_, i) => `Photo ${i + 1}`).join(', '),
      });
    }

    // Post to channel (public message)
    const channel = await interaction.client.channels.fetch(session.channelId);
    
    const messageOptions = {
      embeds: [embed],
      files,
    };

    // Add photos as separate embeds if present
    if (session.photos.length > 0) {
      const photoEmbeds = session.photos.map((url, i) => 
        new EmbedBuilder()
          .setImage(url)
          .setFooter({ text: `Battle Photo ${i + 1}` })
      );
      messageOptions.embeds.push(...photoEmbeds);
    }

    await channel.send(messageOptions);

    // Update the ephemeral message
    await interaction.editReply({
      content: '✅ **Battle report posted!** Check the channel for your report.',
      components: [],
    });

    // Clean up session
    sessions.delete(interaction.user.id);
  } catch (error) {
    console.error('Error generating battle report:', error);
    await interaction.editReply({
      content: '❌ An error occurred while generating the battle report. Please try again.',
      components: [],
    });
  }
}

module.exports = {
  handleSelectMenu,
  handleModal,
  handleButton,
};
