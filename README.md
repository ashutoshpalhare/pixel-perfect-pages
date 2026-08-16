# Pixel Perfect Pages

# Build: AI Single-Page Website Generator

## PRODUCT VISION

Build a polished, production-quality web application that generates complete, modern, responsive **single-page websites** from a natural-language description.

The user should be able to describe what kind of website they want, for example:

> "Create a premium landing page for an AI-powered fitness coaching startup targeting busy professionals."

The application should then generate a complete single-page website with appropriate sections, copy, visual direction, layout, responsive behavior and interactions.

The final generated website must be exportable as:

* `index.html`
* `style.css`
* `script.js`

The generated website must be able to run independently without requiring React, Next.js, Tailwind, Vite or any other framework.

CDNs are allowed for libraries such as:

* Google Fonts
* Font Awesome / Lucide
* AOS
* Swiper
* GSAP
* Chart.js
* Other lightweight browser-compatible libraries when genuinely useful

Do NOT unnecessarily add dependencies.

---

# 1. CORE PRODUCT PRINCIPLE

This is NOT a generic template generator.

The application should behave like an intelligent **AI web designer + frontend developer**.

The user gives:

* business/product type
* target audience
* desired style
* brand personality
* optional color preferences
* optional sections
* optional CTA
* optional reference website/style

The generator decides:

* appropriate page structure
* section order
* copy
* visual hierarchy
* typography
* color system
* cards/components
* CTA strategy
* appropriate interactions
* responsive behavior

The generated page should feel intentionally designed for the specific business.

Avoid repetitive "AI-generated template" aesthetics.

---

# 2. APPLICATION EXPERIENCE

The application itself should look like a premium modern SaaS product.

Think:

* Linear
* Vercel
* Framer
* Lovable
* Raycast

in terms of polish, spacing, typography and interaction quality.

Do NOT copy their branding or exact layouts.

The application should feel like a real startup product, not a demo.

---

# 3. MAIN APP LAYOUT

Use a desktop-first application shell that also works well on mobile.

Desktop layout:

