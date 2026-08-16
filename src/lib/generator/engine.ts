import { DesignSystem, Section, WebsiteBrief, WebsiteConfig } from '../../types/website';
import { selectBlock } from './blocks/registry';

/* ------------------------------------------------------- 1. UNDERSTAND */

const TYPE_KEYWORDS: Array<[string, string[]]> = [
  ['restaurant', ['restaurant', 'cafe', 'coffee', 'bistro', 'dining', 'menu', 'bakery', 'pizzeria']],
  ['agency', ['agency', 'studio', 'consultancy', 'marketing', 'branding', 'creative']],
  ['portfolio', ['portfolio', 'designer', 'photographer', 'freelance', 'personal site']],
  ['app', ['mobile app', 'ios', 'android', 'app launch']],
  ['product', ['product launch', 'hardware', 'gadget', 'ecommerce', 'shop', 'store']],
  ['event', ['event', 'conference', 'summit', 'meetup', 'festival', 'webinar']],
  ['creator', ['creator', 'newsletter', 'course', 'coach', 'podcast', 'influencer']],
  ['local', ['clinic', 'dentist', 'salon', 'gym', 'plumber', 'local business', 'law firm']],
  ['ai', ['ai ', 'artificial intelligence', 'machine learning', 'cybersecurity', 'llm']],
  ['saas', ['saas', 'platform', 'dashboard', 'startup', 'b2b', 'software']],
];

const STYLE_KEYWORDS: Array<[string, string[]]> = [
  ['futuristic', ['futuristic', 'cyber', 'neon', 'sci-fi']],
  ['premium', ['premium', 'luxury', 'elegant', 'high-end', 'upscale']],
  ['bold', ['bold', 'loud', 'brutalist', 'striking']],
  ['editorial', ['editorial', 'magazine', 'typographic']],
  ['minimal', ['minimal', 'clean', 'simple', 'calm']],
  ['modern', ['modern', 'sleek', 'contemporary']],
];

const COLOR_MAP: Record<string, string> = {
  violet: '#8b5cf6',
  purple: '#8b5cf6',
  amber: '#f59e0b',
  gold: '#d4af37',
  black: '#111827',
  slate: '#64748b',
};

const TYPE_PRIMARY: Record<string, string> = {
  ai: '#8b5cf6',
  saas: '#8b5cf6',
  agency: '#f59e0b',
  portfolio: '#111827',
  restaurant: '#f59e0b',
  app: '#8b5cf6',
  product: '#8b5cf6',
  event: '#f59e0b',
  creator: '#8b5cf6',
  local: '#f59e0b',
};

const FONTS: Record<string, { heading: string; body: string }> = {
  futuristic: { heading: 'Space Grotesk', body: 'DM Sans' },
  premium: { heading: 'Cormorant Garamond', body: 'Karla' },
  bold: { heading: 'Archivo Black', body: 'Hind' },
  editorial: { heading: 'DM Serif Display', body: 'Fira Sans' },
  minimal: { heading: 'Manrope', body: 'Manrope' },
  modern: { heading: 'Sora', body: 'Manrope' },
};

const IMAGES: Record<string, string[]> = {
  ai: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  ],
  saas: [
    'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
  ],
  restaurant: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80',
  ],
  agency: [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1200&q=80',
  ],
  portfolio: [
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1522071823019-4d5bbd0d1b0e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  ],
};

const AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
];

const pick = <T,>(arr: T[], idx: number): T => arr[idx % arr.length]!;

function match(text: string, table: Array<[string, string[]]>, fallback: string): string {
  for (const [key, words] of table) {
    if (words.some((w) => text.includes(w))) return key;
  }
  return fallback;
}

export interface Understanding {
  siteType: string;
  visualStyle: string;
  theme: 'light' | 'dark';
  brand: string;
  offering: string;
  audience: string;
  tone: string;
  cta: string;
}

