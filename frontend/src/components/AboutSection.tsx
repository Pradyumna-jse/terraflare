import React from 'react';
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle';
import { ScrollRevealParagraph } from './AnimatedLetter';
import { ShieldAlert, Zap, Radio, Cpu } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const headingSegments = [
    {
      text: "We engineered TerraFlare,",
      className: "font-normal text-[#E1E0CC]",
    },
    {
      text: "an autonomous wildfire defense grid.",
      className: "font-serif italic text-primary tracking-normal",
    },
    {
      text: "Unifying edge YOLO11 inference, NASA FIRMS orbital telemetry, and multimodal risk synthesis.",
      className: "font-normal text-[#E1E0CC]",
    },
  ];

  const bodyText =
    "Over extensive engineering phases and real-world validation, TerraFlare resolves the critical latency bottleneck in wildfire containment. Combining sub-millisecond edge computer vision with real-time NASA FIRMS thermal anomaly satellites, secondary CNN false-positive filters, and Grad-CAM heatmaps, our architecture suppresses misleading sun glare and dust plumes, instantaneously dispatching emergency SMTP photographic alerts and audible sirens to command centers worldwide.";

  return (
    <section id="about" className="bg-black py-24 sm:py-32 px-4 md:px-6 relative">
      <div className="max-w-6xl mx-auto bg-[#101010] rounded-2xl md:rounded-[2.5rem] p-8 sm:p-14 md:p-20 text-center border border-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />

        {/* Small Top Label */}
        <div className="mb-6 sm:mb-8">
          <span className="text-primary text-[10px] sm:text-xs tracking-[0.25em] uppercase font-mono px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Autonomous Planetary Defense
          </span>
        </div>

        {/* Multi-Style Main Heading */}
        <div className="max-w-4xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] sm:leading-[0.9] mb-10 sm:mb-14">
          <WordsPullUpMultiStyle segments={headingSegments} />
        </div>

        {/* Scroll-Linked Character Opacity Body Paragraph */}
        <div className="max-w-3xl mx-auto">
          <ScrollRevealParagraph
            text={bodyText}
            className="text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed tracking-wide"
          />
        </div>

        {/* System Capability Badges */}
        <div className="mt-14 sm:mt-16 pt-10 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-2 text-primary text-xs font-mono mb-1">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>LATENCY</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#E1E0CC]">~24ms</div>
            <div className="text-gray-500 text-xs mt-1">Real-time edge frame processing</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-2 text-primary text-xs font-mono mb-1">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>PRECISION</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#E1E0CC]">77.0%</div>
            <div className="text-gray-500 text-xs mt-1">YOLO11 custom weights on fire/smoke</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-2 text-primary text-xs font-mono mb-1">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>NASA FIRMS</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#E1E0CC]">VIIRS + MODIS</div>
            <div className="text-gray-500 text-xs mt-1">Orbital satellite cross-verification</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-2 text-primary text-xs font-mono mb-1">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>SECURITY</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#E1E0CC]">Autonomous</div>
            <div className="text-gray-500 text-xs mt-1">Instant SMTP snapshots & sirens</div>
          </div>
        </div>
      </div>
    </section>
  );
};
