# Visual Identity & Public Landing Redesign Plan

Upgrade the AI Website Generator to a premium developer-focused product with a new visual language (Obsidian/Violet) and a comprehensive About page.

## Phase 1: Theme & Design System
- Update `src/styles.css` with the new color palette (OKLCH).
- Replace teal/blue tokens with Violet (primary) and Amber (secondary accent).
- Adjust typography (Space Grotesk + DM Sans) and spacing for an editorial feel.
- Reduce rounded corners and heavy shadows.

## Phase 2: Core Engine & Registry
- Update `src/lib/generator/engine.ts` to reflect the new default design system (no blue/green).
- Refine `src/lib/generator/blocks/registry.ts` to ensure block templates use the new design tokens effectively.

## Phase 3: Public Landing Page
- Redesign `src/routes/index.tsx` for a "Linear-like" hero and navigation.
- Implement a sticky navbar with blur, border, and elegant scroll states.
- Update messaging to "Describe your website. Get a complete website."
- Ensure the GitHub link and "Start Building" CTA are prominent.

## Phase 4: About Page & Navigation
- Create `src/routes/about.tsx` using founder story elements from GitHub (Ashutosh Palhare).
- Connect the navbar and footer to the new page.

## Phase 5: Shiki Code Viewer
- Replace the current basic code viewer in `src/routes/generator.tsx` with a high-end Shiki-powered implementation.
- Support `index.html`, `style.css`, and `script.js` with tabs and syntax highlighting.
- Add copy and download functionality within the code view.

## Phase 6: Global UI Polish
- Audit all generator dashboard components (sidebar, preview controls, section actions).
- Ensure consistent hover states, transitions, and responsive behavior across the entire app.

## Technical Details
- **Colors**: Obsidian (`oklch(0.18 0.02 265)`), Warm White (`oklch(0.96 0.01 70)`), Violet (`oklch(0.6 0.25 295)`).
- **Libraries**: `shiki` for syntax highlighting, `lucide-react` for iconography.
- **Constraints**: No blue or green as primary colors. Standalone vanilla export preserved.
