'use client';

import { useEffect, useRef } from 'react';
import { XTwitterIcon, ExternalLinkIcon } from '@/components/icons';

interface TwitterTimelineProps {
  readonly handle: string;
  readonly label: string;
  readonly height?: number;
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

export function TwitterTimeline({ handle, label, height = 500 }: TwitterTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function renderWidget() {
      if (!container) return;
      // Clear previous embed
      container.innerHTML = `
        <a
          class="twitter-timeline"
          data-theme="dark"
          data-chrome="noheader nofooter noborders transparent"
          data-tweet-limit="5"
          data-height="${height}"
          href="https://twitter.com/${handle}"
        ></a>
      `;

      if (window.twttr?.widgets) {
        window.twttr.widgets.load(container);
      }
    }

    if (window.twttr?.widgets) {
      renderWidget();
      return;
    }

    // Load Twitter widget script once
    const existingScript = document.getElementById('twitter-wjs');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'twitter-wjs';
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.onload = renderWidget;
      document.body.appendChild(script);
    } else {
      existingScript.addEventListener('load', renderWidget);
    }
  }, [handle, height]);

  return (
    <div className="bg-bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-bg-darker border border-border flex items-center justify-center">
            <XTwitterIcon size={16} className="text-text-primary" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary">{label}</p>
            <p className="text-xs text-text-muted">@{handle}</p>
          </div>
        </div>
        <a
          href={`https://twitter.com/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors"
        >
          <ExternalLinkIcon size={12} />
        </a>
      </div>

      {/* Widget container */}
      <div
        ref={containerRef}
        className="flex-1 min-h-[400px] bg-bg-darker/30"
        style={{ height }}
      >
        {/* Skeleton loader shown before script loads */}
        <div className="p-5 space-y-4 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-bg-card" />
                <div className="h-3 w-32 bg-bg-card rounded" />
              </div>
              <div className="h-3 w-full bg-bg-card rounded" />
              <div className="h-3 w-3/4 bg-bg-card rounded" />
              <div className="h-px bg-border/30 mt-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
