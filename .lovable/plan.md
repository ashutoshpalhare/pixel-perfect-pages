# Plan: AI Single-Page Website Generator

Build a premium SaaS application that generates professional, responsive, single-page websites (HTML/CSS/Vanilla JS) from natural language descriptions.

## 1. Core Architecture & Design System

### Generator App (React/TanStack Start)
- Define a high-end SaaS design system in `src/styles.css` using OKLCH.
- Style: Minimal, professional, "Linear-like" aesthetics.
- Layout: Desktop-first dashboard with a "Brief" sidebar and a large "Live Preview" area.

### Generated Website Engine
- **Internal Representation**: Define a JSON schema for a website (Design System + Section List).
- **Renderer**: Create a library to transform this JSON into pure HTML5, CSS3, and Vanilla JS.
- **Visuals**: Establish a library of "Section Templates" (Hero, Features, Pricing, etc.) that adapt to a design system.

## 2. Implementation Phases

### Phase 1: Foundation & Application UI
- **Landing Page**: "Describe your website. Get a complete website."
- **Brief Form**: Multi-step or structured form (Type, Name, Description, Personality, Visual Style).
- **Dashboard Shell**: Navigation, project switcher, and generator workspace.

### Phase 2: Generation Engine (The "Brain")
- **Prompt Strategy**: Use AI Gateway to parse user input into a "Website Strategy" JSON.
- **Content Generation**: Generate copy, select appropriate sections, and define a unique Design System (colors, fonts).
- **Code Generation**: A service that assembles the final `index.html`, `style.css`, and `script.js` strings.

### Phase 3: Live Preview & Interaction
- **Iframe Sandbox**: Render the generated code inside a responsive iframe.
- **Device Viewport Controls**: Desktop, Tablet, Mobile toggles.
- **Generation Progress**: Visual multi-step progress indicators (Analyzing -> Planning -> Generating).

### Phase 4: Section Editor & AI Refinement
- **Section Tree**: Sidebar list of generated sections with drag-and-drop reordering.
- **Contextual Actions**: "Regenerate", "Make shorter", "Change layout" buttons per section.
- **Theme Editor**: Global design system overrides (Primary color, Border radius, etc.).

### Phase 5: Export & Final Polish
- **Code Viewer**: Syntax-highlighted viewer for the generated files.
- **Export**: ZIP download containing the standalone project.
- **Persistence**: Save projects to Lovable Cloud database.

## Technical Details
- **AI**: Lovable AI Gateway (Gemini/GPT models) for logic and copy generation.
- **Storage**: Lovable Cloud (PostgreSQL) for project data and version history.
- **Icons**: Lucide-react for the app; Font Awesome/Lucide CDN for generated sites.
- **Animations**: Framer Motion for the generator app; lightweight CSS/Vanilla JS for generated sites.

## 3. SEO & Metadata
- Index route will have unique `head()` metadata: "AI Website Generator — Build Professional Sites in Seconds".
- Open Graph and Twitter tags configured for the app's sharing visibility.