/** Extracts a brand name: explicit brief field, "called X" / "named X", or capitalised token. */
function extractBrand(prompt: string, brief: WebsiteBrief): string {
  if (brief.brandName?.trim()) return brief.brandName.trim();
  const called = prompt.match(/\b(?:called|named|for)\s+([A-Z][\w&.'-]*(?:\s[A-Z][\w&.'-]*)?)/);
  if (called?.[1]) return called[1].trim();
  const caps = prompt.match(/\b([A-Z][a-z]+[A-Z][A-Za-z]*)\b/);
  if (caps?.[1]) return caps[1];
  return 'Northbeam';
}

export function understand(brief: WebsiteBrief): Understanding {
  const raw = brief.prompt || '';
  const text = `${raw} ${brief.description ?? ''} ${brief.requirements ?? ''}`.toLowerCase();

  const siteType = (brief.siteType && brief.siteType !== 'auto' ? brief.siteType : match(text, TYPE_KEYWORDS, 'saas'));
  const visualStyle =
    brief.visualStyle && brief.visualStyle !== 'auto' ? brief.visualStyle : match(text, STYLE_KEYWORDS, 'modern');

  const wantsDark =
    /dark|night|futuristic|cyber|neon|moody/.test(text) || visualStyle === 'futuristic';

  const audience =
    brief.audience?.trim() ||
    (siteType === 'saas' || siteType === 'ai'
      ? 'fast-moving product and security teams'
      : siteType === 'restaurant'
        ? 'guests who care about seasonal cooking'
        : siteType === 'agency'
          ? 'brands preparing their next launch'
          : 'people who value work done properly');

  const offering =
    brief.description?.trim() ||
    raw.replace(/^\s*(create|build|make|design)\s+(a|an)?\s*/i, '').trim() ||
    'a modern single-page website';

  return {
    siteType,
    visualStyle,
    theme: wantsDark ? 'dark' : 'light',
    brand: extractBrand(raw, brief),
    offering,
    audience,
    tone: brief.personality?.trim() || (visualStyle === 'premium' ? 'refined and confident' : 'clear and confident'),
    cta: brief.ctaPreference?.trim() || (siteType === 'restaurant' ? 'Book a table' : siteType === 'agency' ? 'Start a project' : 'Get started'),
  };
}

/* ---------------------------------------------------- 2. DESIGN SYSTEM */

export function buildDesignSystem(brief: WebsiteBrief, u: Understanding): DesignSystem {
  const text = `${brief.prompt} ${brief.colorPreference ?? ''}`.toLowerCase();
  const named = Object.keys(COLOR_MAP).find((c) => text.includes(c));
  const primaryColor = brief.colorPreference?.startsWith('#')
    ? brief.colorPreference
    : named
      ? COLOR_MAP[named]!
      : TYPE_PRIMARY[u.siteType] ?? '#4f7cff';

  const font = FONTS[u.visualStyle] ?? FONTS['modern']!;
  const isDark = u.theme === 'dark';

  return {
    primaryColor,
    accentColor: u.visualStyle === 'futuristic' ? '#f59e0b' : '#8b5cf6',
    fontFamily: font.body,
    headingFont: font.heading,
    borderRadius: u.visualStyle === 'bold' ? '0.125rem' : u.visualStyle === 'premium' ? '0rem' : '0.35rem',
    theme: u.theme,
    backgroundColor: isDark ? '#1a1b1e' : u.visualStyle === 'premium' ? '#fbf9f5' : '#ffffff',
    textColor: isDark ? '#f4f7fb' : '#101828',
    surfaceColor: isDark ? '#222326' : u.visualStyle === 'premium' ? '#ffffff' : '#f8fafc',
    spacing: u.visualStyle === 'minimal' ? 'airy' : 'balanced',
    containerWidth: u.visualStyle === 'editorial' ? '1140px' : '1200px',
    shadow: u.visualStyle === 'minimal' ? 'soft' : 'elevated',
    buttonStyle: u.visualStyle === 'premium' ? 'outline' : u.visualStyle === 'minimal' ? 'pill' : 'solid',
    cardStyle: u.visualStyle === 'minimal' ? 'bordered' : 'elevated',
  };
}

/* ------------------------------------------------- 3. SECTION STRATEGY */

