import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Blocks,
  Check,
  ChevronDown,
  Code2,
  Download,
  LayoutTemplate,
  Menu,
  Monitor,
  MousePointerClick,
  Palette,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WebGen AI — Idea to website in minutes" },
      {
        name: "description",
        content:
          "Describe your product or business and generate a polished, responsive single-page website. Edit sections, preview on any device, export clean HTML, CSS and JavaScript.",
      },
      { property: "og:title", content: "WebGen AI — Idea to website in minutes" },
      {
        property: "og:description",
        content: "Describe what you want. AI plans, designs and generates the website. Then edit, preview and export standalone code.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const NAV = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Examples", href: "#examples" },
  { label: "FAQ", href: "#faq" },
];

const STEPS = [
  { n: "01", title: "Describe", body: "Tell the generator what you want to build, who it is for and how it should feel." },
  { n: "02", title: "Generate", body: "It plans the structure, locks a design system, selects blocks and writes the content." },
  { n: "03", title: "Customize", body: "Edit, regenerate, reorder or restyle any individual section." },
  { n: "04", title: "Export", body: "Download standalone index.html, style.css and script.js." },
];

const FEATURES = [
  { icon: Wand2, title: "AI website generation", body: "Turn a natural-language brief into a complete single-page website." },
  { icon: LayoutTemplate, title: "Intelligent sections", body: "The structure follows the business — a restaurant never gets a pricing table by default." },
  { icon: Blocks, title: "Ready-to-use blocks", body: "A registry of Tailblocks-inspired and custom block variants with searchable metadata." },
  { icon: MousePointerClick, title: "Visual editing", body: "Regenerate, edit, duplicate, reorder and delete sections without touching the rest." },
  { icon: Monitor, title: "Live responsive preview", body: "Desktop, tablet and mobile previews of the real generated output." },
  { icon: Code2, title: "Clean code export", body: "Semantic HTML, token-driven CSS and vanilla JavaScript — no build step." },
  { icon: Sparkles, title: "Section-level refinement", body: "Make one section shorter, more premium or more persuasive on its own." },
  { icon: Palette, title: "One design system", body: "Colour, type, spacing, radius, shadows, buttons and cards stay consistent everywhere." },
];

const TYPES = ["SaaS", "AI startup", "Agency", "Portfolio", "Restaurant", "Product launch", "Mobile app", "Creator", "Local business", "Event", "Personal brand"];

const DIFFERENT = [
  { title: "Not just a template", body: "The section plan is chosen from the brief, not copied from one fixed layout." },
  { title: "Not just a chatbot", body: "The output is a working website you can preview, edit and ship." },
  { title: "Not locked to a framework", body: "Exports are standalone HTML, CSS and vanilla JavaScript." },
  { title: "Not a black box", body: "Read every line in the built-in code viewer before you export." },
  { title: "Built for iteration", body: "Regenerate one section instead of starting the whole page again." },
];

