import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { WebsiteConfig } from "../../types/website";

export const generateWebsiteAction = createServerFn({ method: "POST" })
  .validator((data: { prompt: string }) => z.object({ prompt: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const prompt = data.prompt.toLowerCase();
    const isDark = prompt.includes('dark') || prompt.includes('futuristic') || prompt.includes('cyber');
    
    // Design System generation based on prompt
    const primaryColor = prompt.includes('cyber') ? '#00f2ff' : 
                        prompt.includes('restaurant') ? '#e63946' : 
                        '#3b82f6';
    
    const designSystem = {
      primaryColor,
      accentColor: prompt.includes('cyber') ? '#ff00ff' : '#10b981',
      theme: (isDark ? 'dark' : 'light') as 'light' | 'dark',
      fontFamily: "Inter",
      borderRadius: "0.75rem",
      backgroundColor: isDark ? '#0f172a' : '#ffffff',
      textColor: isDark ? '#f8fafc' : '#0f172a',
      surfaceColor: isDark ? '#1e293b' : '#f8fafc',
    };

    // Simulated Intelligent Section Selection
    const sections = [
      {
        id: "hero-section",
        type: "hero",
        blockId: "hero-01",
        content: {
          title: "Intelligent Web Solutions for the Future",
          subtitle: "Build, deploy and scale your next big idea with our AI-powered platform designed for high-growth teams.",
          cta: "Start Free Trial",
          secondary_cta: "View Demo"
        }
      },
      {
        id: "features-section",
        type: "features",
        blockId: "features-01",
        content: {
          title: "Why Choose Our Platform?",
          subtitle: "Everything you need to succeed in the modern digital landscape.",
          cta: "See all features",
          items: [
            { title: "AI Powered", description: "Smart automation for your repetitive tasks.", icon: "zap" },
            { title: "Scale Fast", description: "Infrastructure that grows with your user base.", icon: "trending-up" },
            { title: "Global CDN", description: "Serve your content with lightning speed anywhere.", icon: "globe" }
          ]
        }
      },
      {
        id: "pricing-section",
        type: "pricing",
        blockId: "pricing-01",
        content: {
          title: "Simple, Transparent Pricing",
          subtitle: "Choose the plan that fits your current needs and scale when you are ready.",
          items: [
            { name: "Starter", price: "$0", features: ["Up to 3 projects", "Basic analytics", "Community support"] },
            { name: "Pro", price: "$49", features: ["Unlimited projects", "Advanced analytics", "Priority support"], premium: true },
            { name: "Enterprise", price: "Custom", features: ["Custom infrastructure", "Dedicated manager", "24/7 phone support"] }
          ]
        }
      },
      {
        id: "footer-section",
        type: "footer",
        blockId: "footer-01",
        content: {
          name: "SentinX",
          handle: "sentinx_ai"
        }
      }
    ];

    return {
      name: "SentinX AI",
      description: "AI-powered platform for modern startups.",
      type: "saas",
      designSystem,
      sections
    };
  });

export const regenerateSectionAction = createServerFn({ method: "POST" })
  .validator((data: { sectionId: string, category: string, designSystem: any }) => 
    z.object({ sectionId: z.string(), category: z.string(), designSystem: z.any() }).parse(data))
  .handler(async ({ data }) => {
    // In a real app, this would pick a DIFFERENT blockId from the same category
    // For now, we simulate changing some content
    return {
      id: data.sectionId,
      type: data.category,
      blockId: data.category === 'hero' ? 'hero-02' : 'hero-01',
      content: {
        title: "Freshly Regenerated Content",
        subtitle: "This section was updated by the AI while maintaining your design system.",
        cta: "New Action",
        items: data.category === 'features' ? [
          { title: "New Feature 1", description: "Description for new feature.", icon: "check" },
          { title: "New Feature 2", description: "Description for new feature.", icon: "check" }
        ] : undefined
      }
    };
  });
