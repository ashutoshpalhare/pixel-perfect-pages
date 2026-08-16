import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Github,
  Globe,
  Terminal,
  Cpu,
  Shield,
  Code2,
  ExternalLink,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ashutosh Palhare — WebGen AI" },
      { name: "description", content: "The developer and story behind WebGen AI." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Simple Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="flex size-8 items-center justify-center rounded bg-primary font-bold text-primary-foreground group-hover:scale-105 transition-transform">W</span>
            <span className="font-display text-lg font-semibold tracking-tight">WebGen AI</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/generator" className="text-muted-foreground hover:text-foreground transition-colors">Generator</Link>
            <Link to="/start" className="rounded bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition-opacity">
              Start Building
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-20 sm:py-32">
        <div className="space-y-12">
          {/* Hero / Intro */}
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-primary uppercase tracking-wider">
              Founder Story
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold font-display tracking-tight leading-tight">
              Building for a <span className="text-gradient">faster, safer web.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              I'm Ashutosh Palhare, a developer focused on cybersecurity, modern building practices, and open source. 
              WebGen AI is an exploration into how we can turn natural language into working, production-ready code.
            </p>
          </section>

          {/* Social Links */}
          <section className="flex flex-wrap gap-4">
            <a href="https://github.com/ashutoshpalhare" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
              <Github className="size-4" /> GitHub
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
              <Twitter className="size-4" /> Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
              <Linkedin className="size-4" /> LinkedIn
            </a>
          </section>

          <hr className="border-border" />

          {/* Interests */}
          <section className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-primary">
                <Shield className="size-5" />
                <h3 className="font-semibold">Cybersecurity</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Exploring vulnerabilities and building systems that are secure by design. Security shouldn't be an afterthought.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-primary">
                <Cpu className="size-5" />
                <h3 className="font-semibold">Modern Systems</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Obsessed with high-performance architectures, low latency, and systems that scale efficiently.
              </p>
            </div>
          </section>

          {/* What I Build */}
          <section className="space-y-6 pt-6">
            <h2 className="text-2xl font-bold font-display tracking-tight">What I Build</h2>
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded bg-primary/10 text-primary">
                      <Terminal className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">WebGen AI</h3>
                      <p className="text-xs text-muted-foreground">August 2026 – Present</p>
                    </div>
                  </div>
                  <Link to="/generator" className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1">
                    View Project <ExternalLink className="size-3" />
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A framework-agnostic website generator that uses AI to translate descriptions into semantic HTML, 
                  token-driven CSS, and vanilla JS. Built with TanStack and a custom planning engine.
                </p>
              </div>
            </div>
          </section>

          {/* Philosophy */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display tracking-tight">Philosophy</h2>
            <blockquote className="border-l-2 border-primary pl-6 italic text-lg text-foreground font-display">
              "Great software isn't just about features; it's about the constraints we choose and the clarity of the result."
            </blockquote>
            <p className="text-muted-foreground leading-relaxed pt-2">
              I believe in building tools that empower developers rather than hiding complexity behind opaque abstractions. 
              Open source is the foundation of this belief—sharing knowledge and building in public.
            </p>
          </section>

          {/* Open Source */}
          <section className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-display tracking-tight">Open Source</h2>
              <a href="https://github.com/ashutoshpalhare" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                View all on GitHub <ExternalLink className="size-3" />
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-5 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
                <h3 className="font-semibold flex items-center gap-2">
                  <Code2 className="size-4 text-primary" /> Security Research
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">Public audits and security tools for the modern web.</p>
              </div>
              <div className="p-5 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
                <h3 className="font-semibold flex items-center gap-2">
                  <Globe className="size-4 text-primary" /> Developer Tooling
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">CLIs and libraries for faster development cycles.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            © 2026 Ashutosh Palhare
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:contact@example.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="size-4" />
            </a>
            <a href="https://github.com/ashutoshpalhare" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Github className="size-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