const FAQ = [
  { q: "What does the generator produce?", a: "A single-page website as standalone HTML, CSS and vanilla JavaScript, delivered as a ZIP with index.html, style.css and script.js." },
  { q: "Do I need to know how to code?", a: "No. Everything is editable from the workspace. Developers can still inspect and customise every line of the generated code." },
  { q: "Can I edit individual sections?", a: "Yes — edit copy, change the layout variant, regenerate, duplicate, reorder or delete any section independently." },
  { q: "Can I change the design after generation?", a: "Yes. Colour, theme, radius, spacing, button and card styles are design-system tokens, so a change updates the whole page at once." },
  { q: "Does every website use the same sections?", a: "No. The section plan is derived from the brief, so a restaurant, an agency and a SaaS product each get a different structure." },
  { q: "Can I host the exported website anywhere?", a: "The exported files are static and work on any static host. Note that icons and utility classes load from public CDNs in the current export." },
  { q: "Does it use Tailblocks?", a: "Tailblocks patterns are one of the block sources, alongside our own custom blocks. Every block is re-authored to consume the generated design system, and Tailblocks is MIT licensed and credited in the export README." },
  { q: "Is the generation a real AI request?", a: "Today generation runs a deterministic planner on the server and is labelled as demo generation in the workspace. Nothing pretends a model request happened." },
];

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">W</span>
            <span className="font-display text-lg">WebGen AI</span>
          </a>
          <nav aria-label="Main" className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/start"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get started
            </Link>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
              className="rounded-lg border border-border p-2 md:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-border md:hidden">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-4 text-sm text-muted-foreground">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="hover:text-foreground">
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-[0.35]" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-20 text-center sm:pt-28">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" /> Prompt → AI → Website
            </p>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-6xl">
              From idea to website.{" "}
              <span className="text-gradient">In minutes.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Describe your product, business or idea and generate a polished, responsive single-page website with AI. Then edit,
              preview and export clean HTML, CSS and JavaScript.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/start"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:opacity-90 active:scale-[0.99]"
              >
                Get started <ArrowRight className="size-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-semibold transition-colors hover:bg-muted"
              >
                See how it works
              </a>
            </div>

            <WorkspaceMockup />
          </div>
        </section>

        {/* Built for */}
        <section className="border-y border-border bg-card/40 py-10">
          <div className="mx-auto w-full max-w-6xl px-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Built for</p>
            <div className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-muted-foreground">
              {["Founders", "Developers", "Agencies", "Freelancers", "Designers", "Small businesses"].map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mx-auto w-full max-w-6xl px-5 py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">How it works</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Four steps, one finished website</h2>
            <p className="mt-3 text-muted-foreground">
              The pipeline runs brief → understanding → strategy → section selection → design system → content → HTML, CSS and JS.
            </p>
          </div>
          <ol className="mt-12 grid gap-4 md:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.n} className="surface-panel relative overflow-hidden p-6">
                <span className="font-display text-4xl font-bold text-primary/25">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Features */}
        <section id="features" className="border-y border-border bg-card/40 py-24">
          <div className="mx-auto w-full max-w-6xl px-5">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Features</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What the generator actually does</h2>
              <p className="mt-3 text-muted-foreground">Every capability below is part of the working product, not a roadmap item.</p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f) => (
                <article key={f.title} className="surface-panel p-6 transition-colors hover:border-primary/50">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <f.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive product preview */}
        <PipelinePreview />

        {/* Website types */}
        <section id="examples" className="border-y border-border bg-card/40 py-24">
          <div className="mx-auto w-full max-w-6xl px-5">
            <h2 className="text-3xl font-bold sm:text-4xl">What you can generate</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Each type gets its own section plan, palette and typography pairing.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {TYPES.map((t) => (
                <Link
                  key={t}
                  to="/start"
                  className="surface-panel group px-5 py-4 text-sm font-medium transition-colors hover:border-primary/60"
                >
                  <span className="flex items-center gap-2">
                    {t}
                    <ArrowRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why different */}
        <section className="mx-auto w-full max-w-6xl px-5 py-24">
          <h2 className="text-3xl font-bold sm:text-4xl">Why this is different</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DIFFERENT.map((d) => (
              <article key={d.title} className="surface-panel p-6">
                <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Check className="size-4" />
                </span>
                <h3 className="mt-4 font-semibold">{d.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-y border-border bg-card/40 py-24">
          <div className="mx-auto w-full max-w-3xl px-5">
            <h2 className="text-center text-3xl font-bold sm:text-4xl">Frequently asked</h2>
            <div className="mt-10 space-y-3">
              {FAQ.map((item, i) => (
                <div key={item.q} className="surface-panel overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium"
                  >
                    {item.q}
                    <ChevronDown className={`size-4 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && <p className="px-5 pb-5 text-sm text-muted-foreground">{item.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden py-24">
          <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-3xl px-5 text-center">
            <h2 className="text-3xl font-bold sm:text-5xl">Have an idea? Turn it into a website.</h2>
            <p className="mt-4 text-muted-foreground">
              Open the workspace, describe what you want and export the files. No account, no setup.
            </p>
            <Link
              to="/start"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 font-semibold text-primary-foreground transition-transform hover:opacity-90 active:scale-[0.99]"
            >
              Get started <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 font-semibold">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">W</span>
              WebGen AI
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              An AI single-page website generator. Describe an idea, generate a responsive site, export standalone HTML, CSS and
              JavaScript.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Some block layouts are adapted from Tailblocks (MIT). Attribution is included in every export.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Product</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-foreground">{n.label}</a>
                </li>
              ))}
              <li>
                <Link to="/start" className="hover:text-foreground">Get started</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Legal</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#faq" className="hover:text-foreground">Privacy</a></li>
              <li><a href="#faq" className="hover:text-foreground">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} WebGen AI
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------- hero product mockup */

function WorkspaceMockup() {
  return (
    <div className="surface-panel mx-auto mt-16 max-w-5xl overflow-hidden p-0 text-left shadow-[var(--shadow-elevated)]">
      <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-3">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-destructive/50" />
          <span className="size-2.5 rounded-full bg-accent/60" />
          <span className="size-2.5 rounded-full bg-primary/60" />
        </span>
        <span className="mx-auto rounded bg-muted px-3 py-1 text-[10px] text-muted-foreground">WebGen AI — workspace</span>
      </div>
      <div className="grid gap-0 md:grid-cols-[220px_1fr]">
        <div className="hidden border-r border-border p-4 md:block">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Brief</p>
          <p className="mt-2 rounded-md border border-border bg-background p-2 text-[11px] text-muted-foreground">
            Premium dark landing page for an AI cybersecurity startup called SentinelX.
          </p>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Sections</p>
          <ul className="mt-2 space-y-1.5 text-[11px]">
            {["Navbar", "Hero", "Trusted by", "Features", "How it works", "Pricing", "FAQ", "CTA", "Footer"].map((s) => (
              <li key={s} className="flex items-center gap-2 rounded border border-border bg-background px-2 py-1">
                <span className="size-1.5 rounded-full bg-primary" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-background p-5">
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">SentinelX</p>
            <p className="mt-2 font-display text-xl font-bold sm:text-2xl">Detect threats before they become incidents.</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Autonomous detection and response for security teams that ship quickly.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="rounded-md bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground">Get started</span>
              <span className="rounded-md border border-border px-3 py-1.5 text-[11px]">See how it works</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {["Threat intel", "Auto response", "Deep analysis"].map((c) => (
                <div key={c} className="rounded-md border border-border bg-background p-3">
                  <span className="block size-6 rounded bg-primary/20" />
                  <p className="mt-2 text-[10px] font-medium">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------- interactive pipeline demo */

const PIPELINE = [
  { label: "User prompt", body: "“Create a premium dark landing page for an AI cybersecurity startup called SentinelX.”" },
  { label: "AI planning", body: "Type: AI / SaaS · Tone: confident · Theme: dark · Audience: security teams" },
  { label: "Design system", body: "Primary #22d3ee · Space Grotesk / DM Sans · radius 0.75rem · elevated cards" },
  { label: "Section generation", body: "Navbar → Hero → Trusted by → Features → How it works → Pricing → FAQ → CTA → Footer" },
  { label: "Live website", body: "Rendered in the preview, ready to edit and export as HTML, CSS and JS." },
];

function PipelinePreview() {
  const [active, setActive] = useState(0);

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-24">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Inside the generator</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Watch a brief become a website</h2>
        <p className="mt-3 text-muted-foreground">Step through the real pipeline the workspace runs.</p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <ol className="space-y-2">
          {PIPELINE.map((p, i) => (
            <li key={p.label}>
              <button
                onClick={() => setActive(i)}
                className={`w-full rounded-lg border p-4 text-left transition-colors ${
                  active === i ? "border-primary bg-card" : "border-border bg-card/40 hover:border-primary/40"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${
                      active === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="font-medium">{p.label}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="surface-panel flex min-h-[320px] flex-col p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{PIPELINE[active]!.label}</p>
          <p className="mt-4 font-display text-lg leading-relaxed">{PIPELINE[active]!.body}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {active < PIPELINE.length - 1 ? (
              <button
                onClick={() => setActive(active + 1)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Next step <ArrowRight className="size-4" />
              </button>
            ) : (
              <Link
                to="/start"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Try it yourself <Download className="size-4" />
              </Link>
            )}
            {active > 0 && (
              <button onClick={() => setActive(active - 1)} className="rounded-lg border border-border px-4 py-2 text-sm">
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
