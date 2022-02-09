import { PartialBy } from './utils';

export type ActionType = 'A' | 'D' | 'T' | 'F' | 'R' | '';

export interface SkillActionData {
  key: string;
  label: string;
  translation: string;
  icon: string;
  proficiencyKey: string;
  trainingRequired: boolean;
  featSlug?: string;
  actionType: ActionType;
  actor: Actor;
}

export type SkillActionDataParameters = PartialBy<SkillActionData, 'actionType' | 'icon'>;

export const SKILL_ACTIONS_DATA: Omit<SkillActionDataParameters, 'actor'>[] = [
  {
    key: 'balance',
    label: 'Balance',
    translation: 'PF2E.Actions.Balance.Title',
    proficiencyKey: 'acr',
    trainingRequired: false,
  },
  {
    key: 'tumbleThrough',
    label: 'Tumble Through',
    translation: 'PF2E.Actions.TumbleThrough.Title',
    proficiencyKey: 'acr',
    trainingRequired: false,
  },
  {
    key: 'maneuverInFlight',
    label: 'Maneuver in Flight',
    translation: 'PF2E.Actions.ManeuverInFlight.Title',
    proficiencyKey: 'acr',
    trainingRequired: true,
  },
  {
    key: 'climb',
    label: 'Climb',
    translation: 'PF2E.Actions.Climb.Title',
    proficiencyKey: 'ath',
    trainingRequired: false,
  },
  {
    key: 'forceOpen',
    label: 'Force Open',
    translation: 'PF2E.Actions.ForceOpen.Title',
    proficiencyKey: 'ath',
    trainingRequired: false,
  },
  {
    key: 'disarm',
    label: 'Disarm',
    translation: 'PF2E.Actions.Disarm.Title',
    proficiencyKey: 'ath',
    trainingRequired: true,
    icon: 'perfect-strike',
  },
  {
    key: 'grapple',
    label: 'Grapple',
    translation: 'PF2E.Actions.Grapple.Title',
    proficiencyKey: 'ath',
    trainingRequired: false,
    icon: 'remove-fear',
  },
  {
    key: 'highJump',
    label: 'High Jump',
    translation: 'PF2E.Actions.HighJump.Title',
    proficiencyKey: 'ath',
    trainingRequired: false,
    actionType: 'D',
  },
  {
    key: 'longJump',
    label: 'Long Jump',
    translation: 'PF2E.Actions.LongJump.Title',
    proficiencyKey: 'ath',
    trainingRequired: false,
    actionType: 'D',
  },
  {
    key: 'swim',
    label: 'Swim',
    translation: 'PF2E.Actions.Swim.Title',
    proficiencyKey: 'ath',
    trainingRequired: false,
  },
  {
    key: 'trip',
    label: 'Trip',
    translation: 'PF2E.Actions.Trip.Title',
    proficiencyKey: 'ath',
    trainingRequired: false,
    icon: 'natures-enmity',
  },
  {
    key: 'demoralize',
    label: 'Demoralize',
    translation: 'PF2E.Actions.Demoralize.Title',
    proficiencyKey: 'itm',
    trainingRequired: false,
    icon: 'blind-ambition',
  },
  {
    key: 'shove',
    label: 'Shove',
    translation: 'PF2E.Actions.Shove.Title',
    proficiencyKey: 'ath',
    trainingRequired: false,
    icon: 'ki-strike',
  },
  {
    key: 'feint',
    label: 'Feint',
    translation: 'PF2E.Actions.Feint.Title',
    proficiencyKey: 'dec',
    trainingRequired: true,
    icon: 'delay-consequence',
  },
  {
    key: 'request',
    label: 'Request',
    translation: 'PF2E.Actions.Request.Title',
    proficiencyKey: 'dip',
    trainingRequired: false,
  },
  {
    key: 'hide',
    label: 'Hide',
    translation: 'PF2E.Actions.Hide.Title',
    proficiencyKey: 'ste',
    trainingRequired: false,
  },
  {
    key: 'sneak',
    label: 'Sneak',
    translation: 'PF2E.Actions.Sneak.Title',
    proficiencyKey: 'ste',
    trainingRequired: false,
  },
  {
    key: 'pickALock',
    label: 'Pick a Lock',
    translation: 'PF2E.Actions.PickALock.Title',
    proficiencyKey: 'thi',
    trainingRequired: true,
    actionType: 'D',
  },
  {
    key: 'bonMot',
    label: 'Bon Mot',
    translation: 'PF2E.Actions.BonMot.Title',
    proficiencyKey: 'dip',
    trainingRequired: false,
    icon: 'hideous-laughter',
    featSlug: 'bon-mot',
  },
];
