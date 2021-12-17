export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
  const templatePaths: string[] = [
    // Add paths to "modules/sheet-skill-actions/templates"
  ];

  return loadTemplates(templatePaths);
}