```text
┌──────────────────────────────────────────────────────────────┐
│ Logo        Projects       Templates       Docs       Avatar │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                  GENERATOR WORKSPACE                         │
│                                                              │
│ ┌─────────────────────┐  ┌────────────────────────────────┐ │
│ │                     │  │                                │ │
│ │   Website Brief     │  │                                │ │
│ │                     │  │       Live Website Preview     │ │
│ │   Inputs            │  │                                │ │
│ │                     │  │                                │ │
│ │                     │  │                                │ │
│ │                     │  │                                │ │
│ └─────────────────────┘  └────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

The exact layout can evolve during implementation if another arrangement creates a substantially better UX.

---

# 4. LANDING / GENERATOR ENTRY

The main screen should immediately communicate:

> "Describe your website. Get a complete website."

Hero copy example:

### Build a website from an idea.

Describe your product, business or service and generate a polished, responsive landing page in seconds.

Primary CTA:

**Start Building**

Secondary CTA:

**View Examples**

Include a large prompt input.

Example placeholder:

> "Create a premium landing page for a cybersecurity SaaS targeting small businesses..."

Below the input show example prompts users can click.

Examples:

* SaaS landing page
* AI startup
* Restaurant
* Agency
* Personal portfolio
* Startup launch
* Mobile app
* E-commerce product
* Course / creator
* Local business

---

# 5. WEBSITE BRIEF FORM

After the user starts, show a structured brief interface.

Fields:

## Website Type

Examples:

* SaaS
* Startup
* Agency
* Portfolio
* Restaurant
* Product
* App
* Service business
* Event
* Course
* Personal brand
* E-commerce landing page

Allow custom input.

---

## Business / Product Name

Example:

"Nova AI"

---

## Short Description

Example:

"AI-powered analytics platform for growing e-commerce brands."

---

## Target Audience

Example:

"Small and medium-sized e-commerce businesses."

---

## Brand Personality

Selectable chips:

* Minimal
* Premium
* Bold
* Playful
* Corporate
* Futuristic
* Elegant
* Friendly
* Technical
* Luxury
* Editorial

Allow multiple selections.

---

## Visual Style

Options:

* Minimal SaaS
* Glassmorphism
* Editorial
* Neo-brutalist
* Luxury
* Dark futuristic
* Clean corporate
* Soft modern
* Creative agency
* Custom

---

## Color Preference

Options:

* Auto
* Light
* Dark
* Custom primary color
* Custom accent color

If Auto is selected, generate an appropriate palette based on the business type and personality.

---

## Primary CTA

Examples:

* Get Started
* Book a Demo
* Start Free
* Contact Us
* Buy Now
* Join Waitlist
* Learn More

---

## Additional Requirements

Large textarea:

> "Anything else the website should include?"

---

# 6. SMART SECTION GENERATION

The page structure should NOT always be identical.

Use the following as a flexible section library:

```text
Navbar
Hero
Trusted By / Logos
Problem
Solution
Features
Benefits
How It Works
Product Demo
Screenshots
Stats
Use Cases
Integrations
Comparison
Testimonials
Case Studies
Pricing
FAQ
Team
About
Process
Gallery
Booking
Contact
CTA
Footer
```

The generator should select sections based on the website type.

For example:

### SaaS

Navbar
→ Hero
→ Trusted By
→ Problem
→ Features
→ Product Demo
→ Integrations
→ How It Works
→ Testimonials
→ Pricing
→ FAQ
→ CTA
→ Footer

### Restaurant

Navbar
→ Hero
→ About
→ Menu
→ Gallery
→ Signature Dishes
→ Testimonials
→ Location
→ Opening Hours
→ Reservation CTA
→ Contact
→ Footer

### Agency

Navbar
→ Hero
→ Clients
→ Services
→ Selected Work
→ Process
→ Testimonials
→ Team
→ CTA
→ Contact
→ Footer

### Personal Portfolio

Navbar
→ Hero
→ About
→ Skills
→ Selected Work
→ Experience
→ Testimonials
→ Contact
→ Footer

The generator must be able to change, remove or reorder sections intelligently.

---

# 7. SECTION EDITOR

After generation, the user should be able to see the generated page as a list/tree of sections.

Example:

```text
PAGE

☰ Navbar
☰ Hero
☰ Trusted By
☰ Features
☰ Product Demo
☰ Testimonials
☰ Pricing
☰ FAQ
☰ CTA
☰ Contact
☰ Footer
```

Users should be able to:

* reorder sections
* hide sections
* delete sections
* duplicate sections
* add a new section
* regenerate a section
* edit section content
* change section style

Drag-and-drop reordering is preferred.

---

# 8. AI SECTION ACTIONS

Every section should have contextual actions:

```text
Regenerate
Rewrite
Make shorter
Make more persuasive
Make more professional
Make more playful
Change layout
Change visual style
Add animation
Remove animation
```

Example:

For Hero:

> Make this headline more premium.

For testimonials:

> Rewrite these testimonials for B2B SaaS founders.

For pricing:

> Make the pricing copy conversion-focused.

---

# 9. LIVE PREVIEW

The generated website must appear in a real browser-like preview.

Preview toolbar:

```text
Desktop   Tablet   Mobile
```

Also include:

* Refresh
* Fullscreen
* Open preview
* Share
* Export

The preview should update after generation and edits.

---

# 10. VISUAL QUALITY BAR

The generated websites must look genuinely premium.

Prioritize:

* strong typography
* excellent spacing
* clear visual hierarchy
* consistent grid
* responsive layouts
* subtle animations
* high-quality imagery
* coherent color system
* strong CTA hierarchy
* realistic copy
* polished buttons
* elegant cards
* proper hover states
* accessible contrast
* mobile responsiveness

Avoid:

* excessive gradients
* random glassmorphism
* giant meaningless headings
* excessive rounded cards
* repetitive card grids
* generic AI copy
* poor spacing
* stock-photo-looking layouts
* unnecessary animations
* visual clutter

The goal is:

**"This looks like a professional designer/developer made it."**

---

# 11. GENERATED WEBSITE TECHNOLOGY

IMPORTANT:

The generated website output must be:

```text
index.html
style.css
script.js
```

It must work as a standalone website.

Do NOT require:

* React
* Next.js
* Vue
* Angular
* Tailwind
* Vite
* npm
* Node.js

for the final exported website.

CDN usage is allowed.

Example:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

Use semantic HTML5.

Use clean, readable CSS.

Use modern vanilla JavaScript.

---

# 12. GENERATED CODE QUALITY

The export should contain:

## index.html

* semantic HTML
* accessible labels
* meaningful headings
* alt text
* SEO metadata
* Open Graph metadata
* favicon support
* proper viewport configuration

## style.css

* CSS variables
* organized sections
* responsive breakpoints
* reusable utility classes where useful
* no unnecessary duplication

## script.js

* navigation
* mobile menu
* smooth scrolling
* FAQ accordion
* modal interactions
* sliders if required
* animations if required
* form interactions
* other page-specific behavior

Do not generate unnecessary JavaScript.

---

# 13. AI GENERATION ARCHITECTURE

Keep the AI layer modular.

Create a clear generation pipeline:

```text
User Brief
    ↓