const BLUEPRINTS: Record<string, string[]> = {
  saas: ['navbar', 'hero', 'trustedby', 'features', 'steps', 'stats', 'testimonials', 'pricing', 'faq', 'cta', 'footer'],
  ai: ['navbar', 'hero', 'trustedby', 'features', 'steps', 'stats', 'testimonials', 'pricing', 'faq', 'cta', 'footer'],
  restaurant: ['navbar', 'hero', 'about', 'menu', 'gallery', 'testimonials', 'location', 'cta', 'contact', 'footer'],
  agency: ['navbar', 'hero', 'trustedby', 'services', 'work', 'steps', 'testimonials', 'team', 'cta', 'contact', 'footer'],
  portfolio: ['navbar', 'hero', 'work', 'about', 'testimonials', 'cta', 'contact', 'footer'],
  app: ['navbar', 'hero', 'features', 'steps', 'stats', 'testimonials', 'pricing', 'faq', 'cta', 'footer'],
  product: ['navbar', 'hero', 'gallery', 'features', 'stats', 'testimonials', 'pricing', 'faq', 'cta', 'footer'],
  event: ['navbar', 'hero', 'steps', 'gallery', 'testimonials', 'faq', 'location', 'cta', 'contact', 'footer'],
  creator: ['navbar', 'hero', 'about', 'work', 'testimonials', 'pricing', 'cta', 'footer'],
  local: ['navbar', 'hero', 'services', 'about', 'testimonials', 'location', 'cta', 'contact', 'footer'],
};

export function planStructure(u: Understanding, brief: WebsiteBrief): string[] {
  const plan = [...(BLUEPRINTS[u.siteType] ?? BLUEPRINTS['saas']!)];
  const text = `${brief.prompt} ${brief.requirements ?? ''}`.toLowerCase();

  const insertBefore = (anchor: string, category: string) => {
    if (plan.includes(category)) return;
    const at = plan.indexOf(anchor);
    plan.splice(at === -1 ? plan.length - 1 : at, 0, category);
  };

  if (/team|founders/.test(text)) insertBefore('cta', 'team');
  if (/gallery|photos|images/.test(text)) insertBefore('testimonials', 'gallery');
  if (/faq|questions/.test(text)) insertBefore('cta', 'faq');
  if (/contact|reach us|enquir/.test(text)) insertBefore('footer', 'contact');
  if (/no pricing|free|without pricing/.test(text)) {
    const i = plan.indexOf('pricing');
    if (i > -1) plan.splice(i, 1);
  }
  return plan;
}

/* ------------------------------------------------------ 4. CONTENT GEN */

const NAV_LABELS: Record<string, string> = {
  features: 'Features',
  services: 'Services',
  work: 'Work',
  menu: 'Menu',
  gallery: 'Gallery',
  steps: 'How it works',
  pricing: 'Pricing',
  testimonials: 'Reviews',
  faq: 'FAQ',
  contact: 'Contact',
  about: 'About',
  location: 'Visit',
};

const heroHeadline = (u: Understanding): string => {
  switch (u.siteType) {
    case 'ai':
      return `Detect what matters before it becomes an incident.`;
    case 'saas':
      return `The workspace ${u.audience} actually stick with.`;
    case 'restaurant':
      return `Seasonal cooking, served with intent.`;
    case 'agency':
      return `Brands that are impossible to scroll past.`;
    case 'portfolio':
      return `Design work with a point of view.`;
    case 'app':
      return `Your day, finally in one place.`;
    case 'event':
      return `Two days. One room. Every idea worth stealing.`;
    case 'creator':
      return `Learn the craft from someone still doing it.`;
    case 'local':
      return `Careful work, close to home.`;
    default:
      return `${u.brand}, built for ${u.audience}.`;
  }
};

const iconFor = (idx: number, type: string): string => {
  const sets: Record<string, string[]> = {
    ai: ['shield', 'radar', 'zap', 'lock', 'activity', 'brain'],
    saas: ['layers', 'zap', 'bar-chart-3', 'users', 'plug', 'clock'],
    restaurant: ['utensils', 'leaf', 'wine', 'chef-hat'],
    agency: ['pen-tool', 'megaphone', 'monitor', 'sparkles'],
    default: ['sparkles', 'zap', 'check-circle', 'compass', 'heart', 'star'],
  };
  return pick(sets[type] ?? sets['default']!, idx);
};

