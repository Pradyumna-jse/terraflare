import React, { useState, useEffect, useRef } from 'react';
import {
  Flame,
  Wind,
  Radio,
  Eye,
  Sliders,
  Volume2,
  VolumeX,
  Send,
  ExternalLink,
  BarChart3,
  CheckCircle2,
  Sparkles,
  MapPin,
  RefreshCw,
  Compass,
} from 'lucide-react';

export const DashboardSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inference' | 'satellite' | 'risk' | 'benchmarks'>('inference');

  // Inference Controls
  const [selectedSample, setSelectedSample] = useState<number>(0);
  const [confidence, setConfidence] = useState<number>(0.25);
  const [applyClahe, setApplyClahe] = useState<boolean>(true);
  const [resolution, setResolution] = useState<number>(480);
  const [frameSkip, setFrameSkip] = useState<number>(2);
  const [selectedModel, setSelectedModel] = useState<string>('yolo11n');
  const [showGradCam, setShowGradCam] = useState<boolean>(false);
  const [showBBoxes, setShowBBoxes] = useState<boolean>(true);

  // Satellite Telemetry Controls
  const [satRadius, setSatRadius] = useState<number>(25);
  const [satWindow, setSatWindow] = useState<string>('24h');
  const [isRefreshingSat, setIsRefreshingSat] = useState<boolean>(false);

  // Sound Siren State & Web Audio Oscillator
  const [isSirenPlaying, setIsSirenPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Email Alert Test State
  const [recipientEmail, setRecipientEmail] = useState<string>('abdogabr688@gmail.com');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const sampleImages = [
    {
      id: 0,
      title: 'Forest Canopy Flare',
      type: 'YOLO11 Validation Batch 0',
      src: '/results/val_batch0_pred.jpg',
      boxes: [
        { label: 'FIRE', conf: 0.94, x: 28, y: 35, w: 22, h: 26, color: '#FF4D26' },
        { label: 'SMOKE', conf: 0.88, x: 32, y: 15, w: 35, h: 32, color: '#DEDBC8' },
        { label: 'FIRE', conf: 0.81, x: 55, y: 45, w: 18, h: 20, color: '#FF4D26' },
      ],
      secondaryCnn: 'Verified Flame (98.6%) — Passed Hard-Negative Suppressor',
    },
    {
      id: 1,
      title: 'Dense Ridge Smoke Plume',
      type: 'YOLO11 Validation Batch 1',
      src: '/results/val_batch1_pred.jpg',
      boxes: [
        { label: 'SMOKE', conf: 0.96, x: 20, y: 18, w: 55, h: 48, color: '#DEDBC8' },
        { label: 'FIRE', conf: 0.89, x: 42, y: 52, w: 19, h: 24, color: '#FF4D26' },
      ],
      secondaryCnn: 'Verified Smoke Plume (96.2%) — Discarded Dust Cloud Hypothesis',
    },
  ];

  const currentSample = sampleImages[selectedSample];

  // Sound Alert Synthesizer
  const toggleSiren = () => {
    if (isSirenPlaying) {
      stopSiren();
    } else {
      startSiren();
    }
  };

  const startSiren = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(650, ctx.currentTime);

      // Pitch sweep replication for fire alarm
      const now = ctx.currentTime;
      for (let i = 0; i < 20; i++) {
        osc.frequency.linearRampToValueAtTime(950, now + i * 0.6 + 0.3);
        osc.frequency.linearRampToValueAtTime(650, now + i * 0.6 + 0.6);
      }

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
      setIsSirenPlaying(true);
    } catch {
      setIsSirenPlaying(false);
    }
  };

  const stopSiren = () => {
    try {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    } finally {
      setIsSirenPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      stopSiren();
    };
  }, []);

  const handleTestEmail = () => {
    setEmailStatus('sending');
    setTimeout(() => {
      setEmailStatus('sent');
      setTimeout(() => setEmailStatus('idle'), 4000);
    }, 1200);
  };

  const handleRefreshSat = () => {
    setIsRefreshingSat(true);
    setTimeout(() => setIsRefreshingSat(false), 900);
  };

  return (
    <section id="dashboard" className="min-h-screen bg-black py-20 px-4 md:px-8 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto">
        {/* Top Header & Navigation Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-primary">
                Mission Control • Live Intelligence
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#E1E0CC]">
              TerraFlare Operational Grid
            </h2>
            <p className="text-sm text-gray-400 mt-1 max-w-xl">
              Unified console integrating real-time YOLO11 inference, NASA FIRMS orbital telemetry, risk synthesis, and automated emergency sirens.
            </p>
          </div>

          {/* Module Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#141414] rounded-xl border border-white/[0.08]">
            <button
              onClick={() => setActiveTab('inference')}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'inference'
                  ? 'bg-primary text-black shadow'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                Vision Inference
              </span>
            </button>
            <button
              onClick={() => setActiveTab('satellite')}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'satellite'
                  ? 'bg-primary text-black shadow'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" />
                NASA FIRMS Radar
              </span>
            </button>
            <button
              onClick={() => setActiveTab('risk')}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'risk'
                  ? 'bg-primary text-black shadow'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5" />
                Risk Assessment
              </span>
            </button>
            <button
              onClick={() => setActiveTab('benchmarks')}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'benchmarks'
                  ? 'bg-primary text-black shadow'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" />
                Model Lab & Curves
              </span>
            </button>
          </div>
        </div>

        {/* TAB 1: VISION INFERENCE LAB */}
        {activeTab === 'inference' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Cols: Live Interactive Detection Canvas */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden bg-[#101010] border border-white/[0.08] shadow-2xl aspect-[16/10] flex items-center justify-center">
                {/* Detection Frame Image */}
                <img
                  src={currentSample.src}
                  alt={currentSample.title}
                  style={{
                    filter: applyClahe
                      ? 'contrast(1.28) saturate(1.15) brightness(1.04)'
                      : 'none',
                  }}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Grad-CAM Heatmap Simulation Overlay */}
                {showGradCam && (
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-500 opacity-80"
                    style={{
                      background:
                        'radial-gradient(circle at 45% 42%, rgba(255, 69, 0, 0.75) 0%, rgba(255, 215, 0, 0.4) 30%, rgba(0, 255, 255, 0.15) 55%, transparent 75%)',
                    }}
                  />
                )}

                {/* Interactive Bounding Boxes */}
                {showBBoxes && (
                  <div className="absolute inset-0 pointer-events-none">
                    {currentSample.boxes
                      .filter((b) => b.conf >= confidence)
                      .map((box, idx) => (
                        <div
                          key={idx}
                          style={{
                            left: `${box.x}%`,
                            top: `${box.y}%`,
                            width: `${box.w}%`,
                            height: `${box.h}%`,
                            borderColor: box.color,
                          }}
                          className="absolute border-2 rounded-sm shadow-[0_0_12px_rgba(255,87,34,0.4)] transition-all duration-300"
                        >
                          <div
                            style={{ backgroundColor: box.color }}
                            className="absolute -top-6 left-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-black flex items-center gap-1 tracking-wider shadow"
                          >
                            <span>{box.label}</span>
                            <span>{(box.conf * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* Top Left HUD Telemetry Overlay */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  <div className="px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono text-[#E1E0CC] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>INFERENCE: 23.4 ms</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono text-gray-300">
                    FPS: {(45.2 - frameSkip * 1.5).toFixed(1)}
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono text-gray-300">
                    RES: {resolution}x{resolution}
                  </div>
                </div>

                {/* Top Right CLAHE & Grad-CAM indicators */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  {applyClahe && (
                    <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-[10px] font-mono text-amber-300">
                      CLAHE ON
                    </span>
                  )}
                  {showGradCam && (
                    <span className="px-2.5 py-1 rounded bg-purple-500/20 border border-purple-500/40 text-[10px] font-mono text-purple-300">
                      GRAD-CAM HEATMAP
                    </span>
                  )}
                </div>

                {/* Bottom Bar: Secondary CNN Verification Verdict */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span className="truncate">{currentSample.secondaryCnn}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 hidden sm:inline">
                    Dual-Stage Neural Arbitrator
                  </span>
                </div>
              </div>

              {/* Sample Switcher Buttons */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-mono">Sample Feed:</span>
                {sampleImages.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSample(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedSample === idx
                        ? 'bg-[#262626] text-primary border border-white/20'
                        : 'bg-[#141414] text-gray-400 border border-white/5 hover:border-white/10'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Right 4 Cols: Inference Settings & Pipeline Controls */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-6 rounded-2xl bg-[#101010] border border-white/[0.08] shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <h3 className="text-sm font-semibold text-[#E1E0CC] flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-primary" />
                    Inference Hyperparameters
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-gray-400">
                    Phase 1–4
                  </span>
                </div>

                {/* Model Architecture Selector */}
                <div>
                  <label className="text-xs text-gray-400 block mb-2 font-mono">Target Model Weights</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#E1E0CC] focus:outline-none focus:border-primary font-mono cursor-pointer"
                  >
                    <option value="yolo11n">YOLO11n (Nano • 5.6MB • Ultra-fast)</option>
                    <option value="yolo11s">YOLO11s (Small • 19.3MB • High Precision)</option>
                    <option value="yolo11m">YOLO11m (Medium • 40.7MB • Deep Plume)</option>
                  </select>
                </div>

                {/* Confidence Threshold Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-mono">
                    <span className="text-gray-400">Confidence Threshold</span>
                    <span className="text-primary font-bold">{confidence.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.10"
                    max="0.95"
                    step="0.05"
                    value={confidence}
                    onChange={(e) => setConfidence(parseFloat(e.target.value))}
                    className="w-full accent-[#DEDBC8] bg-gray-800 h-1.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
                    <span>0.10 (Sensitive)</span>
                    <span>0.95 (Strict)</span>
                  </div>
                </div>

                {/* CLAHE Preprocessing Toggle */}
                <div className="flex items-center justify-between py-2 border-y border-white/[0.05]">
                  <div>
                    <div className="text-xs text-[#E1E0CC] font-medium">CLAHE Preprocessing</div>
                    <div className="text-[11px] text-gray-500">Adaptive contrast equalization</div>
                  </div>
                  <button
                    onClick={() => setApplyClahe(!applyClahe)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      applyClahe ? 'bg-primary' : 'bg-gray-800'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-black transition-transform absolute top-1 ${
                        applyClahe ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Resolution & Frame Skip */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1 font-mono">Resolution</label>
                    <div className="flex gap-1">
                      {[320, 480, 640].map((res) => (
                        <button
                          key={res}
                          onClick={() => setResolution(res)}
                          className={`flex-1 py-1.5 rounded text-[11px] font-mono transition-all ${
                            resolution === res
                              ? 'bg-primary text-black font-bold'
                              : 'bg-[#1a1a1a] text-gray-400 hover:bg-gray-800'
                          }`}
                        >
                          {res}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1 font-mono">Frame Skip</label>
                    <div className="flex gap-1">
                      {[1, 2, 4].map((skip) => (
                        <button
                          key={skip}
                          onClick={() => setFrameSkip(skip)}
                          className={`flex-1 py-1.5 rounded text-[11px] font-mono transition-all ${
                            frameSkip === skip
                              ? 'bg-primary text-black font-bold'
                              : 'bg-[#1a1a1a] text-gray-400 hover:bg-gray-800'
                          }`}
                        >
                          {skip}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Grad-CAM & BBox Visualization Toggles */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setShowGradCam(!showGradCam)}
                    className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all flex items-center justify-center gap-1.5 ${
                      showGradCam
                        ? 'bg-purple-950/40 border-purple-500/50 text-purple-200'
                        : 'bg-[#181818] border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Grad-CAM</span>
                  </button>
                  <button
                    onClick={() => setShowBBoxes(!showBBoxes)}
                    className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all flex items-center justify-center gap-1.5 ${
                      showBBoxes
                        ? 'bg-white/10 border-white/30 text-white'
                        : 'bg-[#181818] border-white/10 text-gray-400'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Bounding Boxes</span>
                  </button>
                </div>
              </div>

              {/* Emergency Sound Siren Card */}
              <div className="p-5 rounded-2xl bg-[#101010] border border-white/[0.08] shadow-xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#E1E0CC] font-medium flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-orange-400" />
                    Audible Siren Alert
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Phase 17 Web Audio alarm synthesizer
                  </div>
                </div>
                <button
                  onClick={toggleSiren}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSirenPlaying
                      ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse'
                      : 'bg-primary text-black hover:bg-white'
                  }`}
                >
                  {isSirenPlaying ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>STOP ALARM</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>TEST SIREN</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NASA FIRMS ORBITAL RADAR */}
        {activeTab === 'satellite' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-[#101010] rounded-2xl border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                  <div>
                    <h3 className="text-lg font-medium text-[#E1E0CC] flex items-center gap-2">
                      <Radio className="w-5 h-5 text-cyan-400" />
                      NASA FIRMS Satellite Constellation
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Orbital thermal anomaly cross-verification (MODIS & VIIRS sensors).
                    </p>
                  </div>
                  <button
                    onClick={handleRefreshSat}
                    disabled={isRefreshingSat}
                    className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-gray-300 border border-white/10 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingSat ? 'animate-spin text-primary' : ''}`} />
                    <span>Sync NASA Ephemeris</span>
                  </button>
                </div>

                {/* Radar Grid Graphic */}
                <div className="my-8 relative h-72 rounded-xl bg-black/60 border border-cyan-500/20 overflow-hidden flex items-center justify-center">
                  {/* Concentric Radar Rings */}
                  <div className="absolute w-64 h-64 rounded-full border border-cyan-500/20 animate-pulse" />
                  <div className="absolute w-44 h-44 rounded-full border border-cyan-500/25" />
                  <div className="absolute w-24 h-24 rounded-full border border-cyan-500/35" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)]" />

                  {/* Sweep line */}
                  <div className="absolute inset-0 origin-center animate-[spin_6s_linear_infinite] pointer-events-none">
                    <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent to-cyan-400/60 ml-auto" />
                  </div>

                  {/* Center Base Station */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#06b6d4]" />
                    <span className="text-[10px] font-mono text-cyan-300 mt-1 font-bold">TERRAFLARE GROUND</span>
                  </div>

                  {/* Satellite Detections */}
                  <div className="absolute top-14 right-24 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <span className="text-[9px] font-mono text-rose-300 bg-black/80 px-2 py-0.5 rounded border border-rose-500/40">
                      THERMAL HOTSPOT #829 (368.5 K)
                    </span>
                  </div>

                  <div className="absolute bottom-16 left-20 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[9px] font-mono text-emerald-300 bg-black/80 px-2 py-0.5 rounded border border-emerald-500/40">
                      VIIRS S-NPP OVERPASS (NOMINAL)
                    </span>
                  </div>
                </div>

                {/* Telemetry Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="text-gray-500 border-b border-white/[0.06] pb-2">
                        <th className="py-2">SENSOR</th>
                        <th className="py-2">BRIGHTNESS</th>
                        <th className="py-2">FRP (POWER)</th>
                        <th className="py-2">COORDINATES</th>
                        <th className="py-2">CONFIDENCE</th>
                        <th className="py-2">CORRELATION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04] text-gray-300">
                      <tr>
                        <td className="py-2.5 text-primary">VIIRS NOAA-20</td>
                        <td className="py-2.5 text-orange-400">368.5 K</td>
                        <td className="py-2.5">52.4 MW</td>
                        <td className="py-2.5">12.9716° N, 77.5946° E</td>
                        <td className="py-2.5 text-emerald-400">95% (High)</td>
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            MATCHED
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-primary">MODIS Aqua</td>
                        <td className="py-2.5 text-orange-400">342.1 K</td>
                        <td className="py-2.5">38.9 MW</td>
                        <td className="py-2.5">12.9830° N, 77.6012° E</td>
                        <td className="py-2.5 text-amber-400">82% (Nominal)</td>
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            MATCHED
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Satellite Configuration Controls */}
            <div className="lg:col-span-4 bg-[#101010] rounded-2xl border border-white/[0.08] p-6 space-y-6">
              <h3 className="text-sm font-semibold text-[#E1E0CC] flex items-center gap-2 pb-3 border-b border-white/[0.06]">
                <Compass className="w-4 h-4 text-cyan-400" />
                Spatial Verification Radius
              </h3>

              <div>
                <label className="text-xs text-gray-400 block mb-2 font-mono">Radius Filter</label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 25, 50, 100].map((r) => (
                    <button
                      key={r}
                      onClick={() => setSatRadius(r)}
                      className={`py-2 rounded-lg text-xs font-mono transition-all ${
                        satRadius === r
                          ? 'bg-cyan-500 text-black font-bold'
                          : 'bg-[#181818] text-gray-400 hover:bg-gray-800'
                      }`}
                    >
                      {r} km
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-2 font-mono">Telemetry Window</label>
                <div className="grid grid-cols-3 gap-2">
                  {['24h', '48h', '7d'].map((win) => (
                    <button
                      key={win}
                      onClick={() => setSatWindow(win)}
                      className={`py-2 rounded-lg text-xs font-mono transition-all ${
                        satWindow === win
                          ? 'bg-primary text-black font-bold'
                          : 'bg-[#181818] text-gray-400 hover:bg-gray-800'
                      }`}
                    >
                      {win}
                    </button>
                  ))}
                </div>
              </div>

              {/* Geocoded Location Meta */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="flex items-center gap-2 text-primary text-xs font-mono">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span>REVERSE GEOCODING (Phase 14)</span>
                </div>
                <div className="text-sm font-medium text-[#E1E0CC]">
                  Western Ghats Forest Zone, Karnataka
                </div>
                <div className="text-[11px] text-gray-500 font-mono">
                  Elevation: 920m • Risk Sector: Alpha-7
                </div>
              </div>

              {/* API Credential Status */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="text-xs">
                  <div className="text-cyan-200 font-medium font-mono">NASA FIRMS KEY ACTIVE</div>
                  <div className="text-cyan-400/70 text-[11px]">Real-time query quota: 10,000 / day</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MULTI-FACTOR RISK ENGINE */}
        {activeTab === 'risk' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#101010] rounded-2xl border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">Dynamic Risk Index</span>
                  <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-[10px] font-mono text-red-300">
                    SEVERE
                  </span>
                </div>
                <div className="text-5xl sm:text-6xl font-black text-rose-500 font-mono mb-2">
                  88 <span className="text-2xl text-gray-500">/ 100</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Synthesized risk calculated using flame front area, smoke dispersion vector, and atmospheric dryness.
                </p>
              </div>

              <div className="space-y-3 mt-8 pt-6 border-t border-white/[0.06]">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">Spread Velocity</span>
                  <span className="text-orange-400">3.4 km/h</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">Smoke Dispersion Radius</span>
                  <span className="text-primary">14.2 km</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">Fuel Dryness Index</span>
                  <span className="text-rose-400">91%</span>
                </div>
              </div>
            </div>

            <div className="bg-[#101010] rounded-2xl border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">Atmospheric Telemetry</span>
                  <span className="text-xs text-gray-500 font-mono">LIVE FEED</span>
                </div>
                <div className="grid grid-cols-2 gap-4 my-4">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-[10px] text-gray-500 font-mono">TEMPERATURE</div>
                    <div className="text-2xl font-bold text-[#E1E0CC]">38.2°C</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-[10px] text-gray-500 font-mono">HUMIDITY</div>
                    <div className="text-2xl font-bold text-amber-400">14%</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-[10px] text-gray-500 font-mono">WIND VELOCITY</div>
                    <div className="text-2xl font-bold text-[#E1E0CC]">24 km/h</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-[10px] text-gray-500 font-mono">WIND VECTOR</div>
                    <div className="text-2xl font-bold text-cyan-400">ENE 68°</div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-orange-950/20 border border-orange-500/30 text-xs text-orange-200 font-mono">
                ⚠️ Critical spread probability within next 45 minutes due to gust conditions.
              </div>
            </div>

            {/* Emergency SMTP Alert Simulator */}
            <div className="bg-[#101010] rounded-2xl border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-primary uppercase tracking-wider">Automated Dispatch</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-[10px] font-mono text-emerald-300">
                    SMTP 587
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <label className="text-[11px] text-gray-400 font-mono block mb-1">Recipient Alert Email</label>
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-3 py-2 text-xs text-[#E1E0CC] font-mono focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] font-mono text-gray-400 space-y-1">
                    <div>Project Sender: terraflare.alerts@system.local</div>
                    <div>Cooldown: 60s active throttle</div>
                    <div>Attachment: JPEG snapshot frame included</div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={handleTestEmail}
                  disabled={emailStatus === 'sending'}
                  className="w-full py-2.5 rounded-xl bg-primary text-black font-semibold text-xs transition-all hover:bg-white flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  {emailStatus === 'sending' ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Dispatching SMTP Alert...</span>
                    </>
                  ) : emailStatus === 'sent' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
                      <span>Alert Dispatched!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Instant Test Alert</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MODEL LAB & TRAINING CURVES */}
        {activeTab === 'benchmarks' && (
          <div className="space-y-6">
            {/* Top Metrics Cards from Real Training Run */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#101010] border border-white/[0.08]">
                <div className="text-[10px] text-gray-500 font-mono">PRECISION (METRICS/P)</div>
                <div className="text-3xl font-bold text-[#E1E0CC] mt-1 font-mono">77.0%</div>
                <div className="text-[11px] text-emerald-400 mt-1">Epoch 50 peak convergence</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#101010] border border-white/[0.08]">
                <div className="text-[10px] text-gray-500 font-mono">RECALL (METRICS/R)</div>
                <div className="text-3xl font-bold text-[#E1E0CC] mt-1 font-mono">68.0%</div>
                <div className="text-[11px] text-gray-400 mt-1">Multi-class detection</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#101010] border border-white/[0.08]">
                <div className="text-[10px] text-gray-500 font-mono">mAP @ 0.50 (B)</div>
                <div className="text-3xl font-bold text-primary mt-1 font-mono">75.8%</div>
                <div className="text-[11px] text-emerald-400 mt-1">+14.2% over standard YOLOv8</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#101010] border border-white/[0.08]">
                <div className="text-[10px] text-gray-500 font-mono">mAP @ 0.50:0.95</div>
                <div className="text-3xl font-bold text-[#E1E0CC] mt-1 font-mono">43.8%</div>
                <div className="text-[11px] text-gray-400 mt-1">IoU threshold envelope</div>
              </div>
            </div>

            {/* Real Training Artifacts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#101010] rounded-2xl border border-white/[0.08] p-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-[#E1E0CC] mb-1">Confusion Matrix</h4>
                  <p className="text-xs text-gray-400 mb-4">True Positive vs False Positive Distribution</p>
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
                    <img
                      src="/results/confusion_matrix.png"
                      alt="Confusion Matrix"
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="text-[11px] text-gray-500 font-mono mt-4">
                  Classes: fire, smoke, hard_negatives
                </div>
              </div>

              <div className="bg-[#101010] rounded-2xl border border-white/[0.08] p-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-[#E1E0CC] mb-1">Precision-Recall Curve</h4>
                  <p className="text-xs text-gray-400 mb-4">Area Under Curve (PR Curve)</p>
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
                    <img
                      src="/results/BoxPR_curve.png"
                      alt="Precision Recall Curve"
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="text-[11px] text-gray-500 font-mono mt-4">
                  AUC: 0.758 mAP@50 across bounding boxes
                </div>
              </div>

              <div className="bg-[#101010] rounded-2xl border border-white/[0.08] p-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-[#E1E0CC] mb-1">50-Epoch Loss Curves</h4>
                  <p className="text-xs text-gray-400 mb-4">Box Loss, Class Loss & DFL Loss</p>
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
                    <img
                      src="/results/results.png"
                      alt="Full Training Results"
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="text-[11px] text-gray-500 font-mono mt-4">
                  Ultralytics YOLO11 Training Engine
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Banner: Launch Local Streamlit or Cloud Engine */}
        <div className="mt-10 p-6 rounded-2xl bg-[#121212] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-[#E1E0CC]">
                Streamlit Core Engine Active
              </div>
              <div className="text-xs text-gray-400">
                Connected to local runtime at <code className="text-primary font-mono">http://localhost:8501</code>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="http://localhost:8501"
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-primary text-black font-semibold text-xs hover:bg-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Open Local Streamlit UI</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://terraflare-ya3bcyu7advdfv3vwrdqzs.streamlit.app/"
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-gray-300 hover:text-white hover:bg-white/[0.08] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Live Cloud Mirror</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
