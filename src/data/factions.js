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
      { value: 'stormcast', label: 'Stormcast Eternals', emoji: '⚡', spearheads: ['Cleansing Aqualith', 'Vigilant Brotherhood'] },
      { value: 'cities', label: 'Cities of Sigmar', emoji: '🏰', spearheads: ['Fusil-Platoon'] },
      { value: 'dok', label: 'Daughters of Khaine', emoji: '🗡️', spearheads: ['Witch-Coven'] },
      { value: 'fyreslayers', label: 'Fyreslayers', emoji: '🔥', spearheads: ['Embersteel'] },
      { value: 'idoneth', label: 'Idoneth Deepkin', emoji: '🌊', spearheads: ['Namarti Reavers'] },
      { value: 'kharadron', label: 'Kharadron Overlords', emoji: '🎈', spearheads: ['Aether-runners'] },
      { value: 'lumineth', label: 'Lumineth Realm-lords', emoji: '✨', spearheads: ['Vanari Battlehost'] },
      { value: 'seraphon', label: 'Seraphon', emoji: '🦎', spearheads: ['Shadowstrike Templehost'] },
      { value: 'sylvaneth', label: 'Sylvaneth', emoji: '🌳', spearheads: ['Gossamid Grovehost'] },
    ],
  },
  chaos: {
    label: 'Chaos',
    emoji: '🔥',
    factions: [
      { value: 'slaves', label: 'Slaves to Darkness', emoji: '⛓️', spearheads: ['Ruinforged'] },
      { value: 'khorne', label: 'Blades of Khorne', emoji: '🩸', spearheads: ['Bloodbound'] },
      { value: 'nurgle', label: 'Maggotkin of Nurgle', emoji: '🦠', spearheads: ['Rotbringers'] },
      { value: 'slaanesh', label: 'Hedonites of Slaanesh', emoji: '💜', spearheads: ['Sybarite Blade-Carnival'] },
      { value: 'tzeentch', label: 'Disciples of Tzeentch', emoji: '🔮', spearheads: ['Arcanite Cabal'] },
      { value: 'boc', label: 'Beasts of Chaos', emoji: '🐂', spearheads: ['Beastherds'] },
      { value: 'skaven', label: 'Skaven', emoji: '🐀', spearheads: ['Gnawfeast Clawpack'] },
    ],
  },
  death: {
    label: 'Death',
    emoji: '💀',
    factions: [
      { value: 'soulblight', label: 'Soulblight Gravelords', emoji: '🧛', spearheads: ['Deathrattle Tomb Host'] },
      { value: 'ossiarch', label: 'Ossiarch Bonereapers', emoji: '💀', spearheads: ['Fangbound'] },
      { value: 'nighthaunt', label: 'Nighthaunt', emoji: '👻', spearheads: ['Shroudwardens'] },
      { value: 'fec', label: 'Flesh-eater Courts', emoji: '🦴', spearheads: ['Royal Mordants'] },
    ],
  },
  destruction: {
    label: 'Destruction',
    emoji: '💚',
    factions: [
      { value: 'orruk', label: 'Orruk Warclans', emoji: '💚', spearheads: ['Ironjawz Brawl'] },
      { value: 'kruleboyz', label: 'Kruleboyz', emoji: '🐊', spearheads: ['Murknob Mob'] },
      { value: 'bonesplitterz', label: 'Bonesplitterz', emoji: '🪓', spearheads: ['Kop Rukk'] },
      { value: 'gloomspite', label: 'Gloomspite Gitz', emoji: '🌙', spearheads: ['Snarlpack'] },
      { value: 'ogor', label: 'Ogor Mawtribes', emoji: '🍖', spearheads: ['Gutbusters'] },
      { value: 'sob', label: 'Sons of Behemat', emoji: '🦶', spearheads: ['Stomper Tribe'] },
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
