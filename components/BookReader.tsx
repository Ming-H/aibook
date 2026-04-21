"use client";

import { useEffect, useRef } from "react";

export function BookReader({ slug, title }: { slug: string; title: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let raf = 0;
    let stabilizeTimer: ReturnType<typeof setTimeout>;

    const resize = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc && doc.body) {
          const h = Math.max(
            doc.body.scrollHeight,
            doc.documentElement.scrollHeight,
            doc.body.offsetHeight,
            doc.documentElement.offsetHeight
          );
          iframe.style.height = h + "px";
        }
      } catch {}
    };

    // Iteratively resize until stable — needed because HTML files use
    // `min-height: 100vh` which creates a feedback loop with scrollHeight.
    const stabilize = () => {
      let prev = 0;
      let attempts = 0;
      const maxAttempts = 20;

      const step = () => {
        resize();
        const curr = parseFloat(iframe.style.height) || 0;
        if (curr !== prev && attempts < maxAttempts) {
          prev = curr;
          attempts++;
          requestAnimationFrame(step);
        }
      };
      step();
    };

    const onLoad = () => {
      stabilize();
      // Catch late-loading resources (fonts, images)
      stabilizeTimer = setTimeout(stabilize, 2000);
    };

    iframe.addEventListener("load", onLoad);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(stabilizeTimer);
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={`/books/${slug}.html`}
      className="w-full border-0"
      style={{ minHeight: "calc(100vh - 48px)" }}
      title={title}
    />
  );
}
