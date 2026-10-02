import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  FileText, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';

// Configure the worker URL
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

interface PdfCanvasViewerProps {
  pdfUrl: string;
  friendName: string;
  onSwitchToFormattedView?: () => void;
}

export const PdfCanvasViewer: React.FC<PdfCanvasViewerProps> = ({
  pdfUrl,
  friendName,
  onSwitchToFormattedView
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.15);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Keep track of current render task so we can cancel if re-rendering
  const renderTaskRef = useRef<pdfjsLib.RenderTask | null>(null);

  // Load document
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setError(null);
    setCurrentPage(1);

    const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });

    loadingTask.promise
      .then((doc) => {
        if (isCancelled) return;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setIsLoading(false);
      })
      .catch((err) => {
        if (isCancelled) return;
        console.warn(`Could not load PDF at ${pdfUrl}:`, err);
        setError("Original handwritten PDF will appear here soon.");
        setIsLoading(false);
      });

    return () => {
      isCancelled = true;
      try {
        loadingTask.destroy();
      } catch {
        // ignore
      }
    };
  }, [pdfUrl]);

  // Render current page onto canvas
  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current) return;

    try {
      // Cancel previous in-flight render
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }

      const page = await pdfDoc.getPage(currentPage);
      const canvas = canvasRef.current;
      if (!canvas) return;

      const viewport = page.getViewport({ scale });
      const outputScale = window.devicePixelRatio || 1;

      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.save();
      ctx.scale(outputScale, outputScale);

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport,
        canvas: canvas,
      };

      const task = page.render(renderContext);
      renderTaskRef.current = task;

      await task.promise;
      renderTaskRef.current = null;
    } catch (err: unknown) {
      if ((err as { name?: string })?.name === 'RenderingCancelledException') {
        // Normal when switching pages or zooming quickly
        return;
      }
      console.error("Canvas render error:", err);
    }
  }, [pdfDoc, currentPage, scale]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  // Page Controls
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const nextPage = () => {
    if (currentPage < numPages) setCurrentPage((p) => p + 1);
  };

  // Zoom Controls
  const zoomIn = () => setScale((s) => Math.min(2.2, +(s + 0.15).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(0.65, +(s - 0.15).toFixed(2)));
  const resetZoom = () => setScale(1.15);

  // Fullscreen toggle for container
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Graceful empty / fallback state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-[#0D1122]/70 backdrop-blur-md rounded-2xl border border-white/10 my-4 min-h-[360px]">
        <div className="relative mb-5">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <AlertCircle className="w-5 h-5 text-amber-400 absolute -bottom-1 -right-1 bg-[#080B14] rounded-full" />
        </div>
        <h4 className="text-xl font-medium text-amber-100 font-celestial mb-2">
          {error}
        </h4>
        <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
          {friendName}'s handwritten letter document has not been uploaded to <code className="text-amber-300 bg-amber-950/40 px-1.5 py-0.5 rounded text-xs">public/letters/</code> yet. You can still read their full heartfelt message in the formatted letter view.
        </p>
        {onSwitchToFormattedView && (
          <button
            onClick={onSwitchToFormattedView}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/30 hover:from-amber-500/30 hover:to-amber-600/40 text-amber-200 border border-amber-500/40 text-sm font-medium transition-all shadow-lg shadow-amber-950/30 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            Read Formatted Letter
          </button>
        )}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`relative flex flex-col items-center w-full bg-[#080B14]/90 rounded-2xl overflow-hidden border border-white/10 ${
        isFullscreen ? 'p-4 justify-center h-screen' : 'my-2'
      }`}
    >
      {/* Sticky PDF Action Bar */}
      <div className="sticky top-0 z-20 w-full flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#0D1122]/90 backdrop-blur-md border-b border-white/10 text-xs sm:text-sm text-slate-300">
        {/* Pagination */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={prevPage}
            disabled={currentPage <= 1 || isLoading}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition text-slate-200"
            title="Previous Page"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-mono text-slate-300 px-2 py-0.5 rounded bg-black/40 border border-white/5 text-xs">
            {isLoading ? "..." : `${currentPage} / ${numPages}`}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage >= numPages || isLoading}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition text-slate-200"
            title="Next Page"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={zoomOut}
            disabled={isLoading || scale <= 0.65}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 transition text-slate-200"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={resetZoom}
            className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition text-xs font-mono text-amber-200/90"
            title="Reset Zoom"
          >
            {Math.round(scale * 100)}%
          </button>

          <button
            onClick={zoomIn}
            disabled={isLoading || scale >= 2.2}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 transition text-slate-200"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition text-slate-200"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Reading"}
            aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen Reading"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="w-full overflow-auto max-h-[70vh] flex items-center justify-center p-4 sm:p-6 bg-[#04060C]/60">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin" />
            <p className="text-xs font-mono tracking-widest text-amber-300/80">PREPARING KEEPSAKE...</p>
          </div>
        )}

        <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} shadow-2xl rounded-md overflow-hidden bg-white`}>
          <canvas ref={canvasRef} className="block max-w-none" />
        </div>
      </div>

      {/* Footer Note */}
      <div className="w-full text-center py-2 text-[11px] text-slate-400/80 border-t border-white/5 bg-[#0D1122]/60">
        Rendered directly in your browser • No file download needed
      </div>
    </div>
  );
};
