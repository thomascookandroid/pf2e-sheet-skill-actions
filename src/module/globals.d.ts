import {
  ConfiguredDocumentClass,
  ConstructorDataType,
} from '@league-of-foundry-developers/foundry-vtt-types/src/types/helperTypes';
import { ItemData } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs';
import { Context } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/abstract/document.mjs';
import { BaseActor } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/documents.mjs';

export class ItemPF2e extends Item {
  toChat(event?: JQuery.TriggeredEvent): Promise<undefined>;
}

export type ItemConstructor = new (
  data?: ConstructorDataType<ItemData>,
  context?: Context<InstanceType<ConfiguredDocumentClass<typeof BaseActor>>>,
) => ItemPF2e;

declare global {
  interface DocumentClassConfig {
    Item: typeof ItemPF2e;
  }
}
