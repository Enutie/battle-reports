const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateNarrative(reportData) {
  const { player1, player2, gameType, notes } = reportData;
  const p1VP = parseInt(player1.vp) || 0;
  const p2VP = parseInt(player2.vp) || 0;
  
  let winner, loser, winnerVP, loserVP;
  if (p1VP > p2VP) {
    winner = { name: player1.name, faction: player1.factionLabel, spearhead: player1.spearhead };
    loser = { name: player2.name, faction: player2.factionLabel, spearhead: player2.spearhead };
    winnerVP = p1VP;
    loserVP = p2VP;
  } else if (p2VP > p1VP) {
    winner = { name: player2.name, faction: player2.factionLabel, spearhead: player2.spearhead };
    loser = { name: player1.name, faction: player1.factionLabel, spearhead: player1.spearhead };
    winnerVP = p2VP;
    loserVP = p1VP;
  } else {
    winner = null;
  }

  // Build context with optional notes
  let context = winner 
    ? `${winner.name}'s ${winner.faction}${winner.spearhead ? ` (${winner.spearhead})` : ''} defeated ${loser.name}'s ${loser.faction}${loser.spearhead ? ` (${loser.spearhead})` : ''} ${winnerVP}-${loserVP} in a ${gameType} battle.`
    : `${player1.name}'s ${player1.factionLabel} fought ${player2.name}'s ${player2.factionLabel} to a ${p1VP}-${p2VP} draw in a ${gameType} battle.`;

  if (notes) {
    context += ` Additional context: ${notes}`;
  }

  const prompt = `Write a dramatic 2-sentence Warhammer Age of Sigmar battle narrative. ${context} Be epic and grimdark. No intro, just the narrative.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.9,
      max_tokens: 150,
    });

    return completion.choices[0]?.message?.content?.trim() || null;
  } catch (error) {
    console.error('Groq API error:', error.message);
    return null;
  }
}

module.exports = { generateNarrative };
