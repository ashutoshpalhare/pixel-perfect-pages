# AI Website Generator

A polished, developer-focused SaaS platform that generates high-performance, responsive single-page websites from natural-language descriptions.

## Project Overview

This application allows users to describe a website idea and receive a structured, professionally designed single-page site in minutes. The generator intelligently selects layout blocks, establishes a consistent design system (colors, typography, spacing), and provides a live preview with full code export capabilities.

## Key Features

- **AI-Powered Generation**: Translates user prompts into site strategies, design systems, and content.
- **Block Registry**: Uses a library of Tailblocks-inspired and custom templates that adapt to the generated design system.
- **Live Responsive Preview**: Real-time visualization of the generated site across Desktop, Tablet, and Mobile viewports.
- **Section Editor**: Reorder, regenerate, duplicate, delete, and refine individual sections.
- **Shiki Code Viewer**: Premium syntax highlighting for the generated HTML, CSS, and JS.
- **ZIP Export**: One-click download of the complete standalone website (index.html, style.css, script.js).
- **Premium UI**: Minimal, graphite-dark aesthetic designed for a professional developer experience.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React 19, TanStack Router, Vite).
- **Styling**: Tailwind CSS v4.
- **Icons**: Lucide React.
- **Code Highlighting**: Shiki.
- **Utilities**: Framer Motion (animations), Zod (validation), JSZip (export).

## Main Architecture

- **`src/routes/`**: Application pages and routing (Landing, Onboarding, Generator Workspace, About).
- **`src/lib/generator/`**: Core logic engine.
    - `engine.ts`: Logic for mapping briefs to design systems and content strategy.
    - `code-gen.ts`: Transforms structured JSON site data into standalone HTML/CSS/JS.
    - `blocks/registry.ts`: The library of available UI templates.
- **`src/types/`**: TypeScript definitions for the `WebsiteConfig`, `DesignSystem`, and `Section` schemas.

## Installation and Local Development

### Prerequisites
- Node.js (v18 or higher)
- Bun or npm

### Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   bun install
   ```
3. Start the development server:
   ```bash
   bun run dev
   ```
4. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Environment Variables

The project uses standard TanStack Start / Vite environment variables. No external API keys are required for the core demo generation as it uses a local rule-based engine.

## Build and Deploy

### Production Build
```bash
bun run build
```

### Preview Build
```bash
bun run preview
```

The application is designed to be deployed on edge runtimes (e.g., Cloudflare Workers) supported by TanStack Start.

## Contribution

This project is a developer tool. Feel free to explore the `src/lib/generator` directory to understand how site strategies are formed or to add new templates to the `registry.ts`.