function contentFor(category: string, u: Understanding, brief: WebsiteBrief, plan: string[]): Record<string, any> {
  const images = IMAGES[u.siteType] ?? IMAGES['default']!;

  switch (category) {
    case 'navbar':
      return {
        name: u.brand,
        cta: u.cta,
        items: plan
          .filter((c) => NAV_LABELS[c])
          .slice(0, 4)
          .map((c) => ({ label: NAV_LABELS[c], href: `#${c === 'steps' ? 'how-it-works' : c}` })),
      };
    case 'hero':
      return {
        eyebrow: `${u.brand} · ${u.offering.slice(0, 48)}`,
        title: heroHeadline(u),
        subtitle: `${u.brand} is ${u.offering}. Made for ${u.audience}, with a ${u.tone} approach to every detail.`,
        cta: u.cta,
        secondary_cta: 'See how it works',
        image: pick(images, 0),
        image_alt: `${u.brand} product overview`,
      };
    case 'trustedby':
      return {
        title: 'Built for',
        items: [
          { label: 'Founders', icon: 'rocket' },
          { label: 'Developers', icon: 'code' },
          { label: 'Agencies', icon: 'briefcase' },
          { label: 'Freelancers', icon: 'user' },
          { label: 'Small teams', icon: 'users' },
        ],
      };
    case 'steps':
      return {
        title: 'How it works',
        subtitle: `Four steps from first contact to a result ${u.audience} can measure.`,
        items: [
          { step: '01', title: 'Tell us the goal', description: `Share what ${u.brand} needs to achieve and who it is for.` },
          { step: '02', title: 'We plan it', description: 'Structure, priorities and the message that has to land first.' },
          { step: '03', title: 'We build it', description: 'Design and delivery in short, reviewable increments.' },
          { step: '04', title: 'You ship', description: 'Launch, measure, then refine the parts that matter.' },
        ],
      };
    case 'features':
      return {
        eyebrow: 'Capabilities',
        title: `Everything ${u.brand} does well`,
        subtitle: `Focused capabilities instead of a long feature list nobody reads.`,
        items: [
          { title: 'Made to fit', description: `Shaped around how ${u.audience} already work.`, icon: iconFor(0, u.siteType) },
          { title: 'Fast by default', description: 'Lightweight, responsive and quick on any connection.', icon: iconFor(1, u.siteType) },
          { title: 'Clear reporting', description: 'You always know what changed and why it mattered.', icon: iconFor(2, u.siteType) },
          { title: 'Safe to grow', description: 'Sensible defaults that hold up as demand increases.', icon: iconFor(3, u.siteType) },
          { title: 'Human support', description: 'Real answers from people who know the product.', icon: iconFor(4, u.siteType) },
          { title: 'No lock-in', description: 'Your content and data stay portable.', icon: iconFor(5, u.siteType) },
        ],
      };
    case 'services':
      return {
        eyebrow: 'Services',
        title: `What ${u.brand} takes on`,
        subtitle: `A short list of things we do properly for ${u.audience}.`,
        items: [
          { title: 'Strategy', description: 'Positioning, messaging and the plan behind the work.', icon: 'compass' },
          { title: 'Design', description: 'Identity and interface work with a clear point of view.', icon: 'pen-tool' },
          { title: 'Delivery', description: 'Build, launch and iterate without losing momentum.', icon: 'rocket' },
        ],
      };
    case 'about':
      return {
        eyebrow: 'About',
        title: `The story behind ${u.brand}`,
        subtitle: `${u.brand} started with a simple frustration: ${u.audience} deserved better than what was available. ${u.offering.charAt(0).toUpperCase() + u.offering.slice(1)} — done with a ${u.tone} approach.`,
        cta: u.cta,
        image: pick(images, 1),
        image_alt: `Inside ${u.brand}`,
      };
    case 'stats':
      return {
        items: [
          { value: '4.9/5', label: 'Average review score' },
          { value: '< 2 min', label: 'Time to first result' },
          { value: '30+', label: 'Projects delivered' },
          { value: '100%', label: 'Standalone output' },
        ],
      };
    case 'menu':
      return {
        eyebrow: 'Kitchen',
        title: 'Signature plates',
        subtitle: 'A short menu that changes with the season.',
        items: [
          { name: 'Charred leek & hazelnut', description: 'Burnt butter, aged sherry vinegar.', price: '£14' },
          { name: 'Line-caught bream', description: 'Fennel, brown crab, sea herbs.', price: '£26' },
          { name: 'Dry-aged sirloin', description: 'Confit shallot, bone marrow crumb.', price: '£32' },
          { name: 'Buttermilk tart', description: 'Rhubarb, toasted oat, sheep yoghurt.', price: '£9' },
        ],
      };
    case 'gallery':
      return {
        title: u.siteType === 'restaurant' ? 'Inside the room' : 'Selected visuals',
        subtitle: 'A closer look at the details.',
        items: [0, 1, 2].map((i) => ({
          image: pick(images, i),
          alt: `${u.brand} photograph ${i + 1}`,
          caption: ['Room', 'Detail', 'Craft'][i],
        })),
      };
    case 'work':
      return {
        title: 'Selected work',
        subtitle: `Recent projects for ${u.audience}.`,
        items: [0, 1].map((i) => ({
          image: pick(images, i),
          alt: `Case study ${i + 1}`,
          tag: ['Brand', 'Product'][i],
          title: ['Rebuilding a category leader', 'A launch that sold out'][i],
          description: ['Positioning, identity and site in six weeks.', 'Story, design and delivery for a first release.'][i],
        })),
      };
    case 'team':
      return {
        title: 'The people behind it',
        subtitle: 'Small team, senior work.',
        items: [0, 1, 2, 3].map((i) => ({
          name: ['Ada Ellis', 'Marc Oyelaran', 'Nina Vogel', 'Tomas Reid'][i],
          role: ['Founder', 'Design lead', 'Engineering', 'Client partner'][i],
          avatar: pick(AVATARS, i),
        })),
      };
    case 'testimonials':
      return {
        title: 'Example feedback',
        subtitle: 'Illustrative quotes showing the outcome this work is designed to achieve.',
        items: [0, 1, 2].map((i) => ({
          quote: [
            `We understood the value of ${u.brand} within a day, not a quarter.`,
            'It replaced three tools and a lot of guesswork.',
            'The result looked considered, not assembled.',
          ][i],
          name: ['Sample reviewer', 'Sample reviewer', 'Sample reviewer'][i],
          role: ['Example — operations lead', 'Example — founder', 'Example — head of design'][i],
          avatar: pick(AVATARS, i),
        })),
      };
    case 'pricing':
      return {
        title: 'Simple pricing',
        subtitle: 'Start small, move up when it pays for itself.',
        items: [
          { name: 'Starter', price: '$0', cta: 'Start free', features: ['1 project', 'Core features', 'Community support'] },
          { name: 'Studio', price: '$29', cta: u.cta, highlight: true, features: ['Unlimited projects', 'Advanced controls', 'Priority support'] },
          { name: 'Scale', price: 'Custom', cta: 'Talk to us', features: ['Team access', 'Onboarding', 'Service agreement'] },
        ],
      };
    case 'faq':
      return {
        title: 'Frequently asked',
        items: [
          { question: `What exactly do I get with ${u.brand}?`, answer: `${u.offering.charAt(0).toUpperCase() + u.offering.slice(1)}, delivered as a finished, responsive experience.` },
          { question: 'How quickly can we start?', answer: 'Usually within a few days of the first conversation.' },
          { question: 'Can we change things later?', answer: 'Yes — everything is built to be edited section by section.' },
          { question: 'Who is this for?', answer: `Mainly ${u.audience}.` },
        ],
      };
    case 'location':
      return {
        eyebrow: 'Visit',
        title: 'Where to find us',
        subtitle: 'Walk-ins welcome; booking recommended at weekends.',
        image: pick(images, 2),
        image_alt: `${u.brand} location`,
        items: [
          { label: '18 Cavendish Lane, London', icon: 'map-pin' },
          { label: 'Tue–Sun, 12:00 – 23:00', icon: 'clock' },
          { label: '+44 20 7946 0102', icon: 'phone' },
        ],
      };
    case 'cta':
      return {
        title: u.siteType === 'restaurant' ? 'Hungry?' : 'Ready when you are.',
        subtitle: `Take the next step with ${u.brand}.`,
        cta: u.cta,
      };
    case 'contact':
      return {
        title: 'Get in touch',
        subtitle: 'Tell us what you need and we will reply within one working day.',
        cta: 'Send message',
      };
    case 'footer':
      return {
        name: u.brand,
        tagline: `${u.offering.charAt(0).toUpperCase() + u.offering.slice(1)}.`,
        items: [
          { label: 'Privacy', href: '#' },
          { label: 'Terms', href: '#' },
          { label: 'Contact', href: '#contact' },
        ],
      };
    default:
      return { title: category, subtitle: '' };
  }
}

