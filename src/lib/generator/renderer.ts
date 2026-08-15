import { WebsiteConfig } from '../../types/website';

export function renderWebsite(config: WebsiteConfig): string {
  const { designSystem, sections } = config;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.name}</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div id="app">
        ${sections.map(s => renderSection(s)).join('\n')}
    </div>
    <script src="script.js"></script>
</body>
</html>
  `;

  const css = `
:root {
  --primary: ${designSystem.primaryColor};
  --radius: ${designSystem.borderRadius};
  --background: ${designSystem.theme === 'dark' ? '#0a0a0a' : '#ffffff'};
  --text: ${designSystem.theme === 'dark' ? '#f5f5f5' : '#1a1a1a'};
}
body { font-family: 'Inter', sans-serif; background: var(--background); color: var(--text); margin: 0; }
section { padding: 80px 20px; text-align: center; }
  `;

  return html;
}

function renderSection(section: any): string {
  switch (section.type) {
    case 'hero':
      return `<section><h1>${section.content.title}</h1><p>${section.content.subtitle}</p></section>`;
    default:
      return `<section><h2>${section.type}</h2></section>`;
  }
}
