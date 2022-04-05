/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your module.
 */

// Import TypeScript modules
import { registerSettings } from './settings';
import { preloadTemplates } from './preloadTemplates';
import { ActionsIndex } from './actions-index';
import { Flag } from './utils';
import { SkillActionCollection } from './skill-actions';

// Initialize module
Hooks.once('init', async () => {
  console.log('sheet-skill-actions | Initializing sheet-skill-actions');

  // Assign custom classes and constants here

  // Register custom module settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();
});

Hooks.once('ready', async () => {
  await ActionsIndex.instance.loadCompendium('pf2e.feats-srd');
  await ActionsIndex.instance.loadCompendium('pf2e.actionspf2e');
});

Hooks.once('babele.ready', async () => {
  //Reload actions to have translated actions
  await ActionsIndex.instance.loadCompendium('pf2e.feats-srd');
  await ActionsIndex.instance.loadCompendium('pf2e.actionspf2e');
});

async function renderActionsList(skillActions: SkillActionCollection, actor: Actor) {
  const tpl = 'modules/pf2e-sheet-skill-actions/templates/skill-actions.html';
  const allVisible = Flag.get(actor, 'allVisible');

  const skillData = skillActions
    .map((action) => action.getData({ allVisible }))
    .sort((a, b) => {
      return a.label > b.label ? 1 : -1;
    });

  const $skillActions = $(await renderTemplate(tpl, { skills: skillData, allVisible: allVisible }));
  const $items = $skillActions.find('li.item');

  $skillActions.on('click', '.toggle-hidden-actions', function () {
    Flag.set(actor, 'allVisible', !Flag.get(actor, 'allVisible'));
  });

  $skillActions.on('input', 'input[name="filter"]', function (e) {
    const filter = e.currentTarget.value.toLowerCase();
    $items.each(function () {
      const action = skillActions.fromElement(this);
      $(this).toggle(action.isDisplayed(filter, allVisible));
    });
  });

  $items.on('click', '.skill-action.tag.variant-strike', function (e) {
    skillActions.fromEvent(e).rollSkillAction(e);
  });

  $items.on('click', '.item-image', function (e) {
    skillActions.fromEvent(e).toChat();
  });

  $items.on('click', '.item-toggle-equip', function (e) {
    const action = skillActions.fromEvent(e);
    action.update({ visible: !action.visible });
  });

  return $skillActions;
}

// Add any additional hooks if necessary
Hooks.on('renderActorSheet', async (app: ActorSheet, html: JQuery<HTMLElement>) => {
  if (app.actor.type !== 'character') return;

  const encounterActions = new SkillActionCollection();
  const explorationActions = new SkillActionCollection();
  const downtimeActions = new SkillActionCollection();

  SkillActionCollection.allActionsFor(app.actor).forEach(function (action) {
    if (action.hasTrait('downtime')) downtimeActions.add(action);
    else if (action.hasTrait('exploration')) explorationActions.add(action);
    else encounterActions.add(action);
  });

  const $encounter = await renderActionsList(encounterActions, app.actor);
  html.find('.actions-list.item-list.directory-list.strikes-list').after($encounter);

  const $exploration = await renderActionsList(explorationActions, app.actor);
  html.find('[data-tab="exploration"] .actions-list.item-list.directory-list').before($exploration);

  const $downtime = await renderActionsList(downtimeActions, app.actor);
  html.find('[data-tab="downtime"] .actions-list.item-list.directory-list').before($downtime);
});
