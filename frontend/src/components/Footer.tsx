import React from 'react';
import { Flame, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-16 px-4 md:px-8 border-t border-white/[0.06] text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2 text-base font-medium text-[#E1E0CC]">
            <Flame className="w-5 h-5 text-primary" />
            <span>TERRAFLARE</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-primary/80 border border-white/10">
              ANV26-AI-49
            </span>
          </div>
          <p className="text-gray-500 max-w-sm text-center md:text-left">
            Autonomous wildfire and smoke intelligence grid fusing YOLO11 computer vision with NASA FIRMS orbital telemetry.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
          <a
            href="https://terraflare-ya3bcyu7advdfv3vwrdqzs.streamlit.app/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <span>Streamlit Cloud Demo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://lnkd.in/p/eQQpQ-eu"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <span>LinkedIn Announcement</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="#about"
            className="hover:text-primary transition-colors"
          >
            Architecture
          </a>
          <a
            href="#dashboard"
            className="hover:text-primary transition-colors"
          >
            Mission Control
          </a>
        </div>

        <div className="text-center md:text-right text-gray-500 font-mono text-[11px]">
          <div>Anvation CSE 2026 Initiative</div>
          <div className="text-gray-600">Built with React, Vite, Tailwind CSS & Framer Motion</div>
        </div>
      </div>
    </footer>
  );
};
