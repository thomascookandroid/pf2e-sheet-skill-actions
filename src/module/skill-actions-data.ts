import { PartialBy } from './utils';
import { Rank } from './globals';

export type ActionType = 'A' | 'D' | 'T' | 'F' | 'R' | '';

export interface SkillActionData {
  key: string;
  slug: string;
  icon: string;
  proficiencyKey: string;
  requiredRank: Rank;
  actionType: ActionType;
  actor: Actor;
}

export type SkillActionDataParameters = PartialBy<SkillActionData, 'key' | 'actionType' | 'icon' | 'requiredRank'>;

export const SKILL_ACTIONS_DATA: Omit<SkillActionDataParameters, 'actor'>[] = [
  {
    slug: 'balance',
    proficiencyKey: 'acr',
    icon: 'freedom-of-movement',
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
    slug: 'swim',
    proficiencyKey: 'ath',
    icon: 'waters-of-prediction',
  },
  {
    slug: 'trip',
    proficiencyKey: 'ath',
    icon: 'natures-enmity',
  },
  {
    slug: 'demoralize',
    proficiencyKey: 'itm',
    icon: 'blind-ambition',
  },
  {
    slug: 'shove',
    proficiencyKey: 'ath',
    icon: 'ki-strike',
  },
  {
    slug: 'feint',
    proficiencyKey: 'dec',
    requiredRank: 1,
    icon: 'delay-consequence',
  },
  {
    slug: 'request',
    proficiencyKey: 'dip',
    icon: 'cackle',
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
  {
    slug: 'bon-mot',
    proficiencyKey: 'dip',
    icon: 'hideous-laughter',
  },
];
