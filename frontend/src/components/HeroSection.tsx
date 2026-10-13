import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';
import { WordsPullUp } from './WordsPullUp';
import { Navbar } from './Navbar';

interface HeroSectionProps {
  onEnterDashboard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEnterDashboard }) => {
  return (
    <section className="relative w-full h-screen p-4 md:p-6 bg-black overflow-hidden select-none">
      {/* Inset Container with Rounded Corners */}
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black border border-white/[0.08] shadow-[0_0_80px_rgba(0,0,0,0.9)]">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
            type="video/mp4"
          />
        </video>

        {/* Noise Overlay */}
        <div
          className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none z-1"
          aria-hidden="true"
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none z-2"
          aria-hidden="true"
        />

        {/* Floating Hanging Navbar */}
        <Navbar onNavigate={(id) => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* Live Status Badge in Top-Right Corner */}
        <div className="absolute top-4 right-4 md:top-7 md:right-8 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-[#E1E0CC] font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>YOLO11 • ACTIVE TELEMETRY</span>
        </div>

        {/* Bottom-Aligned Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12 lg:p-14 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            {/* Left 8 columns: Giant Heading */}
            <div className="lg:col-span-8 flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-primary/80 font-mono flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-orange-400" />
                  Autonomous Wildfire & Smoke Intelligence
                </span>
              </div>
              <WordsPullUp
                text="TerraFlare"
                showAsterisk={true}
                className="text-[17vw] sm:text-[15vw] md:text-[13vw] lg:text-[11vw] xl:text-[10vw] 2xl:text-[9.5vw] font-medium leading-[0.9] tracking-[-0.05em]"
              />
            </div>

            {/* Right 4 columns: Description Paragraph + CTA Button */}
            <div className="lg:col-span-4 flex flex-col justify-end pb-2 sm:pb-3 lg:pb-4">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2] font-normal"
              >
                TerraFlare is a real-time wildfire and smoke intelligence grid fusing custom-trained YOLO11 computer vision, NASA FIRMS orbital telemetry, secondary CNN verification, and automated emergency dispatch.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="mt-4 sm:mt-6"
              >
                <button
                  onClick={onEnterDashboard}
                  className="bg-primary rounded-full pl-5 pr-2 py-2 sm:pl-6 sm:pr-2.5 sm:py-2.5 text-black font-medium text-sm sm:text-base inline-flex items-center gap-2 group cursor-pointer transition-all duration-300 hover:gap-3 hover:bg-[#eae8d8] shadow-[0_10px_25px_rgba(222,219,200,0.2)]"
                >
                  <span>Launch Mission Control</span>
                  <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
