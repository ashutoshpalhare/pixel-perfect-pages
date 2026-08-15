# Plan: Upgrade AI Generator with Tailblocks Integration

Upgrade the AI Single-Page Website Generator to use Tailblocks as a primary source for high-quality, responsive section patterns, ensuring deep visual consistency via a shared design system.

## 1. Block Registry & Metadata
- **Internal Registry**: Create `src/lib/generator/blocks/registry.ts` to store Tailblocks-inspired section templates.
- **Metadata**: Each block includes `id`, `category`, `layout`, `bestFor`, and `html` (using Tailwind utility classes).
- **Expansion**: Support Tailblocks, Custom Blocks, and AI-generated blocks.

## 2. Design System & Block Normalization
- **Shared Tokens**: Define CSS variables for primary/accent colors, background, surface, typography, spacing, border radius, and shadows.
- **Normalization**: A function to wrap Tailblocks HTML, injecting design system variables into Tailwind classes (e.g., replacing hardcoded hex codes with `var(--primary)`).
- **Export Consistency**: Ensure the final `style.css` includes these design tokens.

## 3. Intelligent AI Generation
- **Strategy Refinement**: Update `ai.functions.ts` to:
    1. Analyze the user brief.
    2. Determine the optimal section sequence.
    3. Select specific block IDs from the registry based on metadata.
    4. Generate context-aware content (copy, icons, imagery) for each selected block.
- **Section Regeneration**: Implement logic to replace a single section with an alternative variant from the same category while maintaining design consistency.

## 4. UI/UX Enhancements in Generator Workspace
- **Section Controls**: Add floating actions for each section in the preview or sidebar:
    - **Regenerate**: Replace with a new variant.
    - **Move Up/Down**: Reorder sections.
    - **Delete/Duplicate**: Manage section count.
- **Live Refinement**: Allow the user to "Refine" specific sections via a sub-prompt.

## 5. Technical Implementation
- **Tailwind via CDN**: Use Tailwind CDN for the generated preview and export (can be optimized to standalone CSS later).
- **Lucide Icons**: Use Lucide CDN for icons in the generated site.
- **Export Workflow**: Maintain the ZIP export functionality with normalized code.

## Success Criteria
- Generation produces a cohesive, professionally designed website from Tailblocks components.
- Visual style is consistent across all sections (colors, fonts, radii).
- Content is fully customized for the user's business.
- Exported code is clean and standalone.
