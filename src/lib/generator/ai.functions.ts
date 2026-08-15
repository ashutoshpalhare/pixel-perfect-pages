import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const WebsiteStrategySchema = z.object({
  name: z.string(),
  type: z.string(),
  personality: z.array(z.string()),
  designSystem: z.object({
    primaryColor: z.string(),
    theme: z.enum(['light', 'dark']),
    fontFamily: z.string(),
    borderRadius: z.string(),
  }),
  sections: z.array(z.object({
    type: z.string(),
    content: z.record(z.any()),
  })),
});

export const generateWebsiteAction = createServerFn({ method: "POST" })
  .validator((data: { prompt: string }) => z.object({ prompt: z.string() }).parse(data))
  .handler(async ({ data }) => {
    // In a real implementation, this would call the AI Gateway
    // For now, we simulate a sophisticated response based on the prompt
    
    const isDark = data.prompt.toLowerCase().includes('dark') || data.prompt.toLowerCase().includes('futuristic');
    
    return {
      name: "Generated Project",
      type: "saas",
      personality: ["Modern", "Professional"],
      designSystem: {
        primaryColor: "#0F172A",
        theme: isDark ? 'dark' : 'light',
        fontFamily: "Inter",
        borderRadius: "0.5rem",
      },
      sections: [
        {
          type: "hero",
          content: {
            title: "Revolutionize Your Workflow with AI",
            subtitle: "The all-in-one platform for modern teams to build, scale, and succeed.",
            cta: "Get Started Free"
          }
        },
        {
          type: "features",
          content: {
            items: [
              { title: "Fast", description: "Lightning quick performance." },
              { title: "Secure", description: "Enterprise-grade security." }
            ]
          }
        }
      ]
    };
  });
