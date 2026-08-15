import { WebsiteConfig, Section, DesignSystem } from '../../types/website';
import { getBlock } from './blocks/registry';

const escapeHtml = (value: unknown): string =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const SPACING: Record<DesignSystem['spacing'], string> = {
  compact: '3.5rem',
  balanced: '5.5rem',
  airy: '7.5rem',
};

/* --------------------------------------------------------------- HTML */

export function generateHTML(config: WebsiteConfig): string {
  const { designSystem, sections } = config;
  const title = `${config.name} — ${config.description}`.slice(0, 60);
  const description = config.description.slice(0, 155);

  return `<!DOCTYPE html>
<html lang="en" class="${designSystem.theme}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${designSystem.fontFamily.replace(/\s+/g, '+')}:wght@400;500;600;700&family=${designSystem.headingFont.replace(/\s+/g, '+')}:wght@600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <a class="ds-skip" href="#main">Skip to content</a>
  ${sections.filter((s) => s.type === 'navbar').map((s) => renderSectionHTML(s, config)).join('\n')}
  <main id="main">
${sections.filter((s) => s.type !== 'navbar' && s.type !== 'footer').map((s) => renderSectionHTML(s, config)).join('\n')}
  </main>
  ${sections.filter((s) => s.type === 'footer').map((s) => renderSectionHTML(s, config)).join('\n')}
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="script.js"></script>
</body>
</html>`;
}

/* ---------------------------------------------------------------- CSS */

export function generateCSS(config: WebsiteConfig): string {
  const d = config.designSystem;
  const isDark = d.theme === 'dark';
  const gap = SPACING[d.spacing] ?? SPACING.balanced;

  const shadow =
    d.shadow === 'none'
      ? 'none'
      : d.shadow === 'soft'
        ? '0 1px 2px rgba(0,0,0,0.06), 0 8px 24px -16px rgba(0,0,0,0.25)'
        : '0 10px 40px -12px rgba(0,0,0,0.35)';

  const cardBorder =
    d.cardStyle === 'flat' ? 'none' : `1px solid var(--border)`;

  const btnRadius = d.buttonStyle === 'pill' ? '999px' : 'var(--radius)';
  const btnBg = d.buttonStyle === 'outline' ? 'transparent' : 'var(--primary)';
  const btnColor = d.buttonStyle === 'outline' ? 'var(--primary)' : 'var(--primary-foreground)';
  const btnBorder = d.buttonStyle === 'outline' ? '1px solid var(--primary)' : '1px solid transparent';

  return `/* Design system — generated. Every block reads from these tokens. */
:root {
  --primary: ${d.primaryColor};
  --primary-foreground: ${isDark ? '#0b1020' : '#ffffff'};
  --accent: ${d.accentColor};
  --background: ${d.backgroundColor};
  --foreground: ${d.textColor};
  --card: ${d.surfaceColor};
  --border: ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(15,23,42,0.10)'};
  --muted: ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.04)'};
  --muted-foreground: ${isDark ? '#9aa7bd' : '#5b6577'};
  --radius: ${d.borderRadius};
  --container: ${d.containerWidth};
  --section-gap: ${gap};
  --shadow: ${shadow};
}

*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: '${d.fontFamily}', system-ui, sans-serif;
  background: var(--background);
  color: var(--foreground);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

h1, h2, h3 { font-family: '${d.headingFont}', '${d.fontFamily}', sans-serif; line-height: 1.15; }
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
:focus-visible { outline: 2px solid var(--primary); outline-offset: 3px; border-radius: 4px; }

.ds-skip {
  position: absolute; left: -9999px; top: 0; z-index: 50;
  background: var(--card); color: var(--foreground); padding: .75rem 1rem;
}
.ds-skip:focus { left: 1rem; top: 1rem; }

/* Layout */
.ds-container { width: 100%; max-width: var(--container); margin: 0 auto; padding: 0 1.25rem; }
.ds-section { padding: var(--section-gap) 0; }
.ds-section-tight { padding: calc(var(--section-gap) / 2) 0; }

/* Navigation */
.ds-nav {
  position: sticky; top: 0; z-index: 40;
  backdrop-filter: blur(12px);
  background: color-mix(in oklab, var(--background) 82%, transparent);
  border-bottom: 1px solid var(--border);
}
.ds-nav-toggle { padding: .5rem; border-radius: var(--radius); border: 1px solid var(--border); background: transparent; color: inherit; cursor: pointer; }
.ds-logo {
  display: inline-flex; align-items: center; justify-content: center;
  width: 2rem; height: 2rem; border-radius: calc(var(--radius) * .8);
  background: var(--primary); color: var(--primary-foreground); font-weight: 700; font-size: .9rem;
}

/* Typography */
.ds-eyebrow {
  font-size: .75rem; letter-spacing: .12em; text-transform: uppercase;
  font-weight: 600; color: var(--primary); margin-bottom: .75rem;
}
.ds-title { font-weight: 700; letter-spacing: -0.02em; }
.ds-subtitle { margin: 1rem auto 0; max-width: 42rem; color: var(--muted-foreground); font-size: 1.05rem; }

/* Buttons */
.ds-btn, .ds-btn-secondary {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .75rem 1.4rem; font-weight: 600; font-size: .95rem;
  border-radius: ${btnRadius}; cursor: pointer; transition: transform .15s ease, opacity .15s ease, background .15s ease;
}
.ds-btn { background: ${btnBg}; color: ${btnColor}; border: ${btnBorder}; box-shadow: var(--shadow); }
.ds-btn:hover { opacity: .9; transform: translateY(-1px); }
.ds-btn-secondary { background: var(--muted); color: var(--foreground); border: 1px solid var(--border); }
.ds-btn-secondary:hover { background: color-mix(in oklab, var(--muted) 60%, var(--border)); }

/* Surfaces */
.ds-card {
  background: var(--card); border: ${cardBorder}; border-radius: var(--radius);
  box-shadow: ${d.cardStyle === 'elevated' ? 'var(--shadow)' : 'none'};
}
.ds-media { border-radius: var(--radius); box-shadow: var(--shadow); object-fit: cover; }
.ds-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 2.75rem; height: 2.75rem; border-radius: calc(var(--radius) * .85);
  background: color-mix(in oklab, var(--primary) 14%, transparent); color: var(--primary);
}
.ds-icon svg { width: 1.25rem; height: 1.25rem; }
.ds-step {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 2.25rem; height: 2.25rem; padding: 0 .5rem; font-weight: 700;
  border-radius: 999px; background: var(--primary); color: var(--primary-foreground);
}
.ds-highlight { border: 1px solid var(--primary); box-shadow: 0 0 0 4px color-mix(in oklab, var(--primary) 12%, transparent); }
.ds-cta { background: color-mix(in oklab, var(--primary) 10%, var(--card)); }
.ds-glow {
  position: absolute; inset-inline: 0; top: -30%; height: 70%;
  background: radial-gradient(ellipse at center, color-mix(in oklab, var(--primary) 28%, transparent), transparent 70%);
  filter: blur(30px); pointer-events: none;
}
.ds-input {
  width: 100%; padding: .7rem .9rem; border-radius: var(--radius);
  border: 1px solid var(--border); background: var(--background); color: var(--foreground); font: inherit;
}
.ds-feature-item { display: flex; gap: .5rem; align-items: flex-start; }

/* Reveal on scroll */
.ds-reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
.ds-reveal.is-visible { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .ds-reveal { opacity: 1; transform: none; transition: none; }
}

@media (max-width: 640px) {
  :root { --section-gap: calc(${gap} * 0.6); }
  .ds-title { letter-spacing: -0.01em; }
  .ds-subtitle { font-size: 1rem; }
}
`;
}

