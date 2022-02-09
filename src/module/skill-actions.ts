/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { ActionsIndex } from './actions-index';
import { Flag } from './utils';
import { ModifierPF2e } from './pf2e';
import { SKILL_ACTIONS_DATA } from './skill-actions-data';

interface RollOption {
  label: string;
  map: number;
}

export interface ActorSkillAction {
  visible: boolean;
}

export interface SkillActionData {
  key: string;
  label: string;
  icon: string;
  proficiencyKey: string;
  trainingRequired: boolean;
  featRequired: boolean;
  actor: Actor;
}

export class SkillAction {
  data: SkillActionData;

  constructor(data: SkillActionData) {
    data.icon = 'systems/pf2e/icons/spells/' + data.icon + '.webp';
    this.data = data;
  }

  get actor() {
    return this.data.actor;
  }

  get key() {
    return this.data.key;
  }

  get skill() {
    return this.actor.data.data.skills[this.data.proficiencyKey];
  }

  get visible() {
    return this.actorData?.visible ?? true;
  }

  get pf2eItem() {
    return ActionsIndex.instance.get(this.data.key);
  }

  getData({ allVisible }: { allVisible: boolean }) {
    const enabled =
      (!this.data.trainingRequired || this.skill._modifiers[1].modifier > 0) &&
      (!this.data.featRequired || this.hasFeat()) &&
      (this.visible || allVisible);

    return {
      ...this.data,
      enabled: enabled,
      visible: this.visible,
      label: game.i18n.localize(this.skill.label) + ': ' + game.i18n.localize(this.data.label),
      rollOptions: this.rollOptions(),
    };
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
    const modifier = (this.skill.value >= 0 ? ' +' : ' ') + this.skill.value;
    const result = [{ label: `Roll ${modifier}`, map: 0 }];

    if (this.pf2eItem.data.data.traits.value.includes('attack')) {
      const map = this.pf2eItem.calculateMap();
      result.push({ label: game.i18n.format('PF2E.MAPAbbreviationLabel', { penalty: map.map2 }), map: map.map2 });
      result.push({ label: game.i18n.format('PF2E.MAPAbbreviationLabel', { penalty: map.map3 }), map: map.map3 });
    }

    return result;
  }

  private hasFeat() {
    const items = this.actor.data.items;
    const result = items.filter((item) => item.data.date.slug === this.data.key);
    return result.length > 0;
  }
}

export class SkillActionCollection extends Collection<SkillAction> {
  constructor(actor: Actor) {
    super(
      deepClone(SKILL_ACTIONS_DATA).map(function (row) {
        return [row.key, new SkillAction({ ...row, actor: actor })];
      }),
    );
  }

  fromEvent(e: JQuery.TriggeredEvent) {
    return this.get(e.delegateTarget.dataset.actionId, { strict: true });
  }
}
