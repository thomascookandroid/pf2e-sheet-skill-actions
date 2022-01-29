import {
  ConfiguredDocumentClass,
  ConstructorDataType,
} from '@league-of-foundry-developers/foundry-vtt-types/src/types/helperTypes';
import { ItemData } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs';
import { Context } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/abstract/document.mjs';
import { BaseActor } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/documents.mjs';
import { ModifierPF2e } from './pf2e';

export interface ValuesList<T extends string = string> {
  value: T[];
  custom: string;
}

export interface ItemTraits extends ValuesList {
  rarity: string;
}

interface BaseItemDataPF2e {
  traits?: ItemTraits;
}

interface BaseItemSourcePF2e {
  data: BaseItemDataPF2e;
}

export class ItemPF2e extends Item {
  toChat(event?: JQuery.TriggeredEvent): Promise<undefined>;
  calculateMap(): { label: string; map2: number; map3: number };
}

export type ItemConstructor = new (
  data?: ConstructorDataType<ItemData>,
  context?: Context<InstanceType<ConfiguredDocumentClass<typeof BaseActor>>>,
) => ItemPF2e;

type ActionFunction = (options: { event: JQuery.Event; modifiers: ModifierPF2e[] }) => void;

declare global {
  interface DocumentClassConfig {
    Item: typeof ItemPF2e;
  }
  interface DataConfig {
    Item: BaseItemSourcePF2e;
  }
  interface Game {
    pf2e: { actions: Record<string, ActionFunction> };
  }
}
