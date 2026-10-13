import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle';

interface FeaturesSectionProps {
  onSelectFeature?: (featureId: string) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onSelectFeature }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const headerLine1 = [
    {
      text: 'Mission-critical architectures for planetary defense.',
      className: 'text-primary font-normal',
    },
  ];

  const headerLine2 = [
    {
      text: 'Built for instant detection. Powered by orbital telemetry.',
      className: 'text-gray-500 font-normal',
    },
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: custom * 0.15,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section id="features" className="min-h-screen bg-black py-24 sm:py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Subtle Background Noise */}
      <div
        className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-14 md:mb-20 space-y-2">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            <WordsPullUpMultiStyle segments={headerLine1} />
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            <WordsPullUpMultiStyle segments={headerLine2} delay={0.2} />
          </div>
        </div>

        {/* 4-Column Card Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-2 lg:h-[480px]"
        >
          {/* Card 1 - Video Card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative rounded-2xl overflow-hidden min-h-[380px] lg:min-h-full border border-white/[0.08] shadow-2xl flex flex-col justify-between group"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
            >
              <source
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
                type="video/mp4"
              />
            </video>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 z-1" />

            {/* Top Badge */}
            <div className="relative z-10 p-5 flex justify-between items-center">
              <span className="text-[10px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-primary/80 border border-white/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Feed
              </span>
              <span className="text-[11px] font-mono text-gray-400">CAM-01</span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 p-6">
              <h3
                style={{ color: '#E1E0CC' }}
                className="text-lg sm:text-xl font-medium tracking-tight mb-1"
              >
                Real-time edge surveillance.
              </h3>
              <p className="text-xs text-gray-400">
                Continuous frame inspection with CLAHE contrast enhancement and sub-45ms inference latency.
              </p>
            </div>
          </motion.div>

          {/* Card 2 - YOLO11 Inference (01) */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="bg-[#212121] rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/[0.06] hover:border-white/20 transition-all duration-300 shadow-xl group min-h-[380px] lg:min-h-full"
          >
            <div>
              {/* Top Image Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden mb-6 border border-white/10 bg-black/40">
                <img
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
                  alt="Inference Pipeline Icon"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title with Number */}
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="text-base sm:text-lg font-medium text-[#E1E0CC] tracking-tight">
                  Real-Time YOLO11 Inference.
                </h3>
                <span className="text-xs font-mono text-gray-500">(01)</span>
              </div>

              {/* 4 Checklist Items */}
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-400 leading-snug">
                    Custom-trained YOLO11 weights on fire and smoke plumes.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-400 leading-snug">
                    Dynamic resolution scaling (320px to 640px) & frame-skipping.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-400 leading-snug">
                    CLAHE equalization for night-time & low-light wildfire scenes.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-400 leading-snug">
                    77.0% precision with 75.8% mAP50 benchmark performance.
                  </span>
                </li>
              </ul>
            </div>

            {/* Learn More Button */}
            <div className="pt-6 border-t border-white/[0.08] mt-4">
              <button
                onClick={() => onSelectFeature?.('inference')}
                className="text-xs font-medium text-[#E1E0CC] hover:text-primary transition-colors flex items-center justify-between w-full group/btn"
              >
                <span>Launch inference simulator</span>
                <ArrowRight className="w-4 h-4 text-primary transform -rotate-45 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 3 - Secondary CNN & Grad-CAM (02) */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="bg-[#212121] rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/[0.06] hover:border-white/20 transition-all duration-300 shadow-xl group min-h-[380px] lg:min-h-full"
          >
            <div>
              {/* Top Image Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden mb-6 border border-white/10 bg-black/40">
                <img
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
                  alt="CNN Verifier Icon"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title with Number */}
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="text-base sm:text-lg font-medium text-[#E1E0CC] tracking-tight">
                  Smart CNN & Grad-CAM.
                </h3>
                <span className="text-xs font-mono text-gray-500">(02)</span>
              </div>

              {/* 3 Checklist Items */}
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-400 leading-snug">
                    Secondary CNN verifier suppressing false positive triggers.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-400 leading-snug">
                    Hard-negative discrimination against sunset glare & headlights.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-400 leading-snug">
                    Grad-CAM activation heatmaps explaining neural network focus.
                  </span>
                </li>
              </ul>
            </div>

            {/* Learn More Button */}
            <div className="pt-6 border-t border-white/[0.08] mt-4">
              <button
                onClick={() => onSelectFeature?.('verifier')}
                className="text-xs font-medium text-[#E1E0CC] hover:text-primary transition-colors flex items-center justify-between w-full group/btn"
              >
                <span>Inspect verifier heatmaps</span>
                <ArrowRight className="w-4 h-4 text-primary transform -rotate-45 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </motion.div>

          {/* Card 4 - Orbital Telemetry & Alerts (03) */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="bg-[#212121] rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/[0.06] hover:border-white/20 transition-all duration-300 shadow-xl group min-h-[380px] lg:min-h-full"
          >
            <div>
              {/* Top Image Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden mb-6 border border-white/10 bg-black/40">
                <img
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
                  alt="Orbital Alert Icon"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title with Number */}
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="text-base sm:text-lg font-medium text-[#E1E0CC] tracking-tight">
                  Orbital Telemetry & Alerts.
                </h3>
                <span className="text-xs font-mono text-gray-500">(03)</span>
              </div>

              {/* 3 Checklist Items */}
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-400 leading-snug">
                    NASA FIRMS VIIRS & MODIS satellite anomaly correlation.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-400 leading-snug">
                    Reverse geocoding with exact coordinate locks & spatial radar.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-400 leading-snug">
                    Automated SMTP snapshots dispatch & Web Audio alarm sirens.
                  </span>
                </li>
              </ul>
            </div>

            {/* Learn More Button */}
            <div className="pt-6 border-t border-white/[0.08] mt-4">
              <button
                onClick={() => onSelectFeature?.('alerts')}
                className="text-xs font-medium text-[#E1E0CC] hover:text-primary transition-colors flex items-center justify-between w-full group/btn"
              >
                <span>View orbital telemetry</span>
                <ArrowRight className="w-4 h-4 text-primary transform -rotate-45 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
