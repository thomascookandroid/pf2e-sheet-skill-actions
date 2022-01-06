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
import SkillAction from './skill-actions';

// Initialize module
Hooks.once('init', async () => {
  console.log('sheet-skill-actions | Initializing sheet-skill-actions');

  // Assign custom classes and constants here

  // Register custom module settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();
});

// Add any additional hooks if necessary
Hooks.on('renderActorSheet', async (app: ActorSheet, html: JQuery<HTMLElement>) => {
  if (app.actor.type !== 'character') return;

  const tpl = 'modules/pf2e-sheet-skill-actions/templates/skill-actions.html';

  const skillActions: Array<SkillAction> = initializeSkillActions(app.actor).sort((a, b) => {
    return a.label > b.label ? 1 : -1;
  });
  const skillActionHtml = await renderTemplate(tpl, { skills: skillActions });

  const target = $(html).find('.actions-list.item-list.directory-list.strikes-list');
  target.after(skillActionHtml);
});

function initializeSkillActions(actor: Actor): Array<SkillAction> {
  return [
    new SkillAction('disarm', 'Disarm', 'ath', true, 'perfect-strike', false, actor),
    new SkillAction('grapple', 'Grapple', 'ath', false, 'remove-fear', false, actor),
    new SkillAction('trip', 'Trip', 'ath', false, 'natures-enmity', false, actor),
    new SkillAction('demoralize', 'Demoralize', 'itm', false, 'blind-ambition', false, actor),
    new SkillAction('shove', 'Shove', 'ath', false, 'ki-strike', false, actor),
    new SkillAction('feint', 'Feint', 'dec', true, 'delay-consequence', false, actor),
    new SkillAction('bonMot', 'Bon Mot', 'dip', false, 'hideous-laughter', true, actor),
  ];
}