/* ----------------------------------------------------------------- JS */

export function generateJS(config: WebsiteConfig): string {
  return `/* ${config.name} — standalone behaviour. No framework required. */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    // Mobile navigation
    var toggle = document.querySelector('[data-nav-toggle]');
    var panel = document.querySelector('[data-nav-panel]');
    if (toggle && panel) {
      toggle.addEventListener('click', function () {
        var open = panel.classList.toggle('hidden') === false;
        toggle.setAttribute('aria-expanded', String(open));
      });
      panel.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
          panel.classList.add('hidden');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Reveal on scroll
    var revealables = document.querySelectorAll('section > .ds-container, footer > .ds-container');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealables.forEach(function (el) { el.classList.add('ds-reveal'); io.observe(el); });
    }

    // Contact form (client-side validation only — wire to your own backend)
    var form = document.querySelector('[data-contact-form]');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var status = form.querySelector('[data-form-status]');
        var valid = form.checkValidity();
        if (status) {
          status.classList.remove('hidden');
          status.textContent = valid
            ? 'Thanks — your message is ready to send. Connect this form to your email service.'
            : 'Please complete all fields with a valid email address.';
        }
        if (valid) form.reset();
      });
    }
  });
})();
`;
}

/* ----------------------------------------------------------- RENDERING */

function fillPlaceholders(template: string, data: Record<string, any>): string {
  let out = template;
  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (typeof value === 'object') return;
    out = out.replaceAll(`{{${key.toUpperCase()}}}`, escapeHtml(value));
  });
  return out;
}

function renderItems(itemHtml: string, items: any[]): string {
  return items
    .map((item, idx) => {
      const data: Record<string, any> = { index: idx + 1, step: item.step ?? String(idx + 1).padStart(2, '0'), ...item };
      let html = fillPlaceholders(itemHtml, data);

      // Nested feature lists (pricing plans, etc.)
      if (Array.isArray(item.features)) {
        const list = item.features
          .map(
            (f: string) =>
              `<li class="ds-feature-item"><i data-lucide="check" style="width:1rem;height:1rem;color:var(--primary);flex-shrink:0;margin-top:.3rem"></i><span>${escapeHtml(f)}</span></li>`,
          )
          .join('');
        html = html.replaceAll('{{FEATURES}}', list);
      }
      html = html.replaceAll('{{HIGHLIGHT_CLASS}}', item.highlight || item.premium ? 'ds-highlight' : '');
      return html.replace(/\{\{[A-Z0-9_]+\}\}/g, '');
    })
    .join('\n');
}

export function renderSectionHTML(section: Section, config: WebsiteConfig): string {
  const block = section.blockId ? getBlock(section.blockId) : undefined;
  if (!block) return '';

  let html = fillPlaceholders(block.html, {
    ...section.content,
    name: section.content['name'] ?? config.name,
    initial: (config.name || 'W').trim().charAt(0).toUpperCase(),
    year: String(new Date().getFullYear()),
    tagline: section.content['tagline'] ?? config.description,
  });

  const items = section.content['items'];
  if (Array.isArray(items) && items.length && block.itemHtml) {
    html = html.replaceAll('{{ITEMS}}', renderItems(block.itemHtml, items));
  } else {
    html = html.replaceAll('{{ITEMS}}', '');
  }

  // Strip any placeholder the content did not provide.
  return html.replace(/\{\{[A-Z0-9_]+\}\}/g, '');
}
