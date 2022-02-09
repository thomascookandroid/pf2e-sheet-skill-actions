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

export type SkillActionDataParameters = PartialBy<SkillActionData, 'actionType' | 'icon' | 'requiredRank'>;

export const SKILL_ACTIONS_DATA: Omit<SkillActionDataParameters, 'actor'>[] = [
  {
    key: 'balance',
    slug: 'balance',
    proficiencyKey: 'acr',
    icon: 'freedom-of-movement',
  },
  {
    key: 'tumbleThrough',
    slug: 'tumble-through',
    proficiencyKey: 'acr',
    icon: 'unimpeded-stride',
  },
  {
    key: 'maneuverInFlight',
    slug: 'maneuver-in-flight',
    proficiencyKey: 'acr',
    requiredRank: 1,
    icon: 'fleet-step',
  },
  {
    key: 'climb',
    slug: 'climb',
    proficiencyKey: 'ath',
    icon: 'heroic-feat',
  },
  {
    key: 'forceOpen',
    slug: 'force-open',
    proficiencyKey: 'ath',
    icon: 'indestructibility',
  },
  {
    key: 'disarm',
    slug: 'disarm',
    proficiencyKey: 'ath',
    requiredRank: 1,
    icon: 'perfect-strike',
  },
  {
    key: 'grapple',
    slug: 'grapple',
    proficiencyKey: 'ath',
    icon: 'remove-fear',
  },
  {
    key: 'highJump',
    slug: 'high-jump',
    proficiencyKey: 'ath',
    actionType: 'D',
    icon: 'jump',
  },
  {
    key: 'longJump',
    slug: 'long-jump',
    proficiencyKey: 'ath',
    actionType: 'D',
    icon: 'longstrider',
  },
  {
    key: 'swim',
    slug: 'swim',
    proficiencyKey: 'ath',
    icon: 'waters-of-prediction',
  },
  {
    key: 'trip',
    slug: 'trip',
    proficiencyKey: 'ath',
    icon: 'natures-enmity',
  },
  {
    key: 'demoralize',
    slug: 'demoralize',
    proficiencyKey: 'itm',
    icon: 'blind-ambition',
  },
  {
    key: 'shove',
    slug: 'shove',
    proficiencyKey: 'ath',
    icon: 'ki-strike',
  },
  {
    key: 'feint',
    slug: 'feint',
    proficiencyKey: 'dec',
    requiredRank: 1,
    icon: 'delay-consequence',
  },
  {
    key: 'request',
    slug: 'request',
    proficiencyKey: 'dip',
    icon: 'cackle',
  },
  {
    key: 'hide',
    slug: 'hide',
    proficiencyKey: 'ste',
    icon: 'zealous-conviction',
  },
  {
    key: 'sneak',
    slug: 'sneak',
    proficiencyKey: 'ste',
    icon: 'invisibility',
  },
  {
    key: 'pickALock',
    slug: 'pick-a-lock',
    proficiencyKey: 'thi',
    requiredRank: 1,
    actionType: 'D',
    icon: 'ward-domain',
  },
  {
    key: 'steal',
    slug: 'steal',
    proficiencyKey: 'thi',
  },
  {
    key: 'bonMot',
    slug: 'bon-mot',
    proficiencyKey: 'dip',
    icon: 'hideous-laughter',
  },
];
