/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { ActionsIndex } from './actions-index';
import { Flag } from './utils';
import { ModifierPF2e } from './pf2e';

interface SkillActionOptions {
  includeMap: boolean;
}

interface RollOption {
  label: string;
  map: number;
}

export interface ActorSkillAction {
  visible: boolean;
}

export default class SkillAction {
  key: string;
  itemName: string;
  label: string;
  icon: string;
  modifier: string;
  enabled: boolean;
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
    this.enabled =
      (skill._modifiers[1].modifier > 0 && trainingRequired) ||
      (!trainingRequired && this.hasFeat(label, featRequired));
    this.icon = 'systems/pf2e/icons/spells/' + icon + '.webp';
    this.includeMap = options.includeMap;
  }

  get visible() {
    return this.actorData?.visible ?? true;
  }

  get actionItem() {
    return ActionsIndex.instance.get(this.itemName);
  }

  private get actorData(): ActorSkillAction | undefined {
    return Flag.get(this.actor, `actions.${this.key}`);
  }

  async update(data: ActorSkillAction) {
    await Flag.set(this.actor, `actions.${this.key}`, data);
  }

  rollSkillAction(e) {
    if (!(game instanceof Game)) return;

    const modifiers = [];
    const map = parseInt(e.currentTarget.dataset.map);

    if (map) {
      modifiers.push(
        new ModifierPF2e({
          label: game.i18n.localize('PF2E.MultipleAttackPenalty'),
          modifier: map,
          type: 'untyped',
        }),
      );
    }

    game.pf2e.actions[this.key]({ event: e, modifiers });
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