/* ------------------------------------------------------- 5. ASSEMBLE */

export function buildSection(
  category: string,
  u: Understanding,
  brief: WebsiteBrief,
  plan: string[],
  opts: { exclude?: string | undefined; id?: string | undefined } = {},
): Section {
  const block = selectBlock({
    category,
    theme: u.theme,
    style: u.visualStyle,
    siteType: u.siteType,
    exclude: opts.exclude,
  });
  return {
    id: opts.id ?? `${category}-${Math.random().toString(36).slice(2, 8)}`,
    type: category,
    label: NAV_LABELS[category] ?? category,
    blockId: block?.id,
    content: contentFor(category, u, brief, plan),
  };
}

export function generateWebsite(brief: WebsiteBrief): WebsiteConfig {
  if (!brief.prompt?.trim() && !brief.description?.trim()) {
    throw new Error('Describe the website you want before generating.');
  }

  const u = understand(brief);
  const designSystem = buildDesignSystem(brief, u);
  const plan = planStructure(u, brief);
  const sections = plan.map((category) => buildSection(category, u, brief, plan));

  return {
    name: u.brand,
    description: `${u.offering.charAt(0).toUpperCase() + u.offering.slice(1)}`.slice(0, 150),
    type: u.siteType,
    brief,
    strategy: [
      `Understood brief as a ${u.siteType} website in a ${u.visualStyle} ${u.theme} direction`,
      `Audience: ${u.audience}`,
      `Planned ${plan.length} sections: ${plan.join(' → ')}`,
      `Design system locked: ${designSystem.primaryColor} / ${designSystem.headingFont}`,
    ],
    designSystem,
    sections,
  };
}

