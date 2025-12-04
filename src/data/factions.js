// Game types and faction lists for Warhammer battle reports

const GAME_TYPES = [
  { value: 'spearhead', label: 'Spearhead', emoji: '⚔️' },
  // Future game types:
  // { value: 'aos', label: 'Age of Sigmar', emoji: '🛡️' },
  // { value: '40k', label: 'Warhammer 40,000', emoji: '🔫' },
];

const SPEARHEAD_FACTIONS = [
  { value: 'stormcast', label: 'Stormcast Eternals', emoji: '⚡' },
  { value: 'skaven', label: 'Skaven', emoji: '🐀' },
  { value: 'orruk', label: 'Orruk Warclans', emoji: '💚' },
  { value: 'slaves', label: 'Slaves to Darkness', emoji: '⛓️' },
  { value: 'dok', label: 'Daughters of Khaine', emoji: '🗡️' },
  { value: 'fyreslayers', label: 'Fyreslayers', emoji: '🔥' },
  { value: 'idoneth', label: 'Idoneth Deepkin', emoji: '🌊' },
  { value: 'kharadron', label: 'Kharadron Overlords', emoji: '🎈' },
  { value: 'lumineth', label: 'Lumineth Realm-lords', emoji: '✨' },
  { value: 'sylvaneth', label: 'Sylvaneth', emoji: '🌳' },
  { value: 'seraphon', label: 'Seraphon', emoji: '🦎' },
  { value: 'soulblight', label: 'Soulblight Gravelords', emoji: '🧛' },
  { value: 'ossiarch', label: 'Ossiarch Bonereapers', emoji: '💀' },
  { value: 'nighthaunt', label: 'Nighthaunt', emoji: '👻' },
  { value: 'nurgle', label: 'Maggotkin of Nurgle', emoji: '🦠' },
  { value: 'slaanesh', label: 'Hedonites of Slaanesh', emoji: '💜' },
  { value: 'tzeentch', label: 'Disciples of Tzeentch', emoji: '🔮' },
  { value: 'khorne', label: 'Blades of Khorne', emoji: '🩸' },
  { value: 'boc', label: 'Beasts of Chaos', emoji: '🐂' },
  { value: 'cities', label: 'Cities of Sigmar', emoji: '🏰' },
  { value: 'ogor', label: 'Ogor Mawtribes', emoji: '🍖' },
  { value: 'gloomspite', label: 'Gloomspite Gitz', emoji: '🌙' },
  { value: 'fec', label: 'Flesh-eater Courts', emoji: '🦴' },
  { value: 'sob', label: 'Sons of Behemat', emoji: '🦶' },
  { value: 'bonesplitterz', label: 'Bonesplitterz', emoji: '🪓' },
  { value: 'kruleboyz', label: 'Kruleboyz', emoji: '🐊' },
];

// Future 40K factions (commented out for now)
/*
const WH40K_FACTIONS = [
  { value: 'space_marines', label: 'Space Marines', emoji: '🦅' },
  { value: 'chaos_marines', label: 'Chaos Space Marines', emoji: '😈' },
  { value: 'necrons', label: 'Necrons', emoji: '🤖' },
  { value: 'tyranids', label: 'Tyranids', emoji: '🐛' },
  { value: 'orks', label: 'Orks', emoji: '💚' },
  { value: 'eldar', label: 'Aeldari', emoji: '🌟' },
  { value: 'tau', label: "T'au Empire", emoji: '🔵' },
  { value: 'guard', label: 'Astra Militarum', emoji: '🪖' },
  { value: 'custodes', label: 'Adeptus Custodes', emoji: '👑' },
  { value: 'sisters', label: 'Adepta Sororitas', emoji: '🔥' },
  { value: 'knights', label: 'Imperial Knights', emoji: '🏰' },
  { value: 'daemons', label: 'Chaos Daemons', emoji: '👿' },
  { value: 'dark_eldar', label: 'Drukhari', emoji: '🖤' },
  { value: 'harlequins', label: 'Harlequins', emoji: '🎭' },
  { value: 'gsc', label: 'Genestealer Cults', emoji: '👽' },
  { value: 'admech', label: 'Adeptus Mechanicus', emoji: '⚙️' },
  { value: 'grey_knights', label: 'Grey Knights', emoji: '⚔️' },
  { value: 'death_guard', label: 'Death Guard', emoji: '🦠' },
  { value: 'thousand_sons', label: 'Thousand Sons', emoji: '🔮' },
  { value: 'world_eaters', label: 'World Eaters', emoji: '🩸' },
  { value: 'votann', label: 'Leagues of Votann', emoji: '⛏️' },
  { value: 'agents', label: 'Agents of the Imperium', emoji: '🕵️' },
];
*/

function getFactionsByGameType(gameType) {
  switch (gameType) {
    case 'spearhead':
      return SPEARHEAD_FACTIONS;
    // case '40k':
    //   return WH40K_FACTIONS;
    default:
      return SPEARHEAD_FACTIONS;
  }
}

function getFactionByValue(gameType, value) {
  const factions = getFactionsByGameType(gameType);
  return factions.find(f => f.value === value);
}

module.exports = {
  GAME_TYPES,
  SPEARHEAD_FACTIONS,
  getFactionsByGameType,
  getFactionByValue,
};