Requirement Parser
    ↓
Website Strategy
    ↓
Section Planner
    ↓
Design System Generator
    ↓
Content Generator
    ↓
HTML Generator
    ↓
CSS Generator
    ↓
JS Generator
    ↓
Validation
    ↓
Preview
```

The AI should generate structured data first rather than directly producing an uncontrolled HTML blob.

Prefer an internal representation similar to:

```json
{
  "site": {
    "name": "Nova AI",
    "type": "saas",
    "theme": "dark",
    "primaryColor": "#..."
  },
  "sections": [
    {
      "type": "hero",
      "variant": "split",
      "content": {}
    }
  ]
}
```

Then render that structured representation into HTML/CSS/JS.

This architecture should make section editing and regeneration much easier.

---

# 14. DESIGN SYSTEM

Each generated website should automatically establish:

* primary color
* secondary color
* accent color
* background
* surface
* text
* muted text
* border
* typography
* spacing scale
* radius
* shadows
* container width

Use CSS variables.

Example:

```css
:root {
  --primary: ...;
  --accent: ...;
  --background: ...;
  --surface: ...;
  --text: ...;
  --muted: ...;
  --border: ...;
  --radius: ...;
}
```

The entire website should visually follow one coherent design system.

---

# 15. IMAGE HANDLING

Use remote image URLs only when necessary.

Images should match the business context.

For example:

Restaurant:

* food
* restaurant interior
* chef

SaaS:

* product UI
* abstract visual
* dashboard

Agency:

* project imagery
* creative work

Portfolio:

* project screenshots
* profile imagery

Do not repeatedly use the same generic image.

Where possible, make image sources configurable in the generated site.

---

# 16. RESPONSIVENESS

Every generated website must support:

* Desktop
* Tablet
* Mobile

Do not simply shrink desktop layouts.

Adapt:

* navigation
* typography
* grids
* cards
* hero layout
* spacing
* buttons
* images
* tables
* pricing cards

Test mobile layouts carefully.

---

# 17. ACCESSIBILITY

Generated websites should follow reasonable accessibility practices:

* semantic HTML
* keyboard navigation
* visible focus states
* sufficient contrast
* alt text
* accessible buttons
* accessible forms
* ARIA only when actually needed

---

# 18. SEO

Generate:

* title
* meta description
* canonical URL placeholder
* Open Graph tags
* Twitter card tags
* semantic heading hierarchy

Also include relevant structured data where appropriate.

For example:

* Organization
* LocalBusiness
* Product
* FAQPage

Only generate structured data when relevant.

---

# 19. PERFORMANCE

Generated websites should be lightweight.

Prefer:

* CSS animations over heavy JS when possible
* lazy-loaded images
* minimal libraries
* optimized DOM
* no unnecessary dependencies

Avoid huge JS bundles.

---

# 20. EXPORT EXPERIENCE

Add a prominent:

**Export Website**

button.

Export modal:

```text
Your website is ready.

