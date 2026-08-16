import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { codeToHtml } from "shiki";
import {
  generateWebsiteAction,
  refineSectionAction,
  regenerateSectionAction,
} from "../lib/generator/ai.functions";
import { generateCSS, generateHTML, generateJS } from "../lib/generator/code-gen";
import { getBlock, getBlocksByCategory } from "../lib/generator/blocks/registry";
import type { Section, WebsiteBrief, WebsiteConfig } from "../types/website";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Check,
  ChevronLeft,
  Code2,
  Copy,
  Download,
  Copy as DuplicateIcon,
  Loader2,
  Monitor,
  Pencil,
  Plus,
  RefreshCcw,
  Search,
  Smartphone,
  Sparkles,
  Tablet,
  Trash2,
  Wand2,
  X,
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export const Route = createFileRoute("/generator")({
  validateSearch: (search: Record<string, unknown>) => ({
    prompt: (search["prompt"] as string) || "",
    siteType: (search["siteType"] as string) || undefined,
    visualStyle: (search["visualStyle"] as string) || undefined,
    brandName: (search["brandName"] as string) || undefined,
    audience: (search["audience"] as string) || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Generator workspace — WebGen AI" },
      { name: "description", content: "Generate, edit and export a responsive single-page website from a short brief." },
      { property: "og:title", content: "Generator workspace — WebGen AI" },
      { property: "og:description", content: "Generate, edit and export a responsive single-page website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: GeneratorWorkspace,
});

const STAGES = [
  "Reading the brief",
  "Planning the structure",
  "Locking the design system",
  "Selecting blocks",
  "Writing content",
  "Generating HTML, CSS and JS",
];

const REFINEMENTS: Array<{ id: string; label: string }> = [
  { id: "premium", label: "More premium" },
  { id: "shorter", label: "Shorter" },
  { id: "persuasive", label: "More persuasive" },
  { id: "professional", label: "More professional" },
  { id: "playful", label: "More playful" },
  { id: "layout", label: "Change layout" },
];

const ADDABLE = [
  "hero",
  "features",
  "services",
  "about",
  "stats",
  "gallery",
  "menu",
  "work",
  "team",
  "testimonials",
  "pricing",
  "faq",
  "location",
  "cta",
  "contact",
];

const STYLES = ["modern", "minimal", "premium", "bold", "editorial", "futuristic"];

function GeneratorWorkspace() {
  const search = Route.useSearch();
  const [config, setConfig] = useState<WebsiteConfig | null>(null);
  const [brief, setBrief] = useState<WebsiteBrief>({
    prompt: search.prompt,
    siteType: search.siteType || "auto",
    visualStyle: search.visualStyle || "auto",
    brandName: search.brandName,
    audience: search.audience,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [stage, setStage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [busySection, setBusySection] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [toast, setToast] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const notify = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const generate = useCallback(
    async (nextBrief: WebsiteBrief) => {
      if (!nextBrief.prompt?.trim()) {
        setError("Add a short description of the website before generating.");
        return;
      }
      setIsGenerating(true);
      setError(null);
      setStage(0);
      const ticker = window.setInterval(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), 320);
      try {
        const result = await generateWebsiteAction({ data: { brief: nextBrief } });
        setConfig(result as unknown as WebsiteConfig);
      } catch (e) {
        console.error("Generation failed", e);
        setError(e instanceof Error ? e.message : "Generation failed. Please try again.");
      } finally {
        window.clearInterval(ticker);
        setIsGenerating(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (search.prompt) void generate(brief);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const code = useMemo(() => {
    if (!config) return null;
    return { html: generateHTML(config), css: generateCSS(config), js: generateJS(config) };
  }, [config]);

  useEffect(() => {
    if (!code || !iframeRef.current) return;
    const doc = iframeRef.current.contentWindow?.document;
    if (!doc) return;
    try {
      doc.open();
      doc.write(`${code.html}\n<style>${code.css}</style>\n<script>${code.js}</script>`);
      doc.close();
    } catch (e) {
      console.error("Preview failed", e);
      setError("The preview could not be rendered. Try regenerating the site.");
    }
  }, [code, viewport]);

  /* ------------------------------------------------------ section ops */

  const patchSections = (fn: (sections: Section[]) => Section[]) =>
    setConfig((prev) => (prev ? { ...prev, sections: fn(prev.sections) } : prev));

  const handleRegenerate = async (section: Section) => {
    if (!config) return;
    setBusySection(section.id);
    try {
      const next = await regenerateSectionAction({
        data: {
          category: section.type,
          sectionId: section.id,
          currentBlockId: section.blockId,
          brief: config.brief ?? brief,
        },
      });
      patchSections((s) => s.map((item) => (item.id === section.id ? (next as unknown as Section) : item)));
      notify(`${section.type} section regenerated`);
    } catch (e) {
      console.error(e);
      notify("Could not regenerate that section");
    } finally {
      setBusySection(null);
    }
  };

  const handleRefine = async (section: Section, instruction: string) => {
    setBusySection(section.id);
    try {
      const next = await refineSectionAction({ data: { section, instruction } });
      patchSections((s) => s.map((item) => (item.id === section.id ? (next as unknown as Section) : item)));
      notify("Section refined");
    } catch (e) {
      console.error(e);
      notify("Refinement failed");
    } finally {
      setBusySection(null);
    }
  };

  const handleMove = (idx: number, dir: "up" | "down") =>
    patchSections((sections) => {
      const target = dir === "up" ? idx - 1 : idx + 1;
      if (target < 0 || target >= sections.length) return sections;
      const next = [...sections];
      const tmp = next[idx]!;
      next[idx] = next[target]!;
      next[target] = tmp;
      return next;
    });

  const handleDuplicate = (idx: number) =>
    patchSections((sections) => {
      const original = sections[idx];
      if (!original) return sections;
      const copy: Section = { ...original, id: `${original.type}-${Math.random().toString(36).slice(2, 8)}` };
      return [...sections.slice(0, idx + 1), copy, ...sections.slice(idx + 1)];
    });

  const handleDelete = (idx: number) => patchSections((sections) => sections.filter((_, i) => i !== idx));

  const handleAdd = (category: string) => {
    const block = getBlocksByCategory(category)[0];
    if (!block) return;
    patchSections((sections) => [
      ...sections.filter((s) => s.type !== "footer"),
      {
        id: `${category}-${Math.random().toString(36).slice(2, 8)}`,
        type: category,
        blockId: block.id,
        content: { title: `${category[0]!.toUpperCase()}${category.slice(1)}`, subtitle: "Edit this section's content.", items: [] },
      },
      ...sections.filter((s) => s.type === "footer"),
    ]);
    notify(`${category} section added`);
  };

  const updateContent = (sectionId: string, key: string, value: string) =>
    patchSections((sections) =>
      sections.map((s) => (s.id === sectionId ? { ...s, content: { ...s.content, [key]: value } } : s)),
    );

  const setLayout = (sectionId: string, blockId: string) =>
    patchSections((sections) => sections.map((s) => (s.id === sectionId ? { ...s, blockId } : s)));

  const updateDesign = (patch: Partial<WebsiteConfig["designSystem"]>) =>
    setConfig((prev) => (prev ? { ...prev, designSystem: { ...prev.designSystem, ...patch } } : prev));

  const handleExport = async () => {
    if (!config || !code) return;
    try {
      const zip = new JSZip();
      zip.file("index.html", code.html);
      zip.file("style.css", code.css);
      zip.file("script.js", code.js);
      zip.file(
        "README.md",
        `# ${config.name}\n\nStandalone website generated with WebGen AI.\n\n## Files\n- index.html\n- style.css\n- script.js\n\nOpen index.html in any browser — no build step required.\nIcons load from the Lucide CDN and utility classes from the Tailwind CDN.\n\nSome layout patterns are adapted from Tailblocks (https://tailblocks.cc), MIT licensed.\n`,
      );
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `${config.name.toLowerCase().replace(/\s+/g, "-")}-website.zip`);
      notify("ZIP exported");
    } catch (e) {
      console.error(e);
      notify("Export failed — please try again");
    }
  };

  const frameWidth =
    viewport === "desktop" ? "w-full max-w-[1400px]" : viewport === "tablet" ? "w-[768px]" : "w-[390px]";

  return (
    <div className="flex h-screen flex-col overflow-hidden lg:flex-row">
      {/* --------------------------------------------------------- Sidebar */}
      <aside
        className={`${sidebarOpen ? "flex" : "hidden"} absolute inset-0 z-30 w-full flex-col border-r border-border bg-background lg:static lg:z-auto lg:flex lg:w-[340px] shadow-2xl lg:shadow-none`}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">W</span>
            WebGen AI
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted lg:hidden" aria-label="Close panel">
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto p-4">
          {/* Brief */}
          <section className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Website brief</h2>
            <textarea
              value={brief.prompt}
              onChange={(e) => setBrief({ ...brief, prompt: e.target.value })}
              rows={3}
              placeholder="Describe the website…"
              className="w-full resize-none rounded border border-input bg-background p-2.5 text-sm outline-none focus:ring-1 focus:ring-primary/40"
            />
            <div className="grid grid-cols-2 gap-2">
              <Field label="Business name" value={brief.brandName ?? ""} onChange={(v) => setBrief({ ...brief, brandName: v })} />
              <Field label="Audience" value={brief.audience ?? ""} onChange={(v) => setBrief({ ...brief, audience: v })} />
              <Field label="Personality" value={brief.personality ?? ""} onChange={(v) => setBrief({ ...brief, personality: v })} />
              <Field label="CTA wording" value={brief.ctaPreference ?? ""} onChange={(v) => setBrief({ ...brief, ctaPreference: v })} />
              <Field label="Colour" value={brief.colorPreference ?? ""} onChange={(v) => setBrief({ ...brief, colorPreference: v })} />
              <label className="block">
                <span className="mb-1 block text-[11px] font-medium text-muted-foreground">Style</span>
                <select
                  value={brief.visualStyle || "auto"}
                  onChange={(e) => setBrief({ ...brief, visualStyle: e.target.value })}
                  className="w-full rounded border border-input bg-background p-2 text-xs capitalize outline-none focus:ring-1 focus:ring-primary/40"
                >
                  {["auto", ...STYLES].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
            </div>
            <Field
              label="Extra requirements"
              value={brief.requirements ?? ""}
              onChange={(v) => setBrief({ ...brief, requirements: v })}
            />
            <button
              onClick={() => void generate(brief)}
              disabled={isGenerating}
              className="inline-flex w-full items-center justify-center gap-2 rounded bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
              {config ? "Regenerate website" : "Generate website"}
            </button>
            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                <div className="space-y-2">
                  <p>{error}</p>
                  <button onClick={() => void generate(brief)} className="font-semibold underline">
                    Try again
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Design system */}
          {config && (
            <section className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Design system</h2>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="block">
                  <span className="mb-1 block text-[11px] text-muted-foreground">Primary</span>
                  <input
                    type="color"
                    value={config.designSystem.primaryColor}
                    onChange={(e) => updateDesign({ primaryColor: e.target.value })}
                    className="h-9 w-full cursor-pointer rounded-md border border-input bg-background"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[11px] text-muted-foreground">Theme</span>
                  <select
                    value={config.designSystem.theme}
                    onChange={(e) => {
                      const theme = e.target.value as "light" | "dark";
                      updateDesign(
                        theme === "dark"
                          ? { theme, backgroundColor: "#0a0f1c", textColor: "#f4f7fb", surfaceColor: "#111a2e" }
                          : { theme, backgroundColor: "#ffffff", textColor: "#101828", surfaceColor: "#f8fafc" },
                      );
                    }}
                    className="w-full rounded-md border border-input bg-background p-2 outline-none"
                  >
                    <option value="light">light</option>
                    <option value="dark">dark</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-[11px] text-muted-foreground">Radius</span>
                  <select
                    value={config.designSystem.borderRadius}
                    onChange={(e) => updateDesign({ borderRadius: e.target.value })}
                    className="w-full rounded-md border border-input bg-background p-2 outline-none"
                  >
                    {["0rem", "0.25rem", "0.5rem", "0.75rem", "1.25rem"].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-[11px] text-muted-foreground">Spacing</span>
                  <select
                    value={config.designSystem.spacing}
                    onChange={(e) => updateDesign({ spacing: e.target.value as any })}
                    className="w-full rounded-md border border-input bg-background p-2 outline-none"
                  >
                    {["compact", "balanced", "airy"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-[11px] text-muted-foreground">Buttons</span>
                  <select
                    value={config.designSystem.buttonStyle}
                    onChange={(e) => updateDesign({ buttonStyle: e.target.value as any })}
                    className="w-full rounded border border-input bg-background p-2 outline-none text-xs"
                  >
                    {["solid", "pill", "outline"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-[11px] text-muted-foreground">Cards</span>
                  <select
                    value={config.designSystem.cardStyle}
                    onChange={(e) => updateDesign({ cardStyle: e.target.value as any })}
                    className="w-full rounded border border-input bg-background p-2 outline-none text-xs"
                  >
                    {["flat", "bordered", "elevated"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>
              {config.strategy && (
                <ul className="space-y-1 rounded border border-border bg-card p-3 text-[11px] text-muted-foreground">
                  {config.strategy.map((line) => (
                    <li key={line} className="flex gap-2">
                      <Check className="mt-0.5 size-3 shrink-0 text-primary" />
                      {line}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Sections */}
          <section className="space-y-3 pb-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Sections</h2>
              {config && (
                <select
                  onChange={(e) => {
                    if (e.target.value) handleAdd(e.target.value);
                    e.currentTarget.selectedIndex = 0;
                  }}
                  className="rounded border border-input bg-background px-2 py-1 text-[11px] capitalize outline-none"
                  aria-label="Add section"
                >
                  <option value="">+ Add section</option>
                  {ADDABLE.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              )}
            </div>

            {!config && !isGenerating && (
              <p className="rounded border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No website yet. Describe one above and generate.
              </p>
            )}

            {config?.sections.map((section, idx) => {
              const variants = getBlocksByCategory(section.type);
              const isEditing = editingSection === section.id;
              return (
                <div key={section.id} className="rounded-lg border border-border bg-card p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-sm font-medium capitalize">
                      <span className="size-1.5 rounded-full bg-primary" />
                      {section.type}
                      {busySection === section.id && <Loader2 className="size-3 animate-spin text-muted-foreground" />}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <IconBtn label="Move up" onClick={() => handleMove(idx, "up")} disabled={idx === 0}>
                        <ArrowUp className="size-3.5" />
                      </IconBtn>
                      <IconBtn label="Move down" onClick={() => handleMove(idx, "down")} disabled={idx === config.sections.length - 1}>
                        <ArrowDown className="size-3.5" />
                      </IconBtn>
                      <IconBtn label="Edit content" onClick={() => setEditingSection(isEditing ? null : section.id)}>
                        <Pencil className="size-3.5" />
                      </IconBtn>
                      <IconBtn label="Duplicate" onClick={() => handleDuplicate(idx)}>
                        <DuplicateIcon className="size-3.5" />
                      </IconBtn>
                      <IconBtn label="Delete" onClick={() => handleDelete(idx)} destructive>
                        <Trash2 className="size-3.5" />
                      </IconBtn>
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => void handleRegenerate(section)}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground hover:bg-muted"
                    >
                      <RefreshCcw className="size-3" /> Regenerate
                    </button>
                    {variants.length > 1 && (
                      <select
                        value={section.blockId ?? ""}
                        onChange={(e) => setLayout(section.id, e.target.value)}
                        className="rounded-md border border-input bg-background px-1.5 py-1 text-[11px] outline-none"
                        aria-label="Change layout"
                      >
                        {variants.map((v) => (
                          <option key={v.id} value={v.id}>{v.layout}</option>
                        ))}
                      </select>
                    )}
                    <select
                      onChange={(e) => {
                        if (e.target.value) void handleRefine(section, e.target.value);
                        e.currentTarget.selectedIndex = 0;
                      }}
                      className="rounded-md border border-input bg-background px-1.5 py-1 text-[11px] outline-none"
                      aria-label="AI refinement"
                    >
                      <option value="">AI refine…</option>
                      {REFINEMENTS.map((r) => (
                        <option key={r.id} value={r.id}>{r.label}</option>
                      ))}
                    </select>
                  </div>

                  {isEditing && (
                    <div className="mt-3 space-y-2 border-t border-border pt-3">
                      {(["eyebrow", "title", "subtitle", "cta"] as const).map((key) =>
                        typeof section.content[key] === "string" || key === "title" ? (
                          <Field
                            key={key}
                            label={key}
                            value={(section.content[key] as string) ?? ""}
                            onChange={(v) => updateContent(section.id, key, v)}
                          />
                        ) : null,
                      )}
                      <p className="text-[11px] text-muted-foreground">
                        Source: {getBlock(section.blockId ?? "")?.source ?? "custom"} block
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </div>
      </aside>

      {/* ------------------------------------------------------------ Main */}
      <main className="relative flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border bg-background px-6 shadow-sm">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarOpen(true)} className="rounded-md border border-border p-1.5 lg:hidden" aria-label="Open panel">
              <ChevronLeft className="size-4" />
            </button>
            <div className="hidden items-center gap-1 rounded border border-border bg-muted p-1 sm:flex">
              {([
                ["desktop", Monitor],
                ["tablet", Tablet],
                ["mobile", Smartphone],
              ] as const).map(([key, Icon]) => (
                <button
                  key={key}
                  onClick={() => setViewport(key)}
                  aria-label={`${key} preview`}
                  aria-pressed={viewport === key}
                  className={`rounded p-1.5 transition-all ${viewport === key ? "bg-card text-primary shadow-sm scale-110" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Icon className="size-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCode(true)}
              disabled={!config}
              className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-[11px] font-bold transition-all hover:bg-muted active:scale-95 disabled:opacity-50"
            >
              <Code2 className="size-4" /> <span className="hidden sm:inline">Code</span>
            </button>
            <button
              onClick={() => void handleExport()}
              disabled={!config}
              className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-[11px] font-bold text-primary-foreground transition-all hover:opacity-95 active:scale-95 disabled:opacity-50 shadow-md shadow-primary/10"
            >
              <Download className="size-4" /> <span className="hidden sm:inline">Export ZIP</span>
            </button>
          </div>
        </header>

        <div className="relative flex flex-1 justify-center overflow-auto bg-muted/30 p-3 sm:p-6">
          {isGenerating && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-background/70 backdrop-blur-sm">
              <Loader2 className="size-8 animate-spin text-primary" />
              <div className="text-center">
                <p className="font-semibold">{STAGES[stage]}…</p>
                <p className="mt-1 text-xs text-muted-foreground">Demo generation — deterministic planner, no external AI call</p>
              </div>
            </div>
          )}

          {!config && !isGenerating && !error && (
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <Sparkles className="size-8 text-primary" />
              <p className="font-medium">Your preview will appear here</p>
              <p className="max-w-xs text-sm text-muted-foreground">Describe the website in the panel and press Generate.</p>
              <button onClick={() => setSidebarOpen(true)} className="rounded-lg border border-border px-4 py-2 text-sm lg:hidden">
                Open brief panel
              </button>
            </div>
          )}

          {config && (
            <div className={`mx-auto flex flex-col ${frameWidth} transition-all duration-500`}>
              <div className="flex items-center gap-2 rounded-t border border-border bg-card px-4 py-2.5">
                <span className="ml-1 flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-primary/60" />
                  <span className="size-2.5 rounded-full bg-accent/60" />
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                </span>
                <span className="mx-auto max-w-sm flex-1 truncate rounded bg-muted px-3 py-1 text-center text-[10px] text-muted-foreground">
                  {config.name.toLowerCase().replace(/\s+/g, "")}.com
                </span>
                <button onClick={() => setViewport((v) => v)} className="rounded p-1 text-muted-foreground hover:bg-muted" aria-label="Refresh preview">
                  <RefreshCcw className="size-3.5" />
                </button>
              </div>
              <iframe
                ref={iframeRef}
                title="Generated website preview"
                className="h-[70vh] w-full rounded-b border border-t-0 border-border bg-white lg:h-[calc(100vh-8rem)]"
              />
            </div>
          )}
        </div>
      </main>

      {showCode && code && <CodeViewer code={code} name={config?.name ?? "site"} onClose={() => setShowCode(false)} onCopied={notify} />}

      {toast && (
        <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded border border-border bg-card px-4 py-2 text-sm font-medium shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------ helpers */

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium capitalize text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-input bg-background p-2 text-xs outline-none focus:ring-1 focus:ring-primary/40 transition-shadow"
      />
    </label>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  disabled,
  destructive,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`rounded p-1 transition-colors disabled:opacity-30 ${destructive ? "text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
    >
      {children}
    </button>
  );
}

function CodeViewer({
  code,
  name,
  onClose,
  onCopied,
}: {
  code: { html: string; css: string; js: string };
  name: string;
  onClose: () => void;
  onCopied: (m: string) => void;
}) {
  const [tab, setTab] = useState<"html" | "css" | "js">("html");
  const [highlighted, setHighlighted] = useState<string>("");
  const source = code[tab];
  const filename = tab === "html" ? "index.html" : tab === "css" ? "style.css" : "script.js";

  useEffect(() => {
    let active = true;
    const lang = tab === "js" ? "javascript" : tab;
    codeToHtml(source, {
      lang,
      theme: "vitesse-dark",
      structure: "classic",
    }).then((html) => {
      if (active) setHighlighted(html);
    });
    return () => {
      active = false;
    };
  }, [source, tab]);

  const download = () => {
    const blob = new Blob([source], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/98 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between border-b border-border bg-card/50 px-6 py-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded bg-primary text-[10px] font-bold text-primary-foreground">W</span>
            <span className="text-sm font-semibold tracking-tight">Code Inspector</span>
          </div>
          <div className="flex gap-1 rounded border border-border bg-muted p-1">
            {(["html", "css", "js"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${tab === t ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-[11px] font-medium text-muted-foreground lg:block">
            {filename} · {source.split("\n").length} lines
          </span>
          <div className="h-4 w-px bg-border hidden lg:block" />
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(source);
              onCopied(`${filename} copied`);
            }}
            className="inline-flex items-center gap-2 rounded border border-border bg-card px-3 py-1.5 text-[11px] font-semibold transition-all hover:bg-muted active:scale-95"
          >
            <Copy className="size-3.5" /> Copy
          </button>
          <button
            onClick={download}
            className="inline-flex items-center gap-2 rounded border border-border bg-card px-3 py-1.5 text-[11px] font-semibold transition-all hover:bg-muted active:scale-95"
          >
            <Download className="size-3.5" /> Download
          </button>
          <button
            onClick={onClose}
            className="ml-2 rounded-full p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            aria-label="Close code viewer"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 overflow-auto p-6 scrollbar-thin scrollbar-thumb-border">
          {highlighted ? (
            <div
              className="shiki-container font-mono text-[13px] leading-relaxed [&>pre]:!bg-transparent [&>pre]:!p-0"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t border-border bg-card/30 px-6 py-2">
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
          Framework Agnostic · Pure Vanilla Output
        </div>
        <div className="text-[10px] text-muted-foreground">
          {name.toLowerCase().replace(/\s+/g, "-")}
        </div>
      </div>
    </div>
  );
}
