export interface DesignSystem {
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
  theme: 'light' | 'dark';
  backgroundColor: string;
  textColor: string;
  surfaceColor: string;
}

export interface Section {
  id: string;
  type: string;
  blockId?: string; // ID from the registry
  content: Record<string, any>;
  style?: Record<string, any>;
}

export interface WebsiteConfig {
  name: string;
  description: string;
  type: string;
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
  html: string;
}
