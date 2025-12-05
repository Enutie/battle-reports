// Game types and faction lists for Warhammer battle reports

const GAME_TYPES = [
  { value: 'spearhead', label: 'Spearhead', emoji: '⚔️' },
  { value: 'aos', label: 'Age of Sigmar', emoji: '🛡️' },
  { value: 'underworlds', label: 'Underworlds', emoji: '🏰' },
  // Future game types:
  // { value: '40k', label: 'Warhammer 40,000', emoji: '🔫' },
];

// Points options for AoS
const AOS_POINTS = [
  { value: '1000', label: '1000 Points', emoji: '⚔️' },
  { value: '1500', label: '1500 Points', emoji: '⚔️' },
  { value: '2000', label: '2000 Points', emoji: '🏆' },
];

// Underworlds formats (2nd Edition - only Rivals and Nemesis exist now)
const UNDERWORLDS_FORMATS = [
  { value: 'rivals', label: 'Rivals', emoji: '🎴' },
  { value: 'nemesis', label: 'Nemesis', emoji: '⚔️' },
];

// Underworlds Warbands organized by Grand Alliance (Embergard 2nd Edition - December 2024)
const UNDERWORLDS_WARBANDS = {
  order: {
    label: 'Order',
    emoji: '⚔️',
    warbands: [
      // Embergard Season warbands
      { value: 'emberwatch', label: 'The Emberwatch' },
      { value: 'jaws_of_itzl', label: 'Jaws of Itzl' },
      { value: 'knives_of_crone', label: 'Knives of the Crone' },
      // Heroes and Hunters box
      { value: 'hexbanes_hunters', label: "Hexbane's Hunters" },
      { value: 'myaris_purifiers', label: "Myari's Purifiers" },
      { value: 'thundriks_profiteers', label: "Thundrik's Profiteers" },
      { value: 'yltharis_guardians', label: "Ylthari's Guardians" },
    ],
  },
  chaos: {
    label: 'Chaos',
    emoji: '🔥',
    warbands: [
      // Embergard Season warbands
      { value: 'zikkits_tunnelpack', label: "Zikkit's Tunnelpack" },
      { value: 'grandfathers_gardeners', label: "Grandfather's Gardeners" },
      // Despoilers and Daemons box
      { value: 'khagras_ravagers', label: "Khagra's Ravagers" },
      { value: 'ephilims_pandaemonium', label: "Ephilim's Pandaemonium" },
      { value: 'dread_pageant', label: 'The Dread Pageant' },
      { value: 'gorechosen_of_dromm', label: 'Gorechosen of Dromm' },
    ],
  },
  death: {
    label: 'Death',
    emoji: '💀',
    warbands: [
      // Revenants of the Realms box
      { value: 'headsmens_curse', label: "Headsmen's Curse" },
      { value: 'crimson_court', label: 'The Crimson Court' },
      { value: 'kainans_reapers', label: "Kainan's Reapers" },
      { value: 'grymwatch', label: 'Grymwatch' },
    ],
  },
  destruction: {
    label: 'Destruction',
    emoji: '💥',
    warbands: [
      // Embergard Season warbands
      { value: 'borgits_beastgrabbaz', label: "Borgit's Beastgrabbaz" },
      // Brutes and Bandits box
      { value: 'grinkarks_looncourt', label: "Grinkrak's Looncourt" },
      { value: 'blackpowders_buccaneers', label: "Blackpowder's Buccaneers" },
      { value: 'da_kunnin_krew', label: "Da Kunnin' Krew" },
      { value: 'morgoks_krushas', label: "Morgok's Krushas" },
    ],
  },
};

// Underworlds Rivals Decks (Embergard 2nd Edition)
const UNDERWORLDS_DECKS = [
  // Core box decks
  { value: 'blazing_assault', label: 'Blazing Assault' },
  { value: 'emberstone_sentinels', label: 'Emberstone Sentinels' },
  { value: 'pillage_and_plunder', label: 'Pillage and Plunder' },
  { value: 'countdown_to_cataclysm', label: 'Countdown to Cataclysm' },
  // Expansion decks
  { value: 'breakneck_slaughter', label: 'Breakneck Slaughter' },
  { value: 'rimewyrms_bite', label: "Rimewyrm's Bite" },
  { value: 'toxic_terrors', label: 'Toxic Terrors' },
  { value: 'force_of_frost', label: 'Force of Frost' },
  { value: 'custom', label: 'Custom/Other' },
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

function getAosPoints() {
  return AOS_POINTS;
}

function getUnderworldsFormats() {
  return UNDERWORLDS_FORMATS;
}

function getUnderworldsWarbands() {
  return UNDERWORLDS_WARBANDS;
}

function getUnderworldsDecks() {
  return UNDERWORLDS_DECKS;
}

function getWarbandByValue(value) {
  for (const alliance of Object.values(UNDERWORLDS_WARBANDS)) {
    const warband = alliance.warbands.find(w => w.value === value);
    if (warband) {
      return { ...warband, alliance: alliance.label, allianceEmoji: alliance.emoji };
    }
  }
  return null;
}

function getFactionByValue(gameType, value) {
  const factions = getFactionsByGameType(gameType);
  return factions.find(f => f.value === value);
}

module.exports = {
  GAME_TYPES,
  SPEARHEAD_FACTIONS,
  GRAND_ALLIANCES,
  AOS_POINTS,
  UNDERWORLDS_FORMATS,
  UNDERWORLDS_WARBANDS,
  UNDERWORLDS_DECKS,
  getFactionsByGameType,
  getGrandAlliances,
  getAosPoints,
  getUnderworldsFormats,
  getUnderworldsWarbands,
  getUnderworldsDecks,
  getWarbandByValue,
  getFactionByValue,
};
