export interface DesignSystem {
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  headingFont: string;
  borderRadius: string;
  theme: 'light' | 'dark';
  backgroundColor: string;
  textColor: string;
  surfaceColor: string;
  spacing: 'compact' | 'balanced' | 'airy';
  containerWidth: string;
  shadow: 'none' | 'soft' | 'elevated';
  buttonStyle: 'solid' | 'pill' | 'outline';
  cardStyle: 'flat' | 'bordered' | 'elevated';
}

export interface Section {
  id: string;
  type: string;
  label?: string | undefined;
  blockId?: string | undefined; // ID from the registry
  content: Record<string, any>;
  style?: Record<string, any> | undefined;
}

export interface WebsiteBrief {
  prompt: string;
  siteType?: string | undefined;
  brandName?: string | undefined;
  description?: string | undefined;
  audience?: string | undefined;
  personality?: string | undefined;
  visualStyle?: string | undefined;
  colorPreference?: string | undefined;
  ctaPreference?: string | undefined;
  requirements?: string | undefined;
}

export interface WebsiteConfig {
  name: string;
  description: string;
  type: string;
  brief?: WebsiteBrief | undefined;
  strategy?: string[] | undefined;
  designSystem: DesignSystem;
  sections: Section[];
}

export interface BlockTemplate {
  id: string;
  category: string;
  source: 'tailblocks' | 'custom' | 'ai';
  layout: string;
  styles: string[];
  themes: ('light' | 'dark')[];
  bestFor: string[];
  /** Tailwind-based markup. Placeholders use {{UPPERCASE_KEY}} and {{ITEMS}}. */
  html: string;
  /** Repeated markup for list content. Placeholders map to item keys. */
  itemHtml?: string;
  attribution?: string;
  license?: string;
}
