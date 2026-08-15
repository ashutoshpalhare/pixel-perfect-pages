import { BlockTemplate } from '../../../types/website';

export const BLOCK_REGISTRY: BlockTemplate[] = [
  // --- HERO SECTIONS ---
  {
    id: 'hero-01',
    category: 'hero',
    source: 'tailblocks',
    layout: 'split',
    styles: ['modern', 'saas'],
    themes: ['light', 'dark'],
    bestFor: ['saas', 'startup'],
    html: `
<section class="text-foreground body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-bold text-foreground">
        {{TITLE}}
      </h1>
      <p class="mb-8 leading-relaxed text-muted-foreground">{{SUBTITLE}}</p>
      <div class="flex justify-center">
        <button class="inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:opacity-90 rounded text-lg">{{CTA}}</button>
        <button class="ml-4 inline-flex text-foreground bg-muted border-0 py-2 px-6 focus:outline-none hover:bg-muted/80 rounded text-lg">{{SECONDARY_CTA}}</button>
      </div>
    </div>
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img class="object-cover object-center rounded-lg shadow-xl" alt="hero" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=720&q=80">
    </div>
  </div>
</section>`
  },
  {
    id: 'hero-02',
    category: 'hero',
    source: 'tailblocks',
    layout: 'centered',
    styles: ['minimal', 'bold'],
    themes: ['light', 'dark'],
    bestFor: ['product', 'app'],
    html: `
<section class="text-foreground body-font">
  <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
    <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded-lg shadow-2xl" alt="hero" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=720&q=80">
    <div class="text-center lg:w-2/3 w-full">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-bold text-foreground">{{TITLE}}</h1>
      <p class="mb-8 leading-relaxed text-muted-foreground">{{SUBTITLE}}</p>
      <div class="flex justify-center">
        <button class="inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:opacity-90 rounded text-lg">{{CTA}}</button>
      </div>
    </div>
  </div>
</section>`
  },
  
  // --- FEATURES ---
  {
    id: 'features-01',
    category: 'features',
    source: 'tailblocks',
    layout: 'grid-3',
    styles: ['modern'],
    themes: ['light', 'dark'],
    bestFor: ['saas', 'services'],
    html: `
<section class="text-foreground body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="text-center mb-20">
      <h2 class="sm:text-3xl text-2xl font-bold title-font text-foreground mb-4">{{TITLE}}</h2>
      <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-muted-foreground">{{SUBTITLE}}</p>
      <div class="flex mt-6 justify-center">
        <div class="w-16 h-1 rounded-full bg-primary inline-flex"></div>
      </div>
    </div>
    <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
      {{ITEMS}}
    </div>
    <button class="flex mx-auto mt-16 text-white bg-primary border-0 py-2 px-8 focus:outline-none hover:opacity-90 rounded text-lg">{{CTA}}</button>
  </div>
</section>`,
    // Custom logic will be needed to render ITEMS
  },
  
  // --- PRICING ---
  {
    id: 'pricing-01',
    category: 'pricing',
    source: 'tailblocks',
    layout: 'grid-3',
    styles: ['modern'],
    themes: ['light', 'dark'],
    bestFor: ['saas', 'startup'],
    html: `
<section class="text-foreground body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
      <h2 class="sm:text-4xl text-3xl font-bold title-font mb-2 text-foreground">{{TITLE}}</h2>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-muted-foreground">{{SUBTITLE}}</p>
    </div>
    <div class="flex flex-wrap -m-4">
      {{ITEMS}}
    </div>
  </div>
</section>`
  },

  // --- FOOTER ---
  {
    id: 'footer-01',
    category: 'footer',
    source: 'tailblocks',
    layout: 'minimal',
    styles: ['modern'],
    themes: ['light', 'dark'],
    bestFor: ['any'],
    html: `
<footer class="text-foreground body-font border-t border-border">
  <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    <a class="flex title-font font-medium items-center md:justify-start justify-center text-foreground">
      <div class="w-10 h-10 text-white p-2 bg-primary rounded-full flex items-center justify-center font-bold">W</div>
      <span class="ml-3 text-xl">{{NAME}}</span>
    </a>
    <p class="text-sm text-muted-foreground sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-border sm:py-2 sm:mt-0 mt-4">© 2026 {{NAME}} —
      <a href="#" class="text-muted-foreground ml-1" rel="noopener noreferrer" target="_blank">@{{HANDLE}}</a>
    </p>
    <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      <a class="text-muted-foreground hover:text-primary"><i data-lucide="facebook"></i></a>
      <a class="ml-3 text-muted-foreground hover:text-primary"><i data-lucide="twitter"></i></a>
      <a class="ml-3 text-muted-foreground hover:text-primary"><i data-lucide="instagram"></i></a>
      <a class="ml-3 text-muted-foreground hover:text-primary"><i data-lucide="linkedin"></i></a>
    </span>
  </div>
</footer>`
  }
];

export function getBlock(id: string): BlockTemplate | undefined {
  return BLOCK_REGISTRY.find(b => b.id === id);
}

export function getBlocksByCategory(category: string): BlockTemplate[] {
  return BLOCK_REGISTRY.filter(b => b.category === category);
}
