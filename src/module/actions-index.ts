import { ItemPF2e } from './globals';
import { SKILL_ACTIONS_DATA } from './skill-actions-data';

const ACTION_NAMES = SKILL_ACTIONS_DATA.map((row) => row.label);

export class ActionsIndex extends Map<string, ItemPF2e> {
  private static _instance: ActionsIndex;

  static get instance() {
    if (!this._instance) this._instance = new ActionsIndex();
    return this._instance;
  }

  private constructor() {
    super();
  }

  async loadCompendium(packName: string) {
    if (!(game instanceof Game)) return;

    const pack = game.packs.get(packName);
    if (!pack) return;

    const actions = await pack.getDocuments({ name: { $in: ACTION_NAMES } });
    for (const action of actions) {
      if (action instanceof Item && action.name) this.set(action.name, action);
    }
  }
}
