// Game types and faction lists for Warhammer battle reports

const GAME_TYPES = [
  { value: 'spearhead', label: 'Spearhead', emoji: '⚔️' },
  // Future game types:
  // { value: 'aos', label: 'Age of Sigmar', emoji: '🛡️' },
  // { value: '40k', label: 'Warhammer 40,000', emoji: '🔫' },
];

// Factions organized by Grand Alliance
const GRAND_ALLIANCES = {
  order: {
    label: 'Order',
    emoji: '🛡️',
    factions: [
      { value: 'stormcast', label: 'Stormcast Eternals', emoji: '⚡' },
      { value: 'cities', label: 'Cities of Sigmar', emoji: '🏰' },
      { value: 'dok', label: 'Daughters of Khaine', emoji: '🗡️' },
      { value: 'fyreslayers', label: 'Fyreslayers', emoji: '🔥' },
      { value: 'idoneth', label: 'Idoneth Deepkin', emoji: '🌊' },
      { value: 'kharadron', label: 'Kharadron Overlords', emoji: '🎈' },
      { value: 'lumineth', label: 'Lumineth Realm-lords', emoji: '✨' },
      { value: 'seraphon', label: 'Seraphon', emoji: '🦎' },
      { value: 'sylvaneth', label: 'Sylvaneth', emoji: '🌳' },
    ],
  },
  chaos: {
    label: 'Chaos',
    emoji: '🔥',
    factions: [
      { value: 'slaves', label: 'Slaves to Darkness', emoji: '⛓️' },
      { value: 'khorne', label: 'Blades of Khorne', emoji: '🩸' },
      { value: 'nurgle', label: 'Maggotkin of Nurgle', emoji: '🦠' },
      { value: 'slaanesh', label: 'Hedonites of Slaanesh', emoji: '💜' },
      { value: 'tzeentch', label: 'Disciples of Tzeentch', emoji: '🔮' },
      { value: 'boc', label: 'Beasts of Chaos', emoji: '🐂' },
      { value: 'skaven', label: 'Skaven', emoji: '🐀' },
    ],
  },
  death: {
    label: 'Death',
    emoji: '💀',
    factions: [
      { value: 'soulblight', label: 'Soulblight Gravelords', emoji: '🧛' },
      { value: 'ossiarch', label: 'Ossiarch Bonereapers', emoji: '💀' },
      { value: 'nighthaunt', label: 'Nighthaunt', emoji: '👻' },
      { value: 'fec', label: 'Flesh-eater Courts', emoji: '🦴' },
    ],
  },
  destruction: {
    label: 'Destruction',
    emoji: '💚',
    factions: [
      { value: 'orruk', label: 'Orruk Warclans', emoji: '💚' },
      { value: 'kruleboyz', label: 'Kruleboyz', emoji: '🐊' },
      { value: 'bonesplitterz', label: 'Bonesplitterz', emoji: '🪓' },
      { value: 'gloomspite', label: 'Gloomspite Gitz', emoji: '🌙' },
      { value: 'ogor', label: 'Ogor Mawtribes', emoji: '🍖' },
      { value: 'sob', label: 'Sons of Behemat', emoji: '🦶' },
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
