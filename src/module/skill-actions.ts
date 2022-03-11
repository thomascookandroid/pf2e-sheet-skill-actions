/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { ActionsIndex } from './actions-index';
import { camelize, Flag } from './utils';
import { ModifierPF2e } from './pf2e';
import { ActionType, SKILL_ACTIONS_DATA, SkillActionData, SkillActionDataParameters } from './skill-actions-data';
import { ItemConstructor } from './globals';

const ACTION_ICONS: Record<ActionType, string> = {
  A: 'OneAction',
  D: 'TwoActions',
  T: 'ThreeActions',
  F: 'FreeAction',
  R: 'Reaction',
  '': 'Passive',
};

export interface ActorSkillAction {
  visible: boolean;
}

export class SkillAction {
  data: SkillActionData;

  constructor(data: SkillActionDataParameters) {
    data.key ??= camelize(data.slug);
    data.requiredRank ??= 0;
    data.actionType ??= 'A';
    if (data.icon) data.icon = 'systems/pf2e/icons/spells/' + data.icon + '.webp';
    else data.icon = 'systems/pf2e/icons/actions/' + ACTION_ICONS[data.actionType] + '.webp';
    this.data = data;

    this.buildVariants();
  }

  get actor() {
    return this.data.actor;
  }

  get key() {
    return this.data.key;
  }

  get label() {
    const skillLabel = this.skill.label ? game.i18n.localize(this.skill.label) : this.skill.name;
    return skillLabel + ': ' + this.pf2eItem.name;
  }

  get skill() {
    return this.actor.data.data.skills[this.data.proficiencyKey];
  }

  get visible() {
    return this.actorData?.visible ?? true;
  }

  get pf2eItem() {
    return ActionsIndex.instance.get(this.data.slug);
  }

  isDisplayed(filter: string, allVisible: boolean) {
    if (filter) {
      return this.label.toLowerCase().includes(filter);
    } else {
      return this.visible || allVisible;
    }
  }

  hasTrait(trait: string) {
    return this.pf2eItem.data.data.traits.value.includes(trait);
  }

  getData({ allVisible }: { allVisible: boolean }) {
    const enabled = this.hasSkillRank() && (this.pf2eItem.type !== 'feat' || this.actorHasItem());

    return {
      ...this.data,
      enabled: enabled,
      visible: this.visible,
      displayed: this.isDisplayed('', allVisible),
      label: this.label,
      variants: this.variants,
    };
  }

  private get actorData(): ActorSkillAction | undefined {
    return Flag.get(this.actor, `actions.${this.key}`);
  }

  async update(data: ActorSkillAction) {
    await Flag.set(this.actor, `actions.${this.key}`, data);
  }

  async rollSkillAction(event) {
    if (!(game instanceof Game)) return;

    const modifiers = [];
    const variant = this.variants[parseInt(event.currentTarget.dataset.variant)];

    if (variant.map) {
      modifiers.push(
        new ModifierPF2e({
          label: game.i18n.localize('PF2E.MultipleAttackPenalty'),
          modifier: variant.map,
          type: 'untyped',
        }),
      );
    }
    if (variant.assurance) {
      await this.toChat(variant.assurance);
    } else {
      const rollAction = game.pf2e.actions[this.key];
      if (rollAction) {
        await rollAction({ event, modifiers, actors: [this.actor], ...variant.extra });
      } else {
        await this.toChat();
        await this.skill.roll({ event, modifiers, options: [`action:${this.slug}`] });
      }
    }
  }

  async toChat(assurance?: number) {
    const constructor = this.pf2eItem.constructor as ItemConstructor;
    const ownedItem = new constructor(this.pf2eItem.toJSON(), { parent: this.actor });
    if (assurance) {
      ownedItem.data.data.description.value =
        ownedItem.data.data.description.value + `<hr /> <p><strong>Assurance</strong> : ${assurance}</p>`;
    }
    await ownedItem.toChat();
  }

  private actorHasItem(slug = this.data.slug) {
    return !!this.actor.items.find((item) => item.slug === slug);
  }

  private hasSkillRank() {
    return (
      this.skill.rank >= this.data.requiredRank ||
      (this.data.requiredRank === 1 && this.actorHasItem('clever-improviser'))
    );
  }

  private buildVariants() {
    const modifier = (this.skill.value >= 0 ? ' +' : ' ') + this.skill.value;

    if (this.data.variants) {
      this.variants = this.data.variants.call(this).map(function (variant) {
        return { ...variant, label: `${variant.label} ${modifier}` };
      });
    } else {
      this.variants = [{ label: `Roll ${modifier}`, map: 0 }];

      if (this.hasTrait('attack')) {
        const map = this.pf2eItem.calculateMap();
        this.addMapVariant(map.map2);
        this.addMapVariant(map.map3);
      }
    }
    if (this.actorHasItem('assurance-' + this.skill.name)) {
      const assuranceTotal = 10 + this.skill.modifiers.find((m) => m.type === 'proficiency').modifier;
      this.addAssuranceVariant(assuranceTotal);
    }
  }

  private addMapVariant(map: number) {
    this.variants.push({ label: game.i18n.format('PF2E.MAPAbbreviationLabel', { penalty: map }), map: map });
  }

  private addAssuranceVariant(assuranceTotal: number) {
    //Assurance has no i18n translation in system
    this.variants.push({ label: 'Assurance : ' + assuranceTotal, assurance: assuranceTotal });
  }
}

export class SkillActionCollection extends Collection<SkillAction> {
  static allActionsFor(actor) {
    return deepClone(SKILL_ACTIONS_DATA).flatMap(function (row) {
      if (row.proficiencyKey == 'lore') {
        const skills = actor.data.data.skills;

        return Object.keys(skills)
          .filter((slug) => skills[slug].lore)
          .map((slug) => {
            return new SkillAction({
              ...row,
              proficiencyKey: slug,
              key: camelize(`${row.slug}-${slug}`),
              actor: actor,
            });
          });
      } else {
        return [new SkillAction({ ...row, actor: actor })];
      }
    });
  }

  add(action: SkillAction) {
    if (this.get(action.key)) console.warn('Overwriting existing skill action', action.key);
    this.set(action.key, action);
  }

  fromElement(el: HTMLElement) {
    return this.get(el.dataset.actionId, { strict: true });
  }

  fromEvent(e: JQuery.TriggeredEvent) {
    return this.fromElement(e.delegateTarget);
  }
}
