const { createCanvas, GlobalFonts } = require('@napi-rs/canvas');
const path = require('path');

// Try to load system fonts on Linux
try {
  GlobalFonts.loadSystemFonts();
} catch (e) {
  console.log('Could not load system fonts:', e.message);
}

// Color palette
const COLORS = {
  parchment: '#f4e4bc',
  parchmentMid: '#e8d5a3',
  parchmentDark: '#d4c088',
  borderDark: '#2d1810',
  borderGold: '#8B7355',
  accentRed: '#8B0000',
  textDark: '#1a1a1a',
  textLight: '#f4e4bc',
  gold: '#c9a227',
};

// Use DejaVu Sans which is commonly available on Linux
const FONT_FAMILY = 'DejaVu Sans, Liberation Sans, Arial, sans-serif';

function generateBattleReportImage(reportData) {
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Draw parchment background
  drawParchmentBackground(ctx, width, height);

  // Draw borders
  drawBorders(ctx, width, height);

  // Draw corner decorations
  drawCornerDecorations(ctx, width, height);

  // Draw header
  drawHeader(ctx, width, reportData);

  // Draw date
  drawDate(ctx, width, reportData.date);

  // Draw decorative divider
  drawDivider(ctx, width, 150);

  // Draw player sections
  drawPlayerSections(ctx, width, height, reportData);

  // Draw result banner
  drawResultBanner(ctx, width, height, reportData);

  // Draw optional breakdown
  if (reportData.breakdown) {
    drawBreakdown(ctx, width, height, reportData.breakdown);
  }

  // Draw footer
  drawFooter(ctx, width, height);

  return canvas.toBuffer('image/png');
}

