import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { generateWebsiteAction } from "../lib/generator/ai.functions";
import { generateHTML, generateCSS, generateJS } from "../lib/generator/code-gen";
import { WebsiteConfig } from "../types/website";
import { Loader2, Monitor, Tablet, Smartphone, Download, Send, ChevronRight } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export const Route = createFileRoute("/generator")({
  validateSearch: (search: Record<string, unknown>) => ({
    prompt: (search['prompt'] as string) || "",
  }),
  component: GeneratorWorkspace,
});

function GeneratorWorkspace() {
  const { prompt: initialPrompt } = Route.useSearch();
  const [config, setConfig] = useState<WebsiteConfig | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const generate = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const result = await generateWebsiteAction({ data: { prompt } });
      setConfig(result as unknown as WebsiteConfig);
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (initialPrompt) {
      generate(initialPrompt);
    }
  }, []);

  useEffect(() => {
    if (config && iframeRef.current) {
      const html = generateHTML(config);
      const css = generateCSS(config);
      const js = generateJS(config);
      
      const combined = `
        ${html}
        <style>${css}</style>
        <script>${js}</script>
      `;
      
      const doc = iframeRef.current.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(combined);
        doc.close();
      }
    }
  }, [config, viewport]);

  const handleExport = async () => {
    if (!config) return;

    const zip = new JSZip();
    zip.file("index.html", generateHTML(config));
    zip.file("style.css", generateCSS(config));
    zip.file("script.js", generateJS(config));
    zip.file("README.md", `# ${config.name}\n\nGenerated with WebGen AI.\n\nTo view this site, simply open index.html in any browser.`);

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `${config.name.toLowerCase().replace(/\s+/g, "-")}-website.zip`);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      {/* Sidebar: Brief & Sections */}
      <aside className="w-80 border-r border-border bg-card flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">W</div>
          <span className="font-bold tracking-tight text-lg">WebGen AI</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Website Brief</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Project Name</label>
                <input 
                  value={config?.name || ""} 
                  onChange={e => setConfig(prev => prev ? {...prev, name: e.target.value} : null)}
                  className="w-full p-2 text-sm rounded-md border border-border bg-background focus:ring-1 focus:ring-primary outline-none transition-all" 
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Style Direction</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-2 text-xs rounded border border-primary bg-primary/5 text-primary">Modern SaaS</button>
                  <button className="p-2 text-xs rounded border border-border hover:bg-muted transition-colors">Neo-brutalist</button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sections</h3>
              <button className="text-[10px] text-primary hover:underline font-medium">Add New</button>
            </div>
            <div className="space-y-2">
              {config?.sections.map((section, idx) => (
                <div key={idx} className="group p-3 rounded-lg border border-border bg-background hover:border-primary/50 transition-all flex items-center justify-between cursor-move">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    <span className="text-sm font-medium capitalize">{section.type}</span>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
              {!config && !isGenerating && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  Start by entering a prompt below.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border bg-muted/30">
          <div className="relative">
            <textarea 
              placeholder="Refine your website..."
              className="w-full p-3 pr-10 text-sm rounded-xl border border-border bg-background shadow-inner focus:ring-2 focus:ring-primary/10 outline-none resize-none h-24"
            />
            <button className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-primary text-primary-foreground hover:scale-105 transition-transform">
              <Send size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Preview Area */}
      <main className="flex-1 flex flex-col bg-muted/10 relative">
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 z-10 shadow-sm">
          <div className="flex items-center gap-1 bg-muted p-1 rounded-lg border border-border">
             <button 
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded-md transition-all ${viewport === 'desktop' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
             >
               <Monitor size={18} />
             </button>
             <button 
              onClick={() => setViewport('tablet')}
              className={`p-1.5 rounded-md transition-all ${viewport === 'tablet' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
             >
               <Tablet size={18} />
             </button>
             <button 
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded-md transition-all ${viewport === 'mobile' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
             >
               <Smartphone size={18} />
             </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-1.5 rounded-lg border border-border hover:bg-muted text-sm font-medium transition-colors">
              Code view
            </button>
            <button 
              onClick={handleExport}
              disabled={!config}
              className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium shadow-lg hover:shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </header>

        <div className="flex-1 flex justify-center overflow-hidden relative">
          {isGenerating && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-in fade-in duration-300">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-primary" size={40} />
                <div className="text-center space-y-1">
                  <p className="font-semibold text-lg">Generating your website...</p>
                  <p className="text-sm text-muted-foreground">Planning structure and generating copy</p>
                </div>
              </div>
            </div>
          )}
          
          <div className={`mt-8 mb-8 mx-auto transition-all duration-500 ease-in-out flex flex-col ${
            viewport === 'desktop' ? 'w-[95%] max-w-[1400px]' : 
            viewport === 'tablet' ? 'w-[768px]' : 
            'w-[375px]'
          }`}>
            <div className="w-full bg-card border border-border rounded-t-xl p-2 flex items-center gap-2 shadow-sm">
              <div className="flex gap-1.5 ml-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/20 border border-red-400/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20 border border-amber-400/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/20 border border-green-400/40" />
              </div>
              <div className="flex-1 max-w-sm mx-auto bg-muted/50 rounded py-1 px-3 text-[10px] text-muted-foreground text-center truncate">
                {config?.name || "Preview"}
              </div>
            </div>
            <div className="flex-1 bg-white shadow-2xl rounded-b-xl border border-t-0 border-border overflow-hidden relative group">
              <iframe 
                ref={iframeRef}
                className="w-full h-full border-none" 
                title="Preview" 
              />
              <div className="absolute inset-0 border-4 border-primary opacity-0 pointer-events-none group-hover:opacity-10 transition-opacity rounded-b-xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

