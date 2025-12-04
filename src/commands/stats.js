const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getPlayerStats, getLeaderboard, getFactionStats, getHeadToHead } = require('../database/stats');

const statsCommand = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('View battle statistics')
    .addStringOption(option =>
      option
        .setName('player')
        .setDescription('Player name to look up (leave empty for leaderboard)')
        .setRequired(false)
    ),

  async execute(interaction) {
    const playerName = interaction.options.getString('player');

    if (playerName) {
      // Show individual player stats
      const stats = getPlayerStats(playerName);
      
      if (!stats || stats.total_games === 0) {
        return interaction.reply({
          content: `❌ No battle records found for **${playerName}**`,
          ephemeral: true,
        });
      }

      const winRate = stats.total_games > 0 
        ? ((stats.wins / stats.total_games) * 100).toFixed(1) 
        : 0;

      const embed = new EmbedBuilder()
        .setColor(0x8b0000)
        .setTitle(`⚔️ Battle Stats: ${playerName}`)
        .addFields(
          { name: '🏆 Wins', value: `${stats.wins}`, inline: true },
          { name: '💀 Losses', value: `${stats.losses}`, inline: true },
          { name: '🤝 Draws', value: `${stats.draws}`, inline: true },
          { name: '📊 Win Rate', value: `${winRate}%`, inline: true },
          { name: '🎮 Total Games', value: `${stats.total_games}`, inline: true },
          { name: '⭐ Total VP', value: `${stats.total_vp || 0}`, inline: true },
        )
        .setFooter({ text: 'May your dice roll true' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } else {
      // Show leaderboard
      const leaders = getLeaderboard(10);
      
      if (leaders.length === 0) {
        return interaction.reply({
          content: '❌ No battle records yet! Use `/battlereport` to log your first game.',
          ephemeral: true,
        });
      }

      let leaderboardText = '';
      leaders.forEach((player, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
        leaderboardText += `${medal} **${player.name}** - ${player.wins}W/${player.losses}L/${player.draws}D (${player.win_rate}%)\n`;
      });

      const embed = new EmbedBuilder()
        .setColor(0xffd700)
        .setTitle('🏆 Battle Leaderboard')
        .setDescription(leaderboardText)
        .setFooter({ text: 'Use /stats <player> for detailed stats' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    }
  },
};

const factionStatsCommand = {
  data: new SlashCommandBuilder()
    .setName('factionstats')
    .setDescription('View faction win rates'),

  async execute(interaction) {
    const factions = getFactionStats(15);
    
    if (factions.length === 0) {
      return interaction.reply({
        content: '❌ No battle records yet!',
        ephemeral: true,
      });
    }

    let factionText = '';
    factions.forEach((faction, index) => {
      const bar = '█'.repeat(Math.round(faction.win_rate / 10)) + '░'.repeat(10 - Math.round(faction.win_rate / 10));
      factionText += `**${faction.faction}**\n${bar} ${faction.win_rate}% (${faction.wins}/${faction.total_games})\n\n`;
    });

    const embed = new EmbedBuilder()
      .setColor(0x8b0000)
      .setTitle('📊 Faction Win Rates')
      .setDescription(factionText)
      .setFooter({ text: 'Minimum 2 games to appear' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

const headToHeadCommand = {
  data: new SlashCommandBuilder()
    .setName('headtohead')
    .setDescription('View head-to-head record between two players')
    .addStringOption(option =>
      option
        .setName('player1')
        .setDescription('First player name')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('player2')
        .setDescription('Second player name')
        .setRequired(true)
    ),

  async execute(interaction) {
    const player1 = interaction.options.getString('player1');
    const player2 = interaction.options.getString('player2');

    const h2h = getHeadToHead(player1, player2);
    
    if (!h2h || h2h.total_games === 0) {
      return interaction.reply({
        content: `❌ No battles found between **${player1}** and **${player2}**`,
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setColor(0x8b0000)
      .setTitle(`⚔️ Head-to-Head: ${player1} vs ${player2}`)
      .addFields(
        { name: player1, value: `${h2h.player1_wins} wins`, inline: true },
        { name: 'Draws', value: `${h2h.draws}`, inline: true },
        { name: player2, value: `${h2h.player2_wins} wins`, inline: true },
      )
      .setDescription(`Total games: ${h2h.total_games}`)
      .setFooter({ text: 'May your dice roll true' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

module.exports = { statsCommand, factionStatsCommand, headToHeadCommand };
