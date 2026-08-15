import { WebsiteConfig, Section } from '../../types/website';
import { getBlock } from './blocks/registry';

export function generateHTML(config: WebsiteConfig): string {
  const { designSystem, sections } = config;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.name}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${designSystem.fontFamily.replace(/\s+/g, '+')}:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: 'var(--primary)',
              accent: 'var(--accent)',
              background: 'var(--background)',
              foreground: 'var(--foreground)',
              card: 'var(--card)',
              border: 'var(--border)',
              muted: 'var(--muted)',
              'muted-foreground': 'var(--muted-foreground)',
            },
            borderRadius: {
              lg: 'var(--radius)',
              md: 'calc(var(--radius) - 2px)',
              sm: 'calc(var(--radius) - 4px)',
            }
          }
        }
      }
    </script>
    <link rel="stylesheet" href="style.css">
</head>
<body class="${designSystem.theme}">
    <div id="app">
      ${sections.map(s => renderSectionHTML(s, config)).join('\n')}
    </div>
    <script src="script.js"></script>
</body>
</html>`;
}

export function generateCSS(config: WebsiteConfig): string {
  const { designSystem } = config;
  const isDark = designSystem.theme === 'dark';

  return `
:root {
  --primary: ${designSystem.primaryColor};
  --accent: ${designSystem.accentColor};
  --background: ${designSystem.backgroundColor};
  --foreground: ${designSystem.textColor};
  --card: ${designSystem.surfaceColor};
  --border: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
  --muted: ${isDark ? '#1e293b' : '#f1f5f9'};
  --muted-foreground: ${isDark ? '#94a3b8' : '#64748b'};
  --radius: ${designSystem.borderRadius};
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: '${designSystem.fontFamily}', sans-serif;
  background-color: var(--background);
  color: var(--foreground);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* Custom scrollbar for better look */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--background);
}
::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--muted-foreground);
}
`;
}

export function generateJS(config: WebsiteConfig): string {
  return `
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  console.log('Website initialized: ${config.name}');
  
  // Basic smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
`;
}

function renderSectionHTML(section: Section, config: WebsiteConfig): string {
  if (section.blockId) {
    const block = getBlock(section.blockId);
    if (block) {
      let html = block.html;
      
      // Inject content
      Object.entries(section.content).forEach(([key, value]) => {
        const placeholder = `{{${key.toUpperCase()}}}`;
        if (typeof value === 'string') {
          html = html.replaceAll(placeholder, value);
        }
      });
      
      // Handle special NAME and HANDLE for footer
      html = html.replaceAll('{{NAME}}', config.name);
      html = html.replaceAll('{{HANDLE}}', config.name.toLowerCase().replace(/\s+/g, ''));

      // Handle list items (features, pricing, etc.)
      const items = section.content['items'];
      if (items && Array.isArray(items)) {
        const itemsHtml = items.map((item: any, idx: number) => {
          if (section.type === 'features') {
            if (section.blockId === 'features-02') {
              const isEven = idx % 2 === 0;
              return `
                <div class="flex relative ${idx !== items.length - 1 ? 'pb-20' : ''} sm:items-center md:w-2/3 mx-auto">
                  <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
                    <div class="h-full w-1 bg-muted pointer-events-none"></div>
                  </div>
                  <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-primary text-white relative z-10 title-font font-medium text-sm">${idx + 1}</div>
                  <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                    <div class="flex-shrink-0 w-24 h-24 bg-muted text-primary rounded-full inline-flex items-center justify-center">
                      <i data-lucide="${item.icon || 'star'}"></i>
                    </div>
                    <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
                      <h2 class="font-bold title-font text-foreground mb-1 text-xl">${item.title}</h2>
                      <p class="leading-relaxed text-muted-foreground">${item.description}</p>
                    </div>
                  </div>
                </div>`;
            }
            return `
              <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
                <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-muted text-primary mb-5 flex-shrink-0">
                  <i data-lucide="${item.icon || 'star'}"></i>
                </div>
                <div class="flex-grow">
                  <h2 class="text-foreground text-lg title-font font-bold mb-3">${item.title}</h2>
                  <p class="leading-relaxed text-base text-muted-foreground">${item.description}</p>
                </div>
              </div>`;
          }
          if (section.type === 'testimonials') {
            return `
              <div class="lg:w-1/3 lg:mb-0 mb-6 p-4">
                <div class="h-full text-center">
                  <img alt="testimonial" class="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-muted bg-muted" src="${item.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'}">
                  <p class="leading-relaxed text-muted-foreground italic">"${item.quote}"</p>
                  <span class="inline-block h-1 w-10 rounded bg-primary mt-6 mb-4"></span>
                  <h2 class="text-foreground font-bold title-font tracking-wider text-sm uppercase">${item.name}</h2>
                  <p class="text-muted-foreground">${item.role}</p>
                </div>
              </div>`;
          }
          if (section.type === 'pricing') {
             const isPremium = item.premium;
             return `
              <div class="p-4 xl:w-1/4 md:w-1/2 w-full">
                <div class="h-full p-6 rounded-lg border-2 ${isPremium ? 'border-primary' : 'border-border'} flex flex-col relative overflow-hidden">
                  ${isPremium ? '<span class="bg-primary text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>' : ''}
                  <h2 class="text-sm tracking-widest title-font mb-1 font-medium text-muted-foreground">${item.name}</h2>
                  <h1 class="text-5xl text-foreground pb-4 mb-4 border-b border-border leading-none">${item.price}</h1>
                  ${(item.features || []).map((f: string) => `
                    <p class="flex items-center text-muted-foreground mb-2">
                      <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-muted text-primary rounded-full flex-shrink-0">
                        <i data-lucide="check" class="w-3 h-3"></i>
                      </span>${f}
                    </p>
                  `).join('')}
                  <button class="flex items-center mt-auto text-white bg-primary border-0 py-2 px-4 w-full focus:outline-none hover:opacity-90 rounded">Button
                    <i data-lucide="arrow-right" class="w-4 h-4 ml-auto"></i>
                  </button>
                </div>
              </div>`;
          }
          return '';
        }).join('');
        html = html.replace('{{ITEMS}}', itemsHtml);
      }

      return html;
    }
  }

  // Fallback to basic rendering if no blockId
  switch (section.type) {
    case 'hero':
      return `
<section class="py-24 px-6 text-center bg-background">
  <h1 class="text-5xl font-extrabold mb-6 text-foreground">${section.content['title']}</h1>
  <p class="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">${section.content['subtitle']}</p>
  <a href="#" class="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">${section.content['cta']}</a>
</section>`;
    default:
      return `<section class="py-20 px-6 text-center border-t border-border">
        <h2 class="text-3xl font-bold mb-4 text-foreground capitalize">${section.type}</h2>
        <p class="text-muted-foreground">Section content for ${section.type} goes here.</p>
      </section>`;
  }
}