function drawParchmentBackground(ctx, width, height) {
  // Base parchment gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, COLORS.parchment);
  gradient.addColorStop(0.3, COLORS.parchmentMid);
  gradient.addColorStop(0.7, COLORS.parchment);
  gradient.addColorStop(1, COLORS.parchmentDark);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add noise texture
  for (let i = 0; i < 5000; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const alpha = Math.random() * 0.03;
    ctx.fillStyle = `rgba(139, 90, 43, ${alpha})`;
    ctx.fillRect(x, y, 1, 1);
  }

  // Add staining effects
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = 30 + Math.random() * 80;
    const stainGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    stainGradient.addColorStop(0, 'rgba(139, 90, 43, 0.05)');
    stainGradient.addColorStop(1, 'rgba(139, 90, 43, 0)');
    ctx.fillStyle = stainGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBorders(ctx, width, height) {
  // Outer dark border
  ctx.strokeStyle = COLORS.borderDark;
  ctx.lineWidth = 8;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  // Inner gold border
  ctx.strokeStyle = COLORS.borderGold;
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  // Innermost decorative line
  ctx.strokeStyle = COLORS.borderDark;
  ctx.lineWidth = 1;
  ctx.strokeRect(28, 28, width - 56, height - 56);
}

function drawCornerDecorations(ctx, width, height) {
  const corners = [
    { x: 35, y: 35, rot: 0 },
    { x: width - 35, y: 35, rot: Math.PI / 2 },
    { x: width - 35, y: height - 35, rot: Math.PI },
    { x: 35, y: height - 35, rot: -Math.PI / 2 },
  ];

  ctx.fillStyle = COLORS.borderGold;
  corners.forEach(corner => {
    ctx.save();
    ctx.translate(corner.x, corner.y);
    ctx.rotate(corner.rot);
    
    // Draw decorative corner flourish
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(20, 0);
    ctx.lineTo(20, 3);
    ctx.lineTo(3, 3);
    ctx.lineTo(3, 20);
    ctx.lineTo(0, 20);
    ctx.closePath();
    ctx.fill();
    
    // Small diamond
    ctx.beginPath();
    ctx.moveTo(8, 8);
    ctx.lineTo(12, 4);
    ctx.lineTo(16, 8);
    ctx.lineTo(12, 12);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
  });
}

function drawHeader(ctx, width, reportData) {
  const { gameType, pointsSize, battleplan } = reportData;
  
  // "BATTLE REPORT" header
  ctx.fillStyle = COLORS.textDark;
  ctx.font = 'bold 42px ' + FONT_FAMILY;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Add text shadow for depth
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillText('BATTLE REPORT', width / 2, 70);
  ctx.shadowColor = 'transparent';

  // Game type badge - show points for AoS
  let badgeText = gameType.toUpperCase();
  if (gameType === 'aos' && pointsSize) {
    badgeText = `AGE OF SIGMAR - ${pointsSize} PTS`;
  }
  const badgeWidth = ctx.measureText(badgeText).width + 30;
  const badgeX = width / 2 - badgeWidth / 2;
  const badgeY = 95;

  // Red background (rounded rectangle)
  ctx.fillStyle = COLORS.accentRed;
  ctx.beginPath();
  const r = 4;
  ctx.moveTo(badgeX + r, badgeY);
  ctx.lineTo(badgeX + badgeWidth - r, badgeY);
  ctx.quadraticCurveTo(badgeX + badgeWidth, badgeY, badgeX + badgeWidth, badgeY + r);
  ctx.lineTo(badgeX + badgeWidth, badgeY + 24 - r);
  ctx.quadraticCurveTo(badgeX + badgeWidth, badgeY + 24, badgeX + badgeWidth - r, badgeY + 24);
  ctx.lineTo(badgeX + r, badgeY + 24);
  ctx.quadraticCurveTo(badgeX, badgeY + 24, badgeX, badgeY + 24 - r);
  ctx.lineTo(badgeX, badgeY + r);
  ctx.quadraticCurveTo(badgeX, badgeY, badgeX + r, badgeY);
  ctx.closePath();
  ctx.fill();

  // Badge text
  ctx.fillStyle = COLORS.textLight;
  ctx.font = 'bold 14px ' + FONT_FAMILY;
  ctx.fillText(badgeText, width / 2, badgeY + 12);
}

function drawDate(ctx, width, date) {
  ctx.fillStyle = COLORS.textDark;
  ctx.font = 'italic 16px ' + FONT_FAMILY;
  ctx.textAlign = 'center';
  ctx.fillText(date, width / 2, 135);
}

function drawDivider(ctx, width, y) {
  const dividerWidth = 300;
  const startX = (width - dividerWidth) / 2;

  ctx.strokeStyle = COLORS.borderGold;
  ctx.lineWidth = 2;

  // Left line
  ctx.beginPath();
  ctx.moveTo(startX, y);
  ctx.lineTo(width / 2 - 20, y);
  ctx.stroke();

  // Center diamond
  ctx.fillStyle = COLORS.borderGold;
  ctx.beginPath();
  ctx.moveTo(width / 2, y - 6);
  ctx.lineTo(width / 2 + 6, y);
  ctx.lineTo(width / 2, y + 6);
  ctx.lineTo(width / 2 - 6, y);
  ctx.closePath();
  ctx.fill();

  // Right line
  ctx.beginPath();
  ctx.moveTo(width / 2 + 20, y);
  ctx.lineTo(startX + dividerWidth, y);
  ctx.stroke();
}

function drawPlayerSections(ctx, width, height, reportData) {
  const { player1, player2 } = reportData;
  const p1VP = parseInt(player1.vp) || 0;
  const p2VP = parseInt(player2.vp) || 0;
  const p1Wins = p1VP > p2VP;
  const p2Wins = p2VP > p1VP;

  // Player 1 section (left) - moved inward
  drawPlayerSection(ctx, 200, 180, player1, p1Wins);

  // VS text
  ctx.fillStyle = COLORS.accentRed;
  ctx.font = 'bold 36px ' + FONT_FAMILY;
  ctx.textAlign = 'center';
  ctx.fillText('VS', width / 2, 260);

  // Player 2 section (right) - moved inward
  drawPlayerSection(ctx, width - 200, 180, player2, p2Wins);
}

function drawPlayerSection(ctx, x, y, player, isWinner) {
  ctx.textAlign = 'center';

  // Player name
  ctx.fillStyle = COLORS.textDark;
  ctx.font = 'bold 22px ' + FONT_FAMILY;
  const displayName = player.name.length > 15 ? player.name.substring(0, 15) + '...' : player.name;
  ctx.fillText(displayName, x, y);

  // Faction
  ctx.font = 'italic 16px ' + FONT_FAMILY;
  ctx.fillStyle = COLORS.borderDark;
  ctx.fillText(player.factionLabel, x, y + 25);

  // Spearhead name (if available)
  if (player.spearhead) {
    ctx.font = '12px ' + FONT_FAMILY;
    ctx.fillStyle = COLORS.accentRed;
    ctx.fillText(player.spearhead, x, y + 45);
  }

  // Large VP number
  const vpY = player.spearhead ? y + 115 : y + 100;
  ctx.font = 'bold 72px ' + FONT_FAMILY;
  ctx.fillStyle = isWinner ? COLORS.accentRed : COLORS.textDark;
  ctx.fillText(player.vp, x, vpY);

  // VP label
  ctx.font = '14px ' + FONT_FAMILY;
  ctx.fillStyle = COLORS.borderDark;
  ctx.fillText('Victory Points', x, vpY + 40);

  // Winner indicator
  if (isWinner) {
    ctx.fillStyle = COLORS.gold;
    ctx.font = 'bold 20px ' + FONT_FAMILY;
    ctx.fillText('- WINNER -', x, y + 175);
  }
}

function drawResultBanner(ctx, width, height, reportData) {
  const { player1, player2 } = reportData;
  const p1VP = parseInt(player1.vp) || 0;
  const p2VP = parseInt(player2.vp) || 0;

  let resultText;
  if (p1VP > p2VP) {
    resultText = `${player1.name} VICTORIOUS!`;
  } else if (p2VP > p1VP) {
    resultText = `${player2.name} VICTORIOUS!`;
  } else {
    resultText = 'HONORABLE DRAW';
  }

  const bannerY = 400;
  const bannerHeight = 40;

  // Banner background
  ctx.fillStyle = COLORS.accentRed;
  ctx.beginPath();
  ctx.moveTo(100, bannerY);
  ctx.lineTo(width - 100, bannerY);
  ctx.lineTo(width - 80, bannerY + bannerHeight / 2);
  ctx.lineTo(width - 100, bannerY + bannerHeight);
  ctx.lineTo(100, bannerY + bannerHeight);
  ctx.lineTo(120, bannerY + bannerHeight / 2);
  ctx.closePath();
  ctx.fill();

  // Gold border on banner
  ctx.strokeStyle = COLORS.gold;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Result text
  ctx.fillStyle = COLORS.textLight;
  ctx.font = 'bold 20px ' + FONT_FAMILY;
  ctx.textAlign = 'center';
  ctx.fillText(resultText, width / 2, bannerY + bannerHeight / 2 );
}

function drawBreakdown(ctx, width, height, breakdown) {
  ctx.fillStyle = COLORS.textDark;
  ctx.font = 'italic 14px ' + FONT_FAMILY;
  ctx.textAlign = 'center';

  // Split breakdown into lines if too long
  const maxWidth = width - 120;
  const words = breakdown.split(' ');
  let lines = [];
  let currentLine = '';

  words.forEach(word => {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    if (ctx.measureText(testLine).width > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  if (currentLine) lines.push(currentLine);

  // Draw breakdown lines
  const startY = 460;
  lines.slice(0, 3).forEach((line, i) => {
    ctx.fillText(line, width / 2, startY + i * 18);
  });
}

function drawFooter(ctx, width, height) {
  // Decorative divider
  drawDivider(ctx, width, height - 60);

  // Footer text
  ctx.fillStyle = COLORS.borderDark;
  ctx.font = 'italic 14px ' + FONT_FAMILY;
  ctx.textAlign = 'center';
  ctx.fillText('May your dice roll true', width / 2, height - 35);
}

module.exports = { generateBattleReportImage };
