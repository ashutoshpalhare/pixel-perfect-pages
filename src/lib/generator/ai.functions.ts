import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateWebsiteAction_impl, regenerateSectionAction_impl, refineSectionAction_impl } from "./ai.server";

const briefSchema = z.object({
  prompt: z.string(),
  siteType: z.string().optional(),
  brandName: z.string().optional(),
  description: z.string().optional(),
  audience: z.string().optional(),
  personality: z.string().optional(),
  visualStyle: z.string().optional(),
  colorPreference: z.string().optional(),
  ctaPreference: z.string().optional(),
  requirements: z.string().optional(),
});

export const generateWebsiteAction = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ brief: briefSchema }).parse(data))
  .handler(async ({ data }) => generateWebsiteAction_impl(data));

export const regenerateSectionAction = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z.object({ category: z.string(), sectionId: z.string(), currentBlockId: z.string().optional(), brief: briefSchema }).parse(data),
  )
  .handler(async ({ data }) => regenerateSectionAction_impl(data));

export const refineSectionAction = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ section: z.custom<any>(), instruction: z.string() }).parse(data) as { section: any; instruction: string })
  .handler(async ({ data }) => refineSectionAction_impl(data));
