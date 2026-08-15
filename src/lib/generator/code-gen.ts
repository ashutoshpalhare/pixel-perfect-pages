import { WebsiteConfig, Section } from '../../types/website';

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
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body class="${designSystem.theme}">
    ${sections.map(s => renderSectionHTML(s)).join('\n')}
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
  --primary-foreground: ${isDark ? '#ffffff' : '#ffffff'};
  --background: ${isDark ? '#0f172a' : '#ffffff'};
  --foreground: ${isDark ? '#f8fafc' : '#0f172a'};
  --card: ${isDark ? '#1e293b' : '#f8fafc'};
  --border: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
  --radius: ${designSystem.borderRadius};
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--background);
  color: var(--foreground);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

section {
  padding: 100px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 160px 24px;
}

.hero h1 {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: 24px;
  line-height: 1.1;
}

.hero p {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto 40px;
}

.btn-primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
  padding: 16px 32px;
  border-radius: var(--radius);
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: opacity 0.2s;
}

.btn-primary:hover { opacity: 0.9; }

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.feature-card {
  padding: 32px;
  border-radius: var(--radius);
  background: var(--card);
  border: 1px solid var(--border);
}
`;
}

export function generateJS(config: WebsiteConfig): string {
  return `
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  console.log('Website initialized: ${config.name}');
});
`;
}

function renderSectionHTML(section: Section): string {
  switch (section.type) {
    case 'hero':
      return `
<section class="hero">
  <h1>${section.content.title}</h1>
  <p>${section.content.subtitle}</p>
  <a href="#" class="btn-primary">${section.content.cta}</a>
</section>`;
    case 'features':
      return `
<section class="features">
  ${(section.content.items || []).map((item: any) => `
    <div class="feature-card">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>
  `).join('')}
</section>`;
    default:
      return `<section><h2>${section.type}</h2></section>`;
  }
}
