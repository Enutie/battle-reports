// Game types and faction lists for Warhammer battle reports

const GAME_TYPES = [
  { value: 'spearhead', label: 'Spearhead', emoji: '⚔️' },
  // Future game types:
  // { value: 'aos', label: 'Age of Sigmar', emoji: '🛡️' },
  // { value: '40k', label: 'Warhammer 40,000', emoji: '🔫' },
];

// Factions organized by Grand Alliance with Spearhead names
const GRAND_ALLIANCES = {
  order: {
    label: 'Order',
    emoji: '🛡️',
    factions: [
      { value: 'stormcast', label: 'Stormcast Eternals', emoji: '⚡', spearheads: ['Vigilant Brotherhood', "Yndrasta's Spearhead"] },
      { value: 'cities', label: 'Cities of Sigmar', emoji: '🏰', spearheads: ['Castellite Company', 'Fusil-Platoon'] },
      { value: 'dok', label: 'Daughters of Khaine', emoji: '🗡️', spearheads: ['Heartflayer Troupe'] },
      { value: 'fyreslayers', label: 'Fyreslayers', emoji: '🔥', spearheads: ['Saga Axeband'] },
      { value: 'idoneth', label: 'Idoneth Deepkin', emoji: '🌊', spearheads: ['Soulraid Hunt', 'Akhelian Tide Guard'] },
      { value: 'kharadron', label: 'Kharadron Overlords', emoji: '🎈', spearheads: ['Skyhammer Task Force', 'Grundstok Trailblazers'] },
      { value: 'lumineth', label: 'Lumineth Realm-lords', emoji: '✨', spearheads: ['Glittering Phalanx'] },
      { value: 'seraphon', label: 'Seraphon', emoji: '🦎', spearheads: ['Starscale Warhost', 'Sunblooded Prowlers'] },
      { value: 'sylvaneth', label: 'Sylvaneth', emoji: '🌳', spearheads: ['Bitterbark Copse'] },
    ],
  },
  chaos: {
    label: 'Chaos',
    emoji: '🔥',
    factions: [
      { value: 'slaves', label: 'Slaves to Darkness', emoji: '⛓️', spearheads: ['Bloodwind Legion', 'Darkoath'] },
      { value: 'khorne', label: 'Blades of Khorne', emoji: '🩸', spearheads: ['Bloodbound Gore Pilgrims', 'Fangs of the Blood God'] },
      { value: 'nurgle', label: 'Maggotkin of Nurgle', emoji: '🦠', spearheads: ['Bleak Host', 'Bubonic Cell'] },
      { value: 'slaanesh', label: 'Hedonites of Slaanesh', emoji: '💜', spearheads: ['Blades of the Lurid Dream'] },
      { value: 'tzeentch', label: 'Disciples of Tzeentch', emoji: '🔮', spearheads: ['Fluxblade Coven'] },
      { value: 'skaven', label: 'Skaven', emoji: '🐀', spearheads: ['Gnawfeast Clawpack', 'Warpspark Clawpack'] },
      { value: 'hashut', label: 'Helsmiths of Hashut', emoji: '🔨', spearheads: ['Helforge Host'] },
    ],
  },
  death: {
    label: 'Death',
    emoji: '💀',
    factions: [
      { value: 'soulblight', label: 'Soulblight Gravelords', emoji: '🧛', spearheads: ['Bloodcrave Hunt', 'Deathrattle Tomb Host'] },
      { value: 'ossiarch', label: 'Ossiarch Bonereapers', emoji: '💀', spearheads: ['Tithe-reaper Echelon', 'Mortisan Elite'] },
      { value: 'nighthaunt', label: 'Nighthaunt', emoji: '👻', spearheads: ['Slasher Host', 'Cursed Shacklehorde'] },
      { value: 'fec', label: 'Flesh-eater Courts', emoji: '🦴', spearheads: ['Carrion Retainers', 'Charnel Watch'] },
    ],
  },
  destruction: {
    label: 'Destruction',
    emoji: '💚',
    factions: [
      { value: 'orruk', label: 'Orruk Warclans', emoji: '💚', spearheads: ['Ironjawz', 'Kruleboyz'] },
      { value: 'gloomspite', label: 'Gloomspite Gitz', emoji: '🌙', spearheads: ['Bad Moon Madmob', 'Snarlpack Huntaz'] },
      { value: 'ogor', label: 'Ogor Mawtribes', emoji: '🍖', spearheads: ["Tyrant's Bellow", 'Scrapglutt'] },
      { value: 'sob', label: 'Sons of Behemat', emoji: '🦶', spearheads: ['Wallsmasher Stomp'] },
    ],
  },
};

// Flat list for backwards compatibility
const SPEARHEAD_FACTIONS = Object.values(GRAND_ALLIANCES).flatMap(ga => ga.factions);

// Future 40K factions (commented out for now)
/*
const WH40K_FACTIONS = [
  { value: 'space_marines', label: 'Space Marines', emoji: '🦅' },
  ...
];
*/

function getFactionsByGameType(gameType) {
  switch (gameType) {
    case 'spearhead':
      return SPEARHEAD_FACTIONS;
    default:
      return SPEARHEAD_FACTIONS;
  }
}

function getGrandAlliances() {
  return GRAND_ALLIANCES;
}

function getFactionByValue(gameType, value) {
  const factions = getFactionsByGameType(gameType);
  return factions.find(f => f.value === value);
}

module.exports = {
  GAME_TYPES,
  SPEARHEAD_FACTIONS,
  GRAND_ALLIANCES,
  getFactionsByGameType,
  getGrandAlliances,
  getFactionByValue,
};
