import { PartialBy } from './utils';
import { Rank } from './globals';

export type ActionType = 'A' | 'D' | 'T' | 'F' | 'R' | '';

interface Variant {
  label: string;
  map?: number;
  extra?: Record<string, unknown>;
  assurance?: number;
}

export interface SkillActionData {
  key: string;
  slug: string;
  compendiumId: string;
  icon: string;
  proficiencyKey: string;
  requiredRank: Rank;
  actionType: ActionType;
  variants?: () => Variant[];
  actor: Actor;
}

export type SkillActionDataParameters = PartialBy<
  SkillActionData,
  'key' | 'actionType' | 'icon' | 'requiredRank' | 'compendiumId'
>;

export const SKILL_ACTIONS_DATA: Omit<SkillActionDataParameters, 'actor'>[] = [
  // Acrobatics
  {
    slug: 'balance',
    compendiumId: 'M76ycLAqHoAgbcej',
    proficiencyKey: 'acr',
    icon: 'freedom-of-movement',
  },
  {
    slug: 'squeeze',
    compendiumId: 'kMcV8e5EZUxa6evt',
    proficiencyKey: 'acr',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'tumble-through',
    compendiumId: '21WIfSu7Xd7uKqV8',
    proficiencyKey: 'acr',
    icon: 'unimpeded-stride',
  },
  {
    slug: 'maneuver-in-flight',
    compendiumId: 'Qf1ylAbdVi1rkc8M',
    proficiencyKey: 'acr',
    requiredRank: 1,
    icon: 'fleet-step',
  },
  // Arcana
  {
    slug: 'borrow-an-arcane-spell',
    compendiumId: 'OizxuPb44g3eHPFh',
    proficiencyKey: 'arc',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'decipher-writing',
    compendiumId: 'd9gbpiQjChYDYA2L',
    key: 'decipherWritingArcana',
    proficiencyKey: 'arc',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'identify-magic',
    compendiumId: 'eReSHVEPCsdkSL4G',
    key: 'identifyMagicArcana',
    proficiencyKey: 'arc',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'learn-a-spell',
    compendiumId: 'Q5iIYCFdqJFM31GW',
    key: 'learnASpellArcana',
    proficiencyKey: 'arc',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'recall-knowledge-arcana',
    compendiumId: 'KygTSeDvsFoSO6HW',
    proficiencyKey: 'arc',
  },
  // Athletics
  {
    slug: 'climb',
    compendiumId: 'pprgrYQ1QnIDGZiy',
    proficiencyKey: 'ath',
    icon: 'heroic-feat',
  },
  {
    slug: 'force-open',
    compendiumId: 'SjmKHgI7a5Z9JzBx',
    proficiencyKey: 'ath',
    icon: 'indestructibility',
  },
  {
    slug: 'disarm',
    compendiumId: 'Dt6B1slsBy8ipJu9',
    proficiencyKey: 'ath',
    requiredRank: 1,
    icon: 'perfect-strike',
  },
  {
    slug: 'grapple',
    compendiumId: 'PMbdMWc2QroouFGD',
    proficiencyKey: 'ath',
    icon: 'remove-fear',
  },
  {
    slug: 'high-jump',
    compendiumId: '2HJ4yuEFY1Cast4h',
    proficiencyKey: 'ath',
    actionType: 'D',
    icon: 'jump',
  },
  {
    slug: 'long-jump',
    compendiumId: 'JUvAvruz7yRQXfz2',
    proficiencyKey: 'ath',
    actionType: 'D',
    icon: 'longstrider',
  },
  {
    slug: 'shove',
    compendiumId: '7blmbDrQFNfdT731',
    proficiencyKey: 'ath',
    icon: 'ki-strike',
  },
  {
    slug: 'swim',
    compendiumId: 'c8TGiZ48ygoSPofx',
    proficiencyKey: 'ath',
    icon: 'waters-of-prediction',
  },
  {
    slug: 'trip',
    compendiumId: 'ge56Lu1xXVFYUnLP',
    proficiencyKey: 'ath',
    icon: 'natures-enmity',
  },
  // Crafting
  {
    slug: 'craft',
    compendiumId: 'rmwa3OyhTZ2i2AHl',
    proficiencyKey: 'cra',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'earn-income',
    compendiumId: 'QyzlsLrqM0EEwd7j',
    key: 'earnIncomeCrafting',
    proficiencyKey: 'cra',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'identify-alchemy',
    compendiumId: 'Q4kdWVOf2ztIBFg1',
    proficiencyKey: 'cra',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'recall-knowledge-crafting',
    compendiumId: 'B0Eu3EfwIa9kyDEA',
    proficiencyKey: 'cra',
  },
  {
    slug: 'repair',
    compendiumId: 'bT3skovyLUtP22ME',
    proficiencyKey: 'cra',
    actionType: '',
  },
  // Deception
  {
    slug: 'create-a-diversion',
    compendiumId: 'GkmbTGfg8KcgynOA',
    proficiencyKey: 'dec',
    variants: function () {
      return [
        { label: 'Distracting Words', extra: { variant: 'distracting-words' } },
        { label: 'Gesture', extra: { variant: 'gesture' } },
        { label: 'Trick', extra: { variant: 'trick' } },
      ];
    },
  },
  {
    slug: 'feint',
    compendiumId: 'QNAVeNKtHA0EUw4X',
    proficiencyKey: 'dec',
    requiredRank: 1,
    icon: 'delay-consequence',
  },
  {
    slug: 'impersonate',
    compendiumId: 'AJstokjdG6iDjVjE',
    proficiencyKey: 'dec',
    actionType: '',
  },
  {
    slug: 'lie',
    compendiumId: 'ewwCglB7XOPLUz72',
    proficiencyKey: 'dec',
    actionType: '',
  },
  // Diplomacy
  {
    slug: 'gather-information',
    compendiumId: 'plBGdZhqq5JBl1D8',
    proficiencyKey: 'dip',
    actionType: '',
  },
  {
    slug: 'make-an-impression',
    compendiumId: 'OX4fy22hQgUHDr0q',
    proficiencyKey: 'dip',
    actionType: '',
  },
  {
    slug: 'request',
    compendiumId: 'DCb62iCBrJXy0Ik6',
    proficiencyKey: 'dip',
    icon: 'cackle',
  },
  // Intimidation
  {
    slug: 'coerce',
    compendiumId: 'tHCqgwjtQtzNqVvd',
    proficiencyKey: 'itm',
    actionType: '',
  },
  {
    slug: 'demoralize',
    compendiumId: '2u915NdUyQan6uKF',
    proficiencyKey: 'itm',
    icon: 'blind-ambition',
  },
  // Lore
  {
    slug: 'earn-income',
    compendiumId: 'QyzlsLrqM0EEwd7j',
    proficiencyKey: 'lore',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'recall-knowledge-lore',
    compendiumId: '1OagaWtBpVXExToo',
    proficiencyKey: 'lore',
  },
  // Medicine
  {
    slug: 'administer-first-aid',
    compendiumId: 'MHLuKy4nQO2Z4Am1',
    proficiencyKey: 'med',
    actionType: 'D',
  },
  {
    slug: 'treat-disease',
    compendiumId: 'TC7OcDa7JlWbqMaN',
    proficiencyKey: 'med',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'treat-poison',
    compendiumId: 'KjoCEEmPGTeFE4hh',
    proficiencyKey: 'med',
    requiredRank: 1,
  },
  {
    slug: 'treat-wounds',
    compendiumId: '1kGNdIIhuglAjIp9',
    proficiencyKey: 'med',
    actionType: '',
    requiredRank: 1,
  },
  // Nature
  {
    slug: 'command-an-animal',
    compendiumId: 'q9nbyIF0PEBqMtYe',
    proficiencyKey: 'nat',
  },
  {
    slug: 'identify-magic',
    compendiumId: 'eReSHVEPCsdkSL4G',
    key: 'identifyMagicNature',
    proficiencyKey: 'nat',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'learn-a-spell',
    compendiumId: 'Q5iIYCFdqJFM31GW',
    key: 'learnASpellNature',
    proficiencyKey: 'nat',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'recall-knowledge-nature',
    compendiumId: 'eT1jXYvz2YH70Ovp',
    proficiencyKey: 'nat',
  },
  // Occultism
  {
    slug: 'decipher-writing',
    compendiumId: 'd9gbpiQjChYDYA2L',
    key: 'decipherWritingOccultism',
    proficiencyKey: 'occ',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'identify-magic',
    compendiumId: 'eReSHVEPCsdkSL4G',
    key: 'identifyMagicOccultism',
    proficiencyKey: 'occ',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'learn-a-spell',
    compendiumId: 'Q5iIYCFdqJFM31GW',
    key: 'learnASpellOccultism',
    proficiencyKey: 'occ',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'recall-knowledge-occultism',
    compendiumId: 'B2BpIZFHoF9Kjzpx',
    proficiencyKey: 'occ',
  },
  // Performance
  {
    slug: 'earn-income',
    compendiumId: 'QyzlsLrqM0EEwd7j',
    key: 'earnIncomePerformance',
    proficiencyKey: 'prf',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'perform',
    compendiumId: 'EEDElIyin4z60PXx',
    proficiencyKey: 'prf',
  },
  // Religion
  {
    slug: 'decipher-writing',
    compendiumId: 'd9gbpiQjChYDYA2L',
    key: 'decipherWritingReligion',
    proficiencyKey: 'rel',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'identify-magic',
    compendiumId: 'eReSHVEPCsdkSL4G',
    key: 'identifyMagicReligion',
    proficiencyKey: 'rel',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'learn-a-spell',
    compendiumId: 'Q5iIYCFdqJFM31GW',
    key: 'learnASpellReligion',
    proficiencyKey: 'rel',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'recall-knowledge-religion',
    compendiumId: 'LZgjpWd0pL3vK9Q1',
    proficiencyKey: 'rel',
  },
  // Society
  {
    slug: 'create-forgery',
    compendiumId: 'ftG89SjTSa9DYDOD',
    proficiencyKey: 'soc',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'decipher-writing',
    compendiumId: 'd9gbpiQjChYDYA2L',
    key: 'decipherWritingSociety',
    proficiencyKey: 'soc',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'subsist',
    compendiumId: '49y9Ec4bDii8pcD3',
    key: 'subsistSociety',
    proficiencyKey: 'soc',
    actionType: '',
  },
  {
    slug: 'recall-knowledge-society',
    compendiumId: 'KUfLlXDWTcAWhl8l',
    proficiencyKey: 'soc',
  },
  // Stealth
  {
    slug: 'conceal-an-object',
    compendiumId: 'qVNVSmsgpKFGk9hV',
    proficiencyKey: 'ste',
  },
  {
    slug: 'hide',
    compendiumId: 'XMcnh4cSI32tljXa',
    proficiencyKey: 'ste',
    icon: 'zealous-conviction',
  },
  {
    slug: 'sneak',
    compendiumId: 'VMozDqMMuK5kpoX4',
    proficiencyKey: 'ste',
    icon: 'invisibility',
  },
  // Survival
  {
    slug: 'cover-tracks',
    compendiumId: 'SB7cMECVtE06kByk',
    proficiencyKey: 'sur',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'sense-direction',
    compendiumId: 'fJImDBQfqfjKJOhk',
    proficiencyKey: 'sur',
    actionType: '',
  },
  {
    slug: 'subsist',
    compendiumId: '49y9Ec4bDii8pcD3',
    key: 'subsistSurvival',
    proficiencyKey: 'sur',
    actionType: '',
  },
  {
    slug: 'track',
    compendiumId: 'EA5vuSgJfiHH7plD',
    proficiencyKey: 'sur',
    actionType: '',
    requiredRank: 1,
  },
  // Thievery
  {
    slug: 'disable-device',
    compendiumId: 'cYdz2grcOcRt4jk6',
    proficiencyKey: 'thi',
    requiredRank: 1,
    actionType: 'D',
  },
  {
    slug: 'palm-an-object',
    compendiumId: 'ijZ0DDFpMkWqaShd',
    proficiencyKey: 'thi',
  },
  {
    slug: 'pick-a-lock',
    compendiumId: '2EE4aF4SZpYf0R6H',
    proficiencyKey: 'thi',
    requiredRank: 1,
    actionType: 'D',
    icon: 'ward-domain',
  },
  {
    slug: 'steal',
    compendiumId: 'RDXXE7wMrSPCLv5k',
    proficiencyKey: 'thi',
  },
  // Feat based
  {
    slug: 'bon-mot',
    compendiumId: '0GF2j54roPFIDmXf',
    proficiencyKey: 'dip',
    icon: 'hideous-laughter',
  },
];
