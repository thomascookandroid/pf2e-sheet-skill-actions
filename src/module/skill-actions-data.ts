import { PartialBy } from './utils';
import { Rank } from './globals';

export type ActionType = 'A' | 'D' | 'T' | 'F' | 'R' | '';

interface Variant {
  label: string;
  map?: number;
  extra?: Record<string, unknown>;
}

export interface SkillActionData {
  key: string;
  slug: string;
  icon: string;
  proficiencyKey: string;
  requiredRank: Rank;
  actionType: ActionType;
  variants?: () => Variant[];
  actor: Actor;
}

export type SkillActionDataParameters = PartialBy<SkillActionData, 'key' | 'actionType' | 'icon' | 'requiredRank'>;

export const SKILL_ACTIONS_DATA: Omit<SkillActionDataParameters, 'actor'>[] = [
  // Acrobatics
  {
    slug: 'balance',
    proficiencyKey: 'acr',
    icon: 'freedom-of-movement',
  },
  {
    slug: 'squeeze',
    proficiencyKey: 'acr',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'tumble-through',
    proficiencyKey: 'acr',
    icon: 'unimpeded-stride',
  },
  {
    slug: 'maneuver-in-flight',
    proficiencyKey: 'acr',
    requiredRank: 1,
    icon: 'fleet-step',
  },
  // Arcana
  {
    slug: 'borrow-an-arcane-spell',
    proficiencyKey: 'arc',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'decipher-writing',
    key: 'decipherWritingArcana',
    proficiencyKey: 'arc',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'identify-magic',
    key: 'identifyMagicArcana',
    proficiencyKey: 'arc',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'learn-a-spell',
    key: 'learnASpellArcana',
    proficiencyKey: 'arc',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'recall-knowledge-arcana',
    proficiencyKey: 'arc',
  },
  // Athletics
  {
    slug: 'climb',
    proficiencyKey: 'ath',
    icon: 'heroic-feat',
  },
  {
    slug: 'force-open',
    proficiencyKey: 'ath',
    icon: 'indestructibility',
  },
  {
    slug: 'disarm',
    proficiencyKey: 'ath',
    requiredRank: 1,
    icon: 'perfect-strike',
  },
  {
    slug: 'grapple',
    proficiencyKey: 'ath',
    icon: 'remove-fear',
  },
  {
    slug: 'high-jump',
    proficiencyKey: 'ath',
    actionType: 'D',
    icon: 'jump',
  },
  {
    slug: 'long-jump',
    proficiencyKey: 'ath',
    actionType: 'D',
    icon: 'longstrider',
  },
  {
    slug: 'shove',
    proficiencyKey: 'ath',
    icon: 'ki-strike',
  },
  {
    slug: 'swim',
    proficiencyKey: 'ath',
    icon: 'waters-of-prediction',
  },
  {
    slug: 'trip',
    proficiencyKey: 'ath',
    icon: 'natures-enmity',
  },
  // Crafting
  {
    slug: 'craft',
    proficiencyKey: 'cra',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'earn-income',
    key: 'earnIncomeCrafting',
    proficiencyKey: 'cra',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'identify-alchemy',
    proficiencyKey: 'cra',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'recall-knowledge-crafting',
    proficiencyKey: 'cra',
  },
  {
    slug: 'repair',
    proficiencyKey: 'cra',
    actionType: '',
  },
  // Deception
  {
    slug: 'create-a-diversion',
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
    proficiencyKey: 'dec',
    requiredRank: 1,
    icon: 'delay-consequence',
  },
  {
    slug: 'impersonate',
    proficiencyKey: 'dec',
    actionType: '',
  },
  {
    slug: 'lie',
    proficiencyKey: 'dec',
    actionType: '',
  },
  // Diplomacy
  {
    slug: 'gather-information',
    proficiencyKey: 'dip',
    actionType: '',
  },
  {
    slug: 'make-an-impression',
    proficiencyKey: 'dip',
    actionType: '',
  },
  {
    slug: 'request',
    proficiencyKey: 'dip',
    icon: 'cackle',
  },
  // Intimidation
  {
    slug: 'coerce',
    proficiencyKey: 'itm',
    actionType: '',
  },
  {
    slug: 'demoralize',
    proficiencyKey: 'itm',
    icon: 'blind-ambition',
  },
  // Lore
  {
    slug: 'earn-income',
    proficiencyKey: 'lore',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'recall-knowledge-lore',
    proficiencyKey: 'lore',
  },
  // Medicine
  {
    slug: 'administer-first-aid',
    proficiencyKey: 'med',
    actionType: 'D',
  },
  {
    slug: 'treat-disease',
    proficiencyKey: 'med',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'treat-poison',
    proficiencyKey: 'med',
    requiredRank: 1,
  },
  {
    slug: 'treat-wounds',
    proficiencyKey: 'med',
    actionType: '',
    requiredRank: 1,
  },
  // Nature
  {
    slug: 'command-an-animal',
    proficiencyKey: 'nat',
  },
  {
    slug: 'identify-magic',
    key: 'identifyMagicNature',
    proficiencyKey: 'nat',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'learn-a-spell',
    key: 'learnASpellNature',
    proficiencyKey: 'nat',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'recall-knowledge-nature',
    proficiencyKey: 'nat',
  },
  // Occultism
  {
    slug: 'decipher-writing',
    key: 'decipherWritingOccultism',
    proficiencyKey: 'occ',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'identify-magic',
    key: 'identifyMagicOccultism',
    proficiencyKey: 'occ',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'learn-a-spell',
    key: 'learnASpellOccultism',
    proficiencyKey: 'occ',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'recall-knowledge-occultism',
    proficiencyKey: 'occ',
  },
  // Performance
  {
    slug: 'earn-income',
    key: 'earnIncomePerformance',
    proficiencyKey: 'prf',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'perform',
    proficiencyKey: 'prf',
  },
  // Religion
  {
    slug: 'decipher-writing',
    key: 'decipherWritingReligion',
    proficiencyKey: 'rel',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'identify-magic',
    key: 'identifyMagicReligion',
    proficiencyKey: 'rel',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'learn-a-spell',
    key: 'learnASpellReligion',
    proficiencyKey: 'rel',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'recall-knowledge-religion',
    proficiencyKey: 'rel',
  },
  // Society
  {
    slug: 'create-forgery',
    proficiencyKey: 'soc',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'decipher-writing',
    key: 'decipherWritingSociety',
    proficiencyKey: 'soc',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'subsist',
    key: 'subsistSociety',
    proficiencyKey: 'soc',
    actionType: '',
  },
  {
    slug: 'recall-knowledge-society',
    proficiencyKey: 'soc',
  },
  // Stealth
  {
    slug: 'conceal-an-object',
    proficiencyKey: 'ste',
  },
  {
    slug: 'hide',
    proficiencyKey: 'ste',
    icon: 'zealous-conviction',
  },
  {
    slug: 'sneak',
    proficiencyKey: 'ste',
    icon: 'invisibility',
  },
  // Survival
  {
    slug: 'cover-tracks',
    proficiencyKey: 'sur',
    actionType: '',
    requiredRank: 1,
  },
  {
    slug: 'sense-direction',
    proficiencyKey: 'sur',
    actionType: '',
  },
  {
    slug: 'subsist',
    key: 'subsistSurvival',
    proficiencyKey: 'sur',
    actionType: '',
  },
  {
    slug: 'track',
    proficiencyKey: 'sur',
    actionType: '',
    requiredRank: 1,
  },
  // Thievery
  {
    slug: 'disable-device',
    proficiencyKey: 'thi',
    requiredRank: 1,
    actionType: 'D',
  },
  {
    slug: 'palm-an-object',
    proficiencyKey: 'thi',
  },
  {
    slug: 'pick-a-lock',
    proficiencyKey: 'thi',
    requiredRank: 1,
    actionType: 'D',
    icon: 'ward-domain',
  },
  {
    slug: 'steal',
    proficiencyKey: 'thi',
  },
  // Feat based
  {
    slug: 'bon-mot',
    proficiencyKey: 'dip',
    icon: 'hideous-laughter',
  },
];
