import { Section, WebsiteBrief } from "../../types/website";
import { buildSection, generateWebsite, planStructure, refineSection, understand } from "./engine";

/**
 * Demo generation engine.
 *
 * This is a deterministic, rule-based planner running on the server — it does
 * NOT call an external AI provider. The UI labels it as demo generation so no
 * false claim is made about a model request.
 */
export function generateWebsiteAction_impl({ brief }: { brief: WebsiteBrief }) {
  return generateWebsite(brief);
}

export function regenerateSectionAction_impl({
  category,
  sectionId,
  currentBlockId,
  brief,
}: {
  category: string;
  sectionId: string;
  currentBlockId?: string | undefined;
  brief: WebsiteBrief;
}): Section {
  const u = understand(brief);
  const plan = planStructure(u, brief);
  return buildSection(category, u, brief, plan, { id: sectionId, exclude: currentBlockId });
}

export function refineSectionAction_impl({ section, instruction }: { section: Section; instruction: string }): Section {
  return refineSection(section, instruction);
}