/* -------------------------------------------------------- 6. REFINE */

const TONE_TRANSFORMS: Record<string, (text: string) => string> = {
  premium: (t) => t.replace(/\bgreat\b/gi, 'exceptional').replace(/\bgood\b/gi, 'considered'),
  shorter: (t) => t.split(/(?<=\.)\s+/)[0] ?? t,
  persuasive: (t) => `${t.replace(/\.$/, '')} — and you can see the difference in a week.`,
  professional: (t) => t.replace(/!+/g, '.').replace(/\bstuff\b/gi, 'work'),
  playful: (t) => `${t.replace(/\.$/, '')} (yes, really).`,
};

export function refineSection(section: Section, instruction: string): Section {
  const transform = TONE_TRANSFORMS[instruction];
  const content = { ...section.content };

  if (transform) {
    for (const key of ['title', 'subtitle']) {
      if (typeof content[key] === 'string') content[key] = transform(content[key]);
    }
    if (Array.isArray(content['items'])) {
      content['items'] = content['items'].map((item: any) =>
        typeof item?.description === 'string' ? { ...item, description: transform(item.description) } : item,
      );
    }
    return { ...section, content };
  }

  if (instruction === 'layout') {
    const next = selectBlock({ category: section.type, exclude: section.blockId });
    return { ...section, blockId: next?.id ?? section.blockId };
  }
  return { ...section, content };
}