[ Download ZIP ]

Files:

✓ index.html
✓ style.css
✓ script.js
✓ README.md
```

Optional:

**Copy HTML**

**Copy CSS**

**Copy JS**

Also allow:

**Download Preview**

---

# 21. CODE VIEWER

Add a code panel where users can inspect:

```text
HTML
CSS
JavaScript
```

Use syntax highlighting.

Allow:

* copy
* download
* search
* fullscreen

The generated code should be readable and professionally formatted.

---

# 22. VERSION HISTORY

Add lightweight version history.

Example:

```text
Version 1
Initial generation

Version 2
Changed hero

Version 3
Added pricing

Version 4
Updated brand colors
```

Allow users to restore previous versions.

---

# 23. TEMPLATE SYSTEM

Include starter templates for:

* SaaS
* AI startup
* Agency
* Portfolio
* Restaurant
* Product launch
* App
* Creator
* Local business

Templates should only provide a starting structure.

The generator should customize them heavily based on the user's brief.

---

# 24. PROJECT MANAGEMENT

Users should be able to:

* create project
* rename project
* duplicate project
* delete project
* view previous projects

Dashboard example:

```text
My Websites

┌──────────────┐
│ Nova AI      │
│ SaaS         │
│ Updated 2m   │
└──────────────┘

┌──────────────┐
│ Studio X     │
│ Agency       │
│ Updated 1h   │
└──────────────┘
```

---

# 25. DEMO MODE

Because this product needs to be demonstrable without requiring a fully configured AI backend, create a polished demo mode.

Demo mode should allow:

1. User selects a sample prompt.
2. Generation animation begins.
3. The system simulates:

   * analyzing brief
   * selecting sections
   * creating design system
   * generating content
   * generating code
4. A realistic website appears.

Clearly distinguish simulated/demo behavior from real AI functionality.

Do not falsely claim that a real AI request occurred when demo mode is being used.

---

# 26. ERROR STATES

Design proper states for:

* generation failure
* API failure
* invalid prompt
* timeout
* empty project
* export failure
* preview failure

Never leave the user staring at a blank screen.

Provide:

**Retry**

and useful error explanations.

---

# 27. MICRO-INTERACTIONS

Use tasteful animations:

* page transitions
* button hover
* section reveal
* skeleton loading
* generation progress
* drag/drop feedback
* toast notifications
* modal transitions

Animations should support UX.

Do not over-animate.

---

# 28. RESPONSIBLE AI UX

The UI should make AI activity understandable.

During generation show:

```text
✓ Understanding your brief
✓ Planning page structure
✓ Creating design system
✓ Writing content
● Generating website code
○ Validating output
```

This makes the experience feel intentional rather than like a random loading spinner.

---

# 29. TECHNICAL IMPLEMENTATION

Use a modern frontend stack for the GENERATOR APPLICATION itself if useful.

React / Vite / TypeScript are acceptable for the application.

However:

### IMPORTANT DISTINCTION

The generator application may use a modern framework.

The WEBSITE IT GENERATES must export to:

```text
HTML + CSS + Vanilla JS
```

Keep these two layers separate.

---

# 30. CODE ARCHITECTURE

Keep the application modular.

Suggested structure:

```text
src/
  components/
    editor/
    preview/
    generator/
    sections/
    code/
    dashboard/

  lib/
    ai/
    generator/
    templates/
    validation/
    export/

  types/
    website.ts
    section.ts
    design-system.ts
