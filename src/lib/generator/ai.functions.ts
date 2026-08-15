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
          title: prompt.includes('sentinelx') ? "Advanced AI Cybersecurity for the Modern Enterprise" : "Intelligent Web Solutions for the Future",
          subtitle: "SentinelX provides autonomous threat detection and response, powered by next-generation neural networks.",
          cta: "Start Free Trial",
          secondary_cta: "View Demo"
        }
      },
      {
        id: "features-section",
        type: "features",
        blockId: "features-01",
        content: {
          title: "Enterprise-Grade Security",
          subtitle: "Our platform offers comprehensive protection against evolving cyber threats.",
          cta: "See all features",
          items: [
            { title: "Threat Intel", description: "Real-time global threat intelligence feeds.", icon: "shield" },
            { title: "Auto-Response", description: "Instant remediation of security incidents.", icon: "zap" },
            { title: "Deep Analysis", description: "Packet-level inspection using behavioral AI.", icon: "search" }
          ]
        }
      },
      {
        id: "testimonials-section",
        type: "testimonials",
        blockId: "testimonials-01",
        content: {
          items: [
            { name: "Sarah Chen", role: "CISO at TechCorp", quote: "SentinelX transformed our security posture in weeks.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" },
            { name: "Mark Wilson", role: "Security Architect", quote: "The most intuitive AI security platform I've used.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
            { name: "Elena Rodriguez", role: "CTO at SecureFlow", quote: "Unparalleled accuracy in threat detection.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80" }
          ]
        }
      },
      {
        id: "pricing-section",
        type: "pricing",
        blockId: "pricing-01",
        content: {
          title: "Scale Your Security",
          subtitle: "Flexible plans for teams of all sizes.",
          items: [
            { name: "Standard", price: "$299", features: ["10 Endpoints", "24/7 Monitoring", "Email Alerts"] },
            { name: "Professional", price: "$899", features: ["100 Endpoints", "Advanced Response", "Phone Support"], premium: true },
            { name: "Enterprise", price: "Custom", features: ["Unlimited Endpoints", "Dedicated SOC", "SLA Guarantees"] }
          ]
        }
      },
      {
        id: "footer-section",
        type: "footer",
        blockId: "footer-01",
        content: {
          name: "SentinelX",
          handle: "sentinelx_cyber"
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
