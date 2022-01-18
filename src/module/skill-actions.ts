/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {ActionsIndex} from "./actions-index";

interface SkillActionOptions {
  includeMap: boolean;
}

interface RollOption {
  label: string;
  map: number;
}

export default class SkillAction {
  key: string;
  itemName: string;
  label: string;
  icon: string;
  modifier: string;
  hidden: boolean;
  includeMap: boolean;
  actor: Actor;

  constructor(
    key: string,
    label: string,
    proficiencyKey: string,
    trainingRequired: boolean,
    icon: string,
    featRequired: boolean,
    actor: Actor,
    options: SkillActionOptions = {},
  ) {
    const skill = actor.data.data.skills[proficiencyKey];

    this.key = key;
    this.itemName = label;
    this.actor = actor;
    this.label = game.i18n.localize(skill.label) + ': ' + label;
    this.modifier = (skill.value >= 0 ? ' +' : ' ') + skill.value;
    this.hidden =
      (skill._modifiers[1].modifier > 0 && trainingRequired) ||
      (!trainingRequired && this.hasFeat(label, featRequired));
    this.icon = 'systems/pf2e/icons/spells/' + icon + '.webp';
    this.includeMap = options.includeMap;
  }

  rollSkillAction() {
    game.pf2e.actions[this.key]({ event: event });
  }

  get actionItem() {
    return ActionsIndex.instance.get(this.itemName);
  }

  rollOptions(): Array<RollOption> {
    const result = [{ label: `Roll ${this.modifier}`, map: 0 }];
    if (this.actionItem.data.data.traits.value.includes('attack')) {
      const map = this.actionItem.calculateMap();
      result.push({ label: game.i18n.format('PF2E.MAPAbbreviationLabel', { penalty: map.map2 }), map: map.map2 });
      result.push({ label: game.i18n.format('PF2E.MAPAbbreviationLabel', { penalty: map.map3 }), map: map.map3 });
    }
    return result;
  }

  hasFeat(label: string, featRequired: boolean) {
    const items = this.actor.data.items;
    const result = items.filter((item) => item.data.name === label);
    return (featRequired === true && result.length > 0) || featRequired === false;
  }
}
