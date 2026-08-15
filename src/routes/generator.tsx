import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/generator")({
  component: GeneratorWorkspace,
});

function GeneratorWorkspace() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar: Brief & Sections */}
      <aside className="w-80 border-r border-border bg-card p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Website Brief</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Business Name</label>
            <input className="w-full mt-1 p-2 rounded-md border border-border bg-background" placeholder="Nova AI" />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea className="w-full mt-1 p-2 rounded-md border border-border bg-background h-24" placeholder="..." />
          </div>
        </div>
      </aside>

      {/* Main Preview Area */}
      <main className="flex-1 flex flex-col bg-muted/20">
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
          <div className="flex gap-2">
             <button className="px-3 py-1 rounded-md hover:bg-muted text-sm border border-border">Desktop</button>
             <button className="px-3 py-1 rounded-md hover:bg-muted text-sm border border-border">Mobile</button>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-1 rounded-md bg-primary text-primary-foreground text-sm">Export</button>
          </div>
        </header>
        <div className="flex-1 p-8 flex justify-center overflow-auto">
          <div className="w-full max-w-5xl bg-white shadow-2xl rounded-lg border border-border overflow-hidden">
             <iframe className="w-full h-full border-none" title="Preview" />
          </div>
        </div>
      </main>
    </div>
  );
}
