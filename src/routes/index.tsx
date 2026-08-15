import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (prompt.trim()) {
      navigate({ to: "/generator", search: { prompt } });
    } else {
      navigate({ to: "/generator" });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-2xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-6xl font-extrabold tracking-tighter text-foreground leading-[1.1]">
          Build a website from an idea.
        </h1>
        <p className="text-xl text-muted-foreground max-w-lg mx-auto">
          Describe your product, business or service and generate a polished, responsive landing page in seconds.
        </p>
        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-40 p-5 rounded-2xl border border-border bg-card text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
            placeholder="Create a premium landing page for an AI-powered fitness coaching startup targeting busy professionals..."
          />
          <button 
            onClick={handleStart}
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg"
          >
            Start Building
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {["SaaS", "Agency", "Restaurant", "Portfolio", "App"].map((tag) => (
            <button
              key={tag}
              onClick={() => setPrompt(`Create a modern ${tag.toLowerCase()} website for...`)}
              className="px-4 py-1.5 rounded-full border border-border text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

