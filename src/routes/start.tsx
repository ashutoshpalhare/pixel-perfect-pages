import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Sparkles, Wand2 } from "lucide-react";

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "Start a website — WebGen AI" },
      {
        name: "description",
        content: "Describe your idea, pick a website type and style, and generate a responsive single-page website.",
      },
      { property: "og:title", content: "Start a website — WebGen AI" },
      { property: "og:description", content: "Describe your idea and generate a responsive single-page website in minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StartPage,
});

const TYPES = ["auto", "saas", "ai", "agency", "portfolio", "restaurant", "product", "app", "event", "creator", "local"];
const STYLES = ["auto", "modern", "minimal", "premium", "bold", "editorial", "futuristic"];

const EXAMPLES = [
  "Create a premium dark landing page for an AI cybersecurity startup called SentinelX.",
  "Create a premium restaurant website for a seasonal bistro called Ardent.",
  "Create a creative agency website for a brand studio called Fieldnote.",
];

function StartPage() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [siteType, setSiteType] = useState("auto");
  const [visualStyle, setVisualStyle] = useState("auto");
  const [brandName, setBrandName] = useState("");
  const [audience, setAudience] = useState("");
  const [error, setError] = useState<string | null>(null);

  const start = () => {
    if (!prompt.trim()) {
      setError("Describe what you want to build first — one sentence is enough.");
      return;
    }
    navigate({
      to: "/generator",
      search: { prompt: prompt.trim(), siteType, visualStyle, brandName, audience },
    });
  };

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-5 py-16">
        <Link to="/" className="mb-8 inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to home
        </Link>

        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" /> Demo generation — no external AI account needed
        </p>

        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">Let's build something.</h1>
        <p className="mt-3 text-muted-foreground">
          Describe the website you want. The generator plans the structure, locks a design system and writes the content.
        </p>

        <div className="surface-panel mt-8 space-y-5 p-5 sm:p-6">
          <div>
            <label htmlFor="brief" className="mb-2 block text-sm font-medium">
              What do you want to create?
            </label>
            <textarea
              id="brief"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                setError(null);
              }}
              rows={4}
              placeholder="Create a premium dark landing page for an AI cybersecurity startup called SentinelX."
              className="w-full resize-none rounded-lg border border-input bg-background p-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/40"
            />
            {error && (
              <p role="alert" className="mt-2 text-sm text-destructive">
                {error}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="type" className="mb-2 block text-sm font-medium">
                Website type
              </label>
              <select
                id="type"
                value={siteType}
                onChange={(e) => setSiteType(e.target.value)}
                className="w-full rounded-lg border border-input bg-background p-2.5 text-sm capitalize outline-none focus:ring-2 focus:ring-ring/40"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t === "auto" ? "Detect automatically" : t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="style" className="mb-2 block text-sm font-medium">
                Style
              </label>
              <select
                id="style"
                value={visualStyle}
                onChange={(e) => setVisualStyle(e.target.value)}
                className="w-full rounded-lg border border-input bg-background p-2.5 text-sm capitalize outline-none focus:ring-2 focus:ring-ring/40"
              >
                {STYLES.map((s) => (
                  <option key={s} value={s}>
                    {s === "auto" ? "Let AI decide" : s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="brand" className="mb-2 block text-sm font-medium">
                Business name <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                id="brand"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full rounded-lg border border-input bg-background p-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div>
              <label htmlFor="audience" className="mb-2 block text-sm font-medium">
                Target audience <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                id="audience"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="security teams at growing startups"
                className="w-full rounded-lg border border-input bg-background p-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
          </div>

          <button
            onClick={start}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform hover:opacity-90 active:scale-[0.99]"
          >
            <Wand2 className="size-4" /> Start generating
          </button>
        </div>

        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Try an example</p>
          <div className="mt-3 flex flex-col gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => setPrompt(ex)}
                className="rounded-lg border border-border bg-card px-4 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
