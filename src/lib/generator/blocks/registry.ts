import { BlockTemplate } from '../../../types/website';

/**
 * Block registry.
 *
 * Sources:
 *  - `tailblocks`: layout patterns adapted from Tailblocks (https://tailblocks.cc),
 *    MIT licensed by Mert Cukuren. Markup is re-authored to consume our
 *    generated design-system classes (.ds-*) so every block renders as one
 *    coherent website instead of a pile of unrelated snippets.
 *  - `custom`: our own proprietary patterns.
 *  - `ai`: blocks produced at generation time.
 *
 * Design-system contract every block MUST follow:
 *   .ds-section    outer vertical rhythm
 *   .ds-container  max width + horizontal padding
 *   .ds-title / .ds-subtitle / .ds-eyebrow  typography
 *   .ds-btn / .ds-btn-secondary  buttons
 *   .ds-card       surfaces
 * Colors come from CSS variables (--primary, --foreground, ...).
 */

const TAILBLOCKS = {
  attribution: 'Layout pattern adapted from Tailblocks (tailblocks.cc)',
  license: 'MIT — Mert Cukuren',
} as const;

export const BLOCK_REGISTRY: BlockTemplate[] = [
  /* ------------------------------------------------------------ NAVBAR */
  {
    id: 'navbar-01',
    category: 'navbar',
    source: 'tailblocks',
    layout: 'logo-left',
    styles: ['modern', 'saas', 'minimal'],
    themes: ['light', 'dark'],
    bestFor: ['any'],
    ...TAILBLOCKS,
    html: `
<header class="ds-nav" id="top">
  <div class="ds-container flex items-center justify-between py-4">
    <a href="#top" class="flex items-center gap-2 font-semibold text-[color:var(--foreground)]">
      <span class="ds-logo">{{INITIAL}}</span>
      <span class="text-lg tracking-tight">{{NAME}}</span>
    </a>
    <nav aria-label="Main navigation" class="hidden md:flex items-center gap-8 text-sm text-[color:var(--muted-foreground)]">
      {{ITEMS}}
    </nav>
    <div class="flex items-center gap-3">
      <a href="#cta" class="ds-btn text-sm">{{CTA}}</a>
      <button class="md:hidden ds-nav-toggle" aria-label="Toggle navigation" aria-expanded="false" data-nav-toggle>
        <i data-lucide="menu"></i>
      </button>
    </div>
  </div>
  <nav aria-label="Mobile navigation" class="md:hidden hidden border-t border-[color:var(--border)]" data-nav-panel>
    <div class="ds-container flex flex-col gap-4 py-4 text-sm text-[color:var(--muted-foreground)]">{{ITEMS}}</div>
  </nav>
</header>`,
    itemHtml: `<a href="{{HREF}}" class="hover:text-[color:var(--primary)] transition-colors">{{LABEL}}</a>`,
  },

  /* -------------------------------------------------------------- HERO */
  {
    id: 'hero-split',
    category: 'hero',
    source: 'tailblocks',
    layout: 'split',
    styles: ['modern', 'saas'],
    themes: ['light', 'dark'],
    bestFor: ['saas', 'startup', 'product'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="hero">
  <div class="ds-container flex flex-col md:flex-row items-center gap-12">
    <div class="md:w-1/2 text-center md:text-left">
      <p class="ds-eyebrow">{{EYEBROW}}</p>
      <h1 class="ds-title text-4xl sm:text-5xl">{{TITLE}}</h1>
      <p class="ds-subtitle md:mx-0">{{SUBTITLE}}</p>
      <div class="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
        <a href="#cta" class="ds-btn">{{CTA}}</a>
        <a href="#features" class="ds-btn-secondary">{{SECONDARY_CTA}}</a>
      </div>
    </div>
    <div class="md:w-1/2 w-full">
      <img class="ds-media w-full" loading="lazy" alt="{{IMAGE_ALT}}" src="{{IMAGE}}">
    </div>
  </div>
</section>`,
  },
  {
    id: 'hero-centered',
    category: 'hero',
    source: 'tailblocks',
    layout: 'centered',
    styles: ['minimal', 'bold'],
    themes: ['light', 'dark'],
    bestFor: ['product', 'app', 'creator', 'event'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="hero">
  <div class="ds-container text-center">
    <p class="ds-eyebrow">{{EYEBROW}}</p>
    <h1 class="ds-title text-4xl sm:text-6xl max-w-4xl mx-auto">{{TITLE}}</h1>
    <p class="ds-subtitle">{{SUBTITLE}}</p>
    <div class="mt-8 flex flex-wrap gap-3 justify-center">
      <a href="#cta" class="ds-btn">{{CTA}}</a>
      <a href="#features" class="ds-btn-secondary">{{SECONDARY_CTA}}</a>
    </div>
    <img class="ds-media mt-14 w-full max-w-4xl mx-auto" loading="lazy" alt="{{IMAGE_ALT}}" src="{{IMAGE}}">
  </div>
</section>`,
  },
  {
    id: 'hero-dashboard',
    category: 'hero',
    source: 'custom',
    layout: 'product-visual',
    styles: ['modern', 'futuristic', 'saas'],
    themes: ['dark', 'light'],
    bestFor: ['saas', 'ai', 'startup'],
    html: `
<section class="ds-section relative overflow-hidden" id="hero">
  <div class="ds-glow" aria-hidden="true"></div>
  <div class="ds-container relative text-center">
    <p class="ds-eyebrow">{{EYEBROW}}</p>
    <h1 class="ds-title text-4xl sm:text-6xl max-w-4xl mx-auto">{{TITLE}}</h1>
    <p class="ds-subtitle">{{SUBTITLE}}</p>
    <div class="mt-8 flex flex-wrap gap-3 justify-center">
      <a href="#cta" class="ds-btn">{{CTA}}</a>
      <a href="#features" class="ds-btn-secondary">{{SECONDARY_CTA}}</a>
    </div>
    <div class="ds-card mt-16 max-w-5xl mx-auto p-3">
      <div class="flex gap-1.5 px-2 pb-3">
        <span class="w-2.5 h-2.5 rounded-full opacity-60" style="background:var(--primary)"></span>
        <span class="w-2.5 h-2.5 rounded-full opacity-60" style="background:var(--accent)"></span>
        <span class="w-2.5 h-2.5 rounded-full opacity-30" style="background:var(--muted-foreground)"></span>
      </div>
      <img class="ds-media w-full" loading="lazy" alt="{{IMAGE_ALT}}" src="{{IMAGE}}">
    </div>
  </div>
</section>`,
  },
  {
    id: 'hero-bold',
    category: 'hero',
    source: 'custom',
    layout: 'bold-typography',
    styles: ['bold', 'editorial'],
    themes: ['light', 'dark'],
    bestFor: ['agency', 'portfolio', 'creator', 'restaurant'],
    html: `
<section class="ds-section" id="hero">
  <div class="ds-container">
    <p class="ds-eyebrow">{{EYEBROW}}</p>
    <h1 class="ds-title text-5xl sm:text-7xl leading-[0.95] max-w-5xl">{{TITLE}}</h1>
    <div class="mt-8 flex flex-col md:flex-row md:items-end gap-8">
      <p class="ds-subtitle md:mx-0 md:w-1/2">{{SUBTITLE}}</p>
      <div class="flex flex-wrap gap-3">
        <a href="#cta" class="ds-btn">{{CTA}}</a>
        <a href="#features" class="ds-btn-secondary">{{SECONDARY_CTA}}</a>
      </div>
    </div>
    <img class="ds-media mt-14 w-full" loading="lazy" alt="{{IMAGE_ALT}}" src="{{IMAGE}}">
  </div>
</section>`,
  },

  /* -------------------------------------------------------- TRUSTED BY */
  {
    id: 'trustedby-01',
    category: 'trustedby',
    source: 'custom',
    layout: 'inline-labels',
    styles: ['minimal'],
    themes: ['light', 'dark'],
    bestFor: ['saas', 'agency', 'startup'],
    html: `
<section class="ds-section-tight" id="trustedby">
  <div class="ds-container text-center">
    <p class="ds-eyebrow">{{TITLE}}</p>
    <div class="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-medium text-[color:var(--muted-foreground)]">
      {{ITEMS}}
    </div>
  </div>
</section>`,
    itemHtml: `<span class="inline-flex items-center gap-2"><i data-lucide="{{ICON}}" class="w-4 h-4"></i>{{LABEL}}</span>`,
  },

  /* ------------------------------------------------------------- STEPS */
  {
    id: 'steps-01',
    category: 'steps',
    source: 'tailblocks',
    layout: 'timeline',
    styles: ['modern'],
    themes: ['light', 'dark'],
    bestFor: ['saas', 'agency', 'services'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="how-it-works">
  <div class="ds-container">
    <div class="text-center">
      <h2 class="ds-title text-3xl sm:text-4xl">{{TITLE}}</h2>
      <p class="ds-subtitle">{{SUBTITLE}}</p>
    </div>
    <ol class="mt-14 grid gap-6 md:grid-cols-4">{{ITEMS}}</ol>
  </div>
</section>`,
    itemHtml: `
<li class="ds-card p-6">
  <span class="ds-step">{{STEP}}</span>
  <h3 class="mt-4 font-semibold text-lg">{{TITLE}}</h3>
  <p class="mt-2 text-sm text-[color:var(--muted-foreground)]">{{DESCRIPTION}}</p>
</li>`,
  },

  /* ---------------------------------------------------------- FEATURES */
  {
    id: 'features-grid3',
    category: 'features',
    source: 'tailblocks',
    layout: 'grid-3',
    styles: ['modern', 'saas'],
    themes: ['light', 'dark'],
    bestFor: ['saas', 'services', 'startup'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="features">
  <div class="ds-container">
    <div class="text-center">
      <p class="ds-eyebrow">{{EYEBROW}}</p>
      <h2 class="ds-title text-3xl sm:text-4xl">{{TITLE}}</h2>
      <p class="ds-subtitle">{{SUBTITLE}}</p>
    </div>
    <div class="mt-14 grid gap-6 md:grid-cols-3">{{ITEMS}}</div>
  </div>
</section>`,
    itemHtml: `
<article class="ds-card p-6">
  <span class="ds-icon"><i data-lucide="{{ICON}}"></i></span>
  <h3 class="mt-4 font-semibold text-lg">{{TITLE}}</h3>
  <p class="mt-2 text-sm text-[color:var(--muted-foreground)]">{{DESCRIPTION}}</p>
</article>`,
  },
  {
    id: 'features-grid4',
    category: 'features',
    source: 'tailblocks',
    layout: 'grid-4',
    styles: ['modern', 'minimal'],
    themes: ['light', 'dark'],
    bestFor: ['saas', 'app', 'product'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="features">
  <div class="ds-container">
    <h2 class="ds-title text-3xl sm:text-4xl text-center">{{TITLE}}</h2>
    <p class="ds-subtitle">{{SUBTITLE}}</p>
    <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{{ITEMS}}</div>
  </div>
</section>`,
    itemHtml: `
<article class="ds-card p-5">
  <span class="ds-icon"><i data-lucide="{{ICON}}"></i></span>
  <h3 class="mt-4 font-semibold">{{TITLE}}</h3>
  <p class="mt-2 text-sm text-[color:var(--muted-foreground)]">{{DESCRIPTION}}</p>
</article>`,
  },
  {
    id: 'features-alternating',
    category: 'features',
    source: 'tailblocks',
    layout: 'alternating',
    styles: ['editorial', 'minimal'],
    themes: ['light', 'dark'],
    bestFor: ['startup', 'product', 'app'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="features">
  <div class="ds-container">
    <h2 class="ds-title text-3xl sm:text-4xl text-center">{{TITLE}}</h2>
    <p class="ds-subtitle">{{SUBTITLE}}</p>
    <div class="mt-14 space-y-6">{{ITEMS}}</div>
  </div>
</section>`,
    itemHtml: `
<article class="ds-card flex flex-col sm:flex-row items-start gap-5 p-6">
  <span class="ds-icon"><i data-lucide="{{ICON}}"></i></span>
  <div>
    <h3 class="font-semibold text-lg">{{TITLE}}</h3>
    <p class="mt-2 text-sm text-[color:var(--muted-foreground)]">{{DESCRIPTION}}</p>
  </div>
</article>`,
  },
  {
    id: 'features-bento',
    category: 'features',
    source: 'custom',
    layout: 'bento',
    styles: ['modern', 'bold'],
    themes: ['dark', 'light'],
    bestFor: ['ai', 'saas', 'product'],
    html: `
<section class="ds-section" id="features">
  <div class="ds-container">
    <h2 class="ds-title text-3xl sm:text-4xl text-center">{{TITLE}}</h2>
    <p class="ds-subtitle">{{SUBTITLE}}</p>
    <div class="mt-14 grid gap-4 md:grid-cols-3 [&>*:first-child]:md:col-span-2 [&>*:first-child]:md:row-span-2">{{ITEMS}}</div>
  </div>
</section>`,
    itemHtml: `
<article class="ds-card p-6 flex flex-col justify-between">
  <span class="ds-icon"><i data-lucide="{{ICON}}"></i></span>
  <div class="mt-6">
    <h3 class="font-semibold text-lg">{{TITLE}}</h3>
    <p class="mt-2 text-sm text-[color:var(--muted-foreground)]">{{DESCRIPTION}}</p>
  </div>
</article>`,
  },

  /* ---------------------------------------------------------- SERVICES */
  {
    id: 'services-01',
    category: 'services',
    source: 'tailblocks',
    layout: 'grid-3',
    styles: ['modern', 'editorial'],
    themes: ['light', 'dark'],
    bestFor: ['agency', 'services', 'local'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="services">
  <div class="ds-container">
    <p class="ds-eyebrow">{{EYEBROW}}</p>
    <h2 class="ds-title text-3xl sm:text-4xl">{{TITLE}}</h2>
    <p class="ds-subtitle md:mx-0">{{SUBTITLE}}</p>
    <div class="mt-12 grid gap-6 md:grid-cols-3">{{ITEMS}}</div>
  </div>
</section>`,
    itemHtml: `
<article class="ds-card p-6">
  <span class="ds-icon"><i data-lucide="{{ICON}}"></i></span>
  <h3 class="mt-4 font-semibold text-lg">{{TITLE}}</h3>
  <p class="mt-2 text-sm text-[color:var(--muted-foreground)]">{{DESCRIPTION}}</p>
</article>`,
  },

  /* ------------------------------------------------------------- ABOUT */
  {
    id: 'about-01',
    category: 'about',
    source: 'tailblocks',
    layout: 'image-left',
    styles: ['editorial', 'minimal'],
    themes: ['light', 'dark'],
    bestFor: ['restaurant', 'local', 'agency', 'portfolio'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="about">
  <div class="ds-container flex flex-col md:flex-row items-center gap-12">
    <img class="ds-media md:w-1/2 w-full" loading="lazy" alt="{{IMAGE_ALT}}" src="{{IMAGE}}">
    <div class="md:w-1/2">
      <p class="ds-eyebrow">{{EYEBROW}}</p>
      <h2 class="ds-title text-3xl sm:text-4xl">{{TITLE}}</h2>
      <p class="ds-subtitle md:mx-0">{{SUBTITLE}}</p>
      <a href="#cta" class="ds-btn mt-8 inline-flex">{{CTA}}</a>
    </div>
  </div>
</section>`,
  },

  /* ------------------------------------------------------------- STATS */
  {
    id: 'stats-01',
    category: 'stats',
    source: 'tailblocks',
    layout: 'grid-4',
    styles: ['minimal', 'modern'],
    themes: ['light', 'dark'],
    bestFor: ['saas', 'agency', 'startup'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section-tight" id="stats">
  <div class="ds-container">
    <div class="grid gap-6 grid-cols-2 md:grid-cols-4 text-center">{{ITEMS}}</div>
  </div>
</section>`,
    itemHtml: `
<div class="ds-card p-6">
  <p class="text-3xl font-bold" style="color:var(--primary)">{{VALUE}}</p>
  <p class="mt-1 text-sm text-[color:var(--muted-foreground)]">{{LABEL}}</p>
</div>`,
  },

  /* ----------------------------------------------------------- GALLERY */
  {
    id: 'gallery-01',
    category: 'gallery',
    source: 'tailblocks',
    layout: 'grid-3',
    styles: ['editorial', 'minimal'],
    themes: ['light', 'dark'],
    bestFor: ['restaurant', 'portfolio', 'agency', 'event'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="gallery">
  <div class="ds-container">
    <h2 class="ds-title text-3xl sm:text-4xl text-center">{{TITLE}}</h2>
    <p class="ds-subtitle">{{SUBTITLE}}</p>
    <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{{ITEMS}}</div>
  </div>
</section>`,
    itemHtml: `<figure class="ds-card overflow-hidden"><img class="w-full h-64 object-cover" loading="lazy" alt="{{ALT}}" src="{{IMAGE}}"><figcaption class="p-4 text-sm text-[color:var(--muted-foreground)]">{{CAPTION}}</figcaption></figure>`,
  },

  /* -------------------------------------------------------------- MENU */
  {
    id: 'menu-01',
    category: 'menu',
    source: 'custom',
    layout: 'list',
    styles: ['editorial', 'premium'],
    themes: ['light', 'dark'],
    bestFor: ['restaurant', 'local'],
    html: `
<section class="ds-section" id="menu">
  <div class="ds-container">
    <p class="ds-eyebrow text-center">{{EYEBROW}}</p>
    <h2 class="ds-title text-3xl sm:text-4xl text-center">{{TITLE}}</h2>
    <p class="ds-subtitle">{{SUBTITLE}}</p>
    <ul class="mt-12 grid gap-4 md:grid-cols-2">{{ITEMS}}</ul>
  </div>
</section>`,
    itemHtml: `
<li class="ds-card p-5 flex items-start justify-between gap-4">
  <div>
    <h3 class="font-semibold">{{NAME}}</h3>
    <p class="mt-1 text-sm text-[color:var(--muted-foreground)]">{{DESCRIPTION}}</p>
  </div>
  <span class="font-semibold whitespace-nowrap" style="color:var(--primary)">{{PRICE}}</span>
</li>`,
  },

  /* -------------------------------------------------------------- WORK */
  {
    id: 'work-01',
    category: 'work',
    source: 'tailblocks',
    layout: 'grid-2',
    styles: ['editorial', 'bold'],
    themes: ['light', 'dark'],
    bestFor: ['agency', 'portfolio', 'creator'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="work">
  <div class="ds-container">
    <h2 class="ds-title text-3xl sm:text-4xl">{{TITLE}}</h2>
    <p class="ds-subtitle md:mx-0">{{SUBTITLE}}</p>
    <div class="mt-12 grid gap-6 md:grid-cols-2">{{ITEMS}}</div>
  </div>
</section>`,
    itemHtml: `
<article class="ds-card overflow-hidden">
  <img class="w-full h-56 object-cover" loading="lazy" alt="{{ALT}}" src="{{IMAGE}}">
  <div class="p-6">
    <p class="ds-eyebrow">{{TAG}}</p>
    <h3 class="font-semibold text-lg">{{TITLE}}</h3>
    <p class="mt-2 text-sm text-[color:var(--muted-foreground)]">{{DESCRIPTION}}</p>
  </div>
</article>`,
  },

  /* -------------------------------------------------------------- TEAM */
  {
    id: 'team-01',
    category: 'team',
    source: 'tailblocks',
    layout: 'grid-4',
    styles: ['modern', 'minimal'],
    themes: ['light', 'dark'],
    bestFor: ['agency', 'services', 'startup'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="team">
  <div class="ds-container">
    <h2 class="ds-title text-3xl sm:text-4xl text-center">{{TITLE}}</h2>
    <p class="ds-subtitle">{{SUBTITLE}}</p>
    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{{ITEMS}}</div>
  </div>
</section>`,
    itemHtml: `
<article class="ds-card p-6 text-center">
  <img class="w-20 h-20 rounded-full object-cover mx-auto" loading="lazy" alt="Portrait of {{NAME}}" src="{{AVATAR}}">
  <h3 class="mt-4 font-semibold">{{NAME}}</h3>
  <p class="text-sm text-[color:var(--muted-foreground)]">{{ROLE}}</p>
</article>`,
  },

  /* ------------------------------------------------------ TESTIMONIALS */
  {
    id: 'testimonials-cards',
    category: 'testimonials',
    source: 'tailblocks',
    layout: 'grid-3',
    styles: ['modern', 'saas'],
    themes: ['light', 'dark'],
    bestFor: ['saas', 'services', 'agency'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="testimonials">
  <div class="ds-container">
    <h2 class="ds-title text-3xl sm:text-4xl text-center">{{TITLE}}</h2>
    <p class="ds-subtitle">{{SUBTITLE}}</p>
    <div class="mt-12 grid gap-6 md:grid-cols-3">{{ITEMS}}</div>
  </div>
</section>`,
    itemHtml: `
<figure class="ds-card p-6">
  <i data-lucide="quote" class="w-5 h-5" style="color:var(--primary)"></i>
  <blockquote class="mt-4 text-sm leading-relaxed">{{QUOTE}}</blockquote>
  <figcaption class="mt-6 flex items-center gap-3">
    <img class="w-10 h-10 rounded-full object-cover" loading="lazy" alt="Portrait of {{NAME}}" src="{{AVATAR}}">
    <span><span class="block font-semibold text-sm">{{NAME}}</span><span class="block text-xs text-[color:var(--muted-foreground)]">{{ROLE}}</span></span>
  </figcaption>
</figure>`,
  },
  {
    id: 'testimonials-quote',
    category: 'testimonials',
    source: 'custom',
    layout: 'large-quote',
    styles: ['editorial', 'bold'],
    themes: ['light', 'dark'],
    bestFor: ['agency', 'portfolio', 'restaurant'],
    html: `
<section class="ds-section" id="testimonials">
  <div class="ds-container max-w-3xl text-center">
    <h2 class="ds-title text-3xl sm:text-4xl">{{TITLE}}</h2>
    <div class="mt-10 space-y-10">{{ITEMS}}</div>
  </div>
</section>`,
    itemHtml: `
<figure>
  <blockquote class="text-xl sm:text-2xl font-medium leading-snug">“{{QUOTE}}”</blockquote>
  <figcaption class="mt-4 text-sm text-[color:var(--muted-foreground)]">{{NAME}} — {{ROLE}}</figcaption>
</figure>`,
  },
  {
    id: 'testimonials-grid',
    category: 'testimonials',
    source: 'tailblocks',
    layout: 'grid-2',
    styles: ['minimal'],
    themes: ['light', 'dark'],
    bestFor: ['saas', 'local', 'product'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="testimonials">
  <div class="ds-container">
    <h2 class="ds-title text-3xl sm:text-4xl text-center">{{TITLE}}</h2>
    <div class="mt-12 grid gap-6 md:grid-cols-2">{{ITEMS}}</div>
  </div>
</section>`,
    itemHtml: `
<figure class="ds-card p-6 flex gap-4">
  <img class="w-12 h-12 rounded-full object-cover flex-shrink-0" loading="lazy" alt="Portrait of {{NAME}}" src="{{AVATAR}}">
  <div>
    <blockquote class="text-sm leading-relaxed">{{QUOTE}}</blockquote>
    <figcaption class="mt-3 text-xs text-[color:var(--muted-foreground)]">{{NAME}} — {{ROLE}}</figcaption>
  </div>
</figure>`,
  },

  /* ----------------------------------------------------------- PRICING */
  {
    id: 'pricing-3col',
    category: 'pricing',
    source: 'tailblocks',
    layout: 'grid-3-highlight',
    styles: ['modern', 'saas'],
    themes: ['light', 'dark'],
    bestFor: ['saas', 'startup', 'product'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="pricing">
  <div class="ds-container">
    <h2 class="ds-title text-3xl sm:text-4xl text-center">{{TITLE}}</h2>
    <p class="ds-subtitle">{{SUBTITLE}}</p>
    <div class="mt-12 grid gap-6 md:grid-cols-3 items-start">{{ITEMS}}</div>
  </div>
</section>`,
    itemHtml: `
<article class="ds-card p-6 {{HIGHLIGHT_CLASS}}">
  <h3 class="font-semibold">{{NAME}}</h3>
  <p class="mt-3 text-3xl font-bold">{{PRICE}}</p>
  <ul class="mt-6 space-y-2 text-sm text-[color:var(--muted-foreground)]">{{FEATURES}}</ul>
  <a href="#cta" class="ds-btn mt-8 w-full justify-center">{{CTA}}</a>
</article>`,
  },
  {
    id: 'pricing-2col',
    category: 'pricing',
    source: 'tailblocks',
    layout: 'grid-2',
    styles: ['minimal'],
    themes: ['light', 'dark'],
    bestFor: ['product', 'app', 'creator'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="pricing">
  <div class="ds-container max-w-3xl">
    <h2 class="ds-title text-3xl sm:text-4xl text-center">{{TITLE}}</h2>
    <div class="mt-12 grid gap-6 sm:grid-cols-2 items-start">{{ITEMS}}</div>
  </div>
</section>`,
    itemHtml: `
<article class="ds-card p-6 {{HIGHLIGHT_CLASS}}">
  <h3 class="font-semibold">{{NAME}}</h3>
  <p class="mt-3 text-3xl font-bold">{{PRICE}}</p>
  <ul class="mt-6 space-y-2 text-sm text-[color:var(--muted-foreground)]">{{FEATURES}}</ul>
  <a href="#cta" class="ds-btn mt-8 w-full justify-center">{{CTA}}</a>
</article>`,
  },

  /* --------------------------------------------------------------- FAQ */
  {
    id: 'faq-01',
    category: 'faq',
    source: 'custom',
    layout: 'accordion',
    styles: ['minimal', 'modern'],
    themes: ['light', 'dark'],
    bestFor: ['any'],
    html: `
<section class="ds-section" id="faq">
  <div class="ds-container max-w-3xl">
    <h2 class="ds-title text-3xl sm:text-4xl text-center">{{TITLE}}</h2>
    <div class="mt-10 space-y-3">{{ITEMS}}</div>
  </div>
</section>`,
    itemHtml: `
<details class="ds-card p-5">
  <summary class="cursor-pointer font-medium">{{QUESTION}}</summary>
  <p class="mt-3 text-sm text-[color:var(--muted-foreground)]">{{ANSWER}}</p>
</details>`,
  },

  /* ---------------------------------------------------------- LOCATION */
  {
    id: 'location-01',
    category: 'location',
    source: 'custom',
    layout: 'split',
    styles: ['minimal'],
    themes: ['light', 'dark'],
    bestFor: ['restaurant', 'local', 'event'],
    html: `
<section class="ds-section" id="location">
  <div class="ds-container grid gap-8 md:grid-cols-2 items-center">
    <div>
      <p class="ds-eyebrow">{{EYEBROW}}</p>
      <h2 class="ds-title text-3xl">{{TITLE}}</h2>
      <p class="ds-subtitle md:mx-0">{{SUBTITLE}}</p>
      <ul class="mt-6 space-y-2 text-sm text-[color:var(--muted-foreground)]">{{ITEMS}}</ul>
    </div>
    <img class="ds-media w-full" loading="lazy" alt="{{IMAGE_ALT}}" src="{{IMAGE}}">
  </div>
</section>`,
    itemHtml: `<li class="flex items-center gap-2"><i data-lucide="{{ICON}}" class="w-4 h-4"></i>{{LABEL}}</li>`,
  },

  /* --------------------------------------------------------------- CTA */
  {
    id: 'cta-01',
    category: 'cta',
    source: 'tailblocks',
    layout: 'centered',
    styles: ['modern', 'bold'],
    themes: ['light', 'dark'],
    bestFor: ['any'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="cta">
  <div class="ds-container">
    <div class="ds-card ds-cta p-10 sm:p-14 text-center">
      <h2 class="ds-title text-3xl sm:text-4xl">{{TITLE}}</h2>
      <p class="ds-subtitle">{{SUBTITLE}}</p>
      <a href="#contact" class="ds-btn mt-8 inline-flex">{{CTA}}</a>
    </div>
  </div>
</section>`,
  },

  /* ----------------------------------------------------------- CONTACT */
  {
    id: 'contact-01',
    category: 'contact',
    source: 'tailblocks',
    layout: 'form',
    styles: ['modern', 'minimal'],
    themes: ['light', 'dark'],
    bestFor: ['any'],
    ...TAILBLOCKS,
    html: `
<section class="ds-section" id="contact">
  <div class="ds-container max-w-2xl">
    <h2 class="ds-title text-3xl sm:text-4xl text-center">{{TITLE}}</h2>
    <p class="ds-subtitle">{{SUBTITLE}}</p>
    <form class="ds-card mt-10 p-6 grid gap-4" data-contact-form novalidate>
      <div class="grid gap-1">
        <label class="text-sm font-medium" for="contact-name">Name</label>
        <input class="ds-input" id="contact-name" name="name" type="text" required autocomplete="name">
      </div>
      <div class="grid gap-1">
        <label class="text-sm font-medium" for="contact-email">Email</label>
        <input class="ds-input" id="contact-email" name="email" type="email" required autocomplete="email">
      </div>
      <div class="grid gap-1">
        <label class="text-sm font-medium" for="contact-message">Message</label>
        <textarea class="ds-input h-28" id="contact-message" name="message" required></textarea>
      </div>
      <button class="ds-btn justify-center" type="submit">{{CTA}}</button>
      <p class="text-sm hidden" role="status" data-form-status></p>
    </form>
  </div>
</section>`,
  },

  /* ------------------------------------------------------------ FOOTER */
  {
    id: 'footer-01',
    category: 'footer',
    source: 'tailblocks',
    layout: 'minimal',
    styles: ['modern', 'minimal'],
    themes: ['light', 'dark'],
    bestFor: ['any'],
    ...TAILBLOCKS,
    html: `
<footer class="border-t border-[color:var(--border)]">
  <div class="ds-container py-8 flex flex-col sm:flex-row items-center gap-4">
    <a href="#top" class="flex items-center gap-2 font-semibold"><span class="ds-logo">{{INITIAL}}</span>{{NAME}}</a>
    <p class="text-sm text-[color:var(--muted-foreground)] sm:ml-4">© {{YEAR}} {{NAME}}. {{TAGLINE}}</p>
    <nav aria-label="Footer" class="sm:ml-auto flex gap-4 text-sm text-[color:var(--muted-foreground)]">{{ITEMS}}</nav>
  </div>
</footer>`,
    itemHtml: `<a href="{{HREF}}" class="hover:text-[color:var(--primary)] transition-colors">{{LABEL}}</a>`,
  },
  {
    id: 'footer-columns',
    category: 'footer',
    source: 'tailblocks',
    layout: 'columns',
    styles: ['modern', 'saas'],
    themes: ['light', 'dark'],
    bestFor: ['saas', 'agency'],
    ...TAILBLOCKS,
    html: `
<footer class="border-t border-[color:var(--border)]">
  <div class="ds-container py-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
    <div class="sm:col-span-2">
      <a href="#top" class="flex items-center gap-2 font-semibold"><span class="ds-logo">{{INITIAL}}</span>{{NAME}}</a>
      <p class="mt-3 text-sm text-[color:var(--muted-foreground)] max-w-xs">{{TAGLINE}}</p>
    </div>
    <nav aria-label="Footer" class="flex flex-col gap-2 text-sm text-[color:var(--muted-foreground)]">{{ITEMS}}</nav>
    <div class="text-sm text-[color:var(--muted-foreground)]">© {{YEAR}} {{NAME}}</div>
  </div>
</footer>`,
    itemHtml: `<a href="{{HREF}}" class="hover:text-[color:var(--primary)] transition-colors">{{LABEL}}</a>`,
  },
];

export function getBlock(id: string): BlockTemplate | undefined {
  return BLOCK_REGISTRY.find((b) => b.id === id);
}

export function getBlocksByCategory(category: string): BlockTemplate[] {
  return BLOCK_REGISTRY.filter((b) => b.category === category);
}

/**
 * Metadata-driven selection: never ships the whole library to the model.
 * Scores candidates on theme / style / audience fit, then picks the best
 * (optionally skipping a block we are replacing).
 */
export function selectBlock(opts: {
  category: string;
  theme?: 'light' | 'dark' | undefined;
  style?: string | undefined;
  siteType?: string | undefined;
  exclude?: string | undefined;
}): BlockTemplate | undefined {
  const candidates = getBlocksByCategory(opts.category).filter((b) => b.id !== opts.exclude);
  if (!candidates.length) return getBlocksByCategory(opts.category)[0];

  const scored = candidates.map((b) => {
    let score = 0;
    if (opts.theme && b.themes.includes(opts.theme)) score += 2;
    if (opts.style && b.styles.includes(opts.style)) score += 3;
    if (opts.siteType && (b.bestFor.includes(opts.siteType) || b.bestFor.includes('any'))) score += 3;
    return { b, score };
  });
  scored.sort((a, z) => z.score - a.score);
  return scored[0]?.b;
}
