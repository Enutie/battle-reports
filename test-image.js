// Test script to generate a sample battle report image locally
const { generateBattleReportImage } = require('./src/generators/imageGenerator.js');
const fs = require('fs');

const testData = {
  gameType: 'Spearhead',
  date: 'December 4, 2025',
  player1: { 
    name: 'Magnus the Red', 
    faction: 'stormcast', 
    factionLabel: 'Stormcast Eternals', 
    factionEmoji: '⚡', 
    vp: '24',
    spearhead: 'Cleansing Aqualith'
  },
  player2: { 
    name: 'Sigrid', 
    faction: 'nighthaunt', 
    factionLabel: 'Nighthaunt', 
    factionEmoji: '👻', 
    vp: '18',
    spearhead: 'Shroudwardens'
  },
  breakdown: null
};

console.log('Generating test image...');
const buffer = generateBattleReportImage(testData);
fs.writeFileSync('test-report.png', buffer);
console.log('Done! Open test-report.png to see the result.');
