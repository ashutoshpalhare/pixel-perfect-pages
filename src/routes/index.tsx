import { createFileRoute } from "@tanstack/react-router";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-2xl text-center space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tighter text-foreground">
          Build a website from an idea.
        </h1>
        <p className="text-xl text-muted-foreground">
          Describe your product, business or service and generate a polished, responsive landing page in seconds.
        </p>
        <div className="space-y-4">
          <textarea
            className="w-full h-32 p-4 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Create a premium landing page for an AI-powered fitness coaching startup targeting busy professionals..."
          />
          <button className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all">
            Start Building
          </button>
        </div>
      </div>
    </div>
  );
}
