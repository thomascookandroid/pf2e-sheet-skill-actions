/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

export default class SkillAction {
  key: string;
  label: string;
  icon: string;
  modifier: string;
  hidden: boolean;
  actor: Actor;

  constructor(
    key: string,
    label: string,
    proficiencyKey: string,
    trainingRequired: boolean,
    icon: string,
    featRequired: boolean,
    actor: Actor,
  ) {
    const skill = actor.data.data.skills[proficiencyKey];

    this.key = key;
    this.actor = actor;
    this.label = game.i18n.localize(skill.label) + ': ' + label;
    this.modifier = (skill.value >= 0 ? ' +' : ' ') + skill.value;
    this.hidden =
      (skill._modifiers[1].modifier > 0 && trainingRequired) ||
      (!trainingRequired && this.hasFeat(label, featRequired));
    this.icon = 'systems/pf2e/icons/spells/' + icon + '.webp';
  }

  rollSkillAction() {
    game.pf2e.actions[this.key]({ event: event });
  }

  hasFeat(label: string, featRequired: boolean) {
    const items = this.actor.data.items;
    const result = items.filter((item) => item.data.name === label);
    return (featRequired === true && result.length > 0) || featRequired === false;
  }
}