```

Do not create one enormous component.

---

# 31. SAMPLE GENERATION FLOW

Example user prompt:

> "Create a futuristic landing page for an AI cybersecurity platform called SentinelX targeting SaaS startups."

System should infer:

Type:
SaaS / Cybersecurity

Audience:
Startup teams

Personality:
Technical + futuristic + trustworthy

Possible structure:

```text
Navbar
Hero
Trusted By
Problem
Solution
Features
Security Dashboard Demo
How It Works
Integrations
Testimonials
Pricing
FAQ
CTA
Contact
Footer
```

Design direction:

* dark background
* subtle accent color
* technical typography
* dashboard visuals
* restrained glow
* strong contrast

The output should feel like a cybersecurity product, not a generic SaaS template.

---

# 32. IMPORTANT PRODUCT RULE

The generator should prioritize **contextual relevance over maximum number of sections**.

A 7-section page that makes sense is better than a 15-section page full of filler.

Do not generate sections just to make the page longer.

Every section must have a purpose.

---

# 33. ANTI-GENERIC DESIGN RULES

Avoid repeatedly generating:

* purple gradients
* glowing blobs
* glass cards
* meaningless statistics
* "Revolutionize your workflow"
* "Unlock the power of..."
* "Transform your business today"
* generic fake testimonials
* fake logos that imply real customers
* meaningless feature lists

Copy should be specific to the business.

If testimonials are generated for demo purposes, clearly label them as sample/demo content or allow users to replace them.

Do not fabricate real customer claims.

---

# 34. FINAL QUALITY CHECK

Before presenting the generated website, run a validation stage.

Check:

### Structure

* valid sections
* navigation links work
* no broken references

### Code

* HTML is valid
* CSS is valid
* JS has no obvious runtime errors

### Responsive

* mobile layout
* tablet layout
* desktop layout

### Accessibility

* headings
* labels
* alt text
* keyboard usability

### UX

* CTA works
* navigation works
* FAQ works
* forms behave correctly

### Visual

* spacing
* typography
* consistency
* contrast
* section rhythm

If validation fails, attempt an automatic correction before showing the final result.

---

# 35. DEVELOPMENT PRIORITY

Build in this order:

## Phase 1 — Core UX

* landing screen
* website brief
* generator flow
* preview
* section list

## Phase 2 — Website Generation

* section system
* design system
* content generation
* HTML/CSS/JS generation

## Phase 3 — Editing

* section reorder
* section regeneration
* content editing
* theme editing

## Phase 4 — Export

* code viewer
* ZIP export
* individual file download

## Phase 5 — Polish

* animations
* responsive behavior
* empty states
* loading states
* error states
* version history
* project dashboard

---

# 36. DESIGN DIRECTION FOR THE GENERATOR APP

The generator application should itself be a portfolio-worthy product.

Visual direction:

* premium SaaS
* minimal
* sophisticated
* high information density without clutter
* subtle borders
* strong typography
* restrained color palette
* excellent spacing
* polished hover states
* responsive

Prefer a neutral base with one strong accent color.

Do not make the generator itself look like a generic "AI purple gradient" website.

---

# 37. FINAL GOAL

When someone opens this product, the experience should communicate:

> **This is a serious AI-powered frontend product, not a toy.**

When they generate a website:

> **The output should look professionally designed.**

When they inspect the code:

> **The code should be clean, understandable and framework-independent.**

When they use the editor:

> **The workflow should feel fast and intuitive.**

When they see the architecture:

> **It should be obvious that this was designed as a real software product.**

Build the product with these priorities:

**1. UX**
**2. Visual quality**
**3. Generation quality**
**4. Editing experience**
**5. Export quality**
**6. Engineering quality**
**7. Performance**

Do not sacrifice usability just to add more features.

The final result should be something that can genuinely be shown in a developer portfolio and in a technical interview.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7f7baef5-f599-45f4-ba7a-0d359fcdf43a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
