export interface DesignSystem {
  primaryColor: string;
  fontFamily: string;
  borderRadius: string;
  theme: 'light' | 'dark';
}

export interface Section {
  id: string;
  type: string;
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
