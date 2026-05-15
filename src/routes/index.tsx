import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Play, ArrowRight } from "lucide-react";
import { FloatingParticles } from "@/components/receipto/FloatingParticles";
import { HUDCorners } from "@/components/receipto/HUDCorners";

export const Route = createFileRoute("/")({
  component: Index,
});

function TopBrand() {
  return (
    <div className="absolute left-6 top-6 z-30 flex items-center gap-2 font-display text-xs tracking-[0.4em] text-neon-cyan text-glow-cyan">
      <span className="h-2 w-2 rounded-full bg-neon-cyan anim-glow" />
      RECEIPTO
    </div>
  );
}

function Scene1() {
  return (
    <motion.section
      key="scene1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="absolute inset-0 hud-grid opacity-40" />
      <FloatingParticles count={50} color="#A855F7" />
      <FloatingParticles count={20} color="#22D3EE" />
      {/* floating receipt cards */}
      {[
        { left: "12%", top: "22%", rotate: -8 },
        { left: "78%", top: "30%", rotate: 10 },
        { left: "20%", top: "70%", rotate: 6 },
        { left: "82%", top: "72%", rotate: -12 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="glass absolute h-20 w-14 rounded-md anim-float"
          style={{ left: p.left, top: p.top, transform: `rotate(${p.rotate}deg)`, animationDelay: `${i * 0.7}s` }}
        >
          <div className="m-2 h-1 w-8 rounded bg-neon-purple/60" />
          <div className="m-2 h-1 w-6 rounded bg-white/30" />
          <div className="m-2 h-1 w-7 rounded bg-white/20" />
        </motion.div>
      ))}
      <motion.h1
        className="font-display anim-glitch px-6 text-center text-3xl font-bold text-white text-glow-purple md:text-6xl"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        Every receipt tells a story…
      </motion.h1>
    </motion.section>
  );
}

function Scene2() {
  return (
    <motion.section
      key="scene2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <FloatingParticles count={35} color="#22D3EE" />
      {/* horizontal cyan light streaks */}
      {[20, 45, 65, 85].map((t) => (
        <motion.div
          key={t}
          className="absolute left-0 right-0 h-px"
          style={{ top: `${t}%`, background: "linear-gradient(90deg, transparent, #22D3EE, transparent)" }}
          animate={{ opacity: [0.2, 0.9, 0.2], scaleX: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, delay: t * 0.02 }}
        />
      ))}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: [0.95, 1.03, 0.97], opacity: 1 }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="glass relative w-72 rounded-xl p-6 glow-purple"
      >
        <HUDCorners color="#A855F7" />
        <div className="mb-3 text-center font-display text-sm tracking-[0.3em] text-neon-purple text-glow-purple">
          RECEIPTO MART
        </div>
        <div className="space-y-2 font-hud text-sm text-white/80">
          <Row k="COFFEE" v="$4.50" />
          <Row k="PASTRY" v="$3.25" />
          <Row k="TAX" v="$0.62" />
          <div className="my-2 border-t border-white/10" />
          <Row k="TOTAL" v="$8.37" highlight />
        </div>
      </motion.div>
    </motion.section>
  );
}

function Row({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className={`flex justify-between ${highlight ? "text-neon-cyan text-glow-cyan" : ""}`}>
      <span>{k}</span>
      <span>{v}</span>
    </div>
  );
}

function Scene3({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.section
      key="scene3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6"
    >
      <div className="absolute inset-0 hud-grid opacity-30" />
      <FloatingParticles count={45} color="#A855F7" />
      <FloatingParticles count={25} color="#22D3EE" />

      <motion.h1
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="font-display text-6xl font-black tracking-[0.25em] text-white text-glow-purple md:text-8xl"
      >
        RECEIPTO
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-4 font-hud text-sm tracking-[0.6em] text-neon-cyan text-glow-cyan md:text-base"
      >
        STORE • TRACK • ANALYZE
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-4"
      >
        <button
          onClick={onEnter}
          className="glass group relative flex items-center gap-2 rounded-md border-neon-purple px-7 py-3 font-hud text-sm tracking-[0.3em] text-white transition-all hover:glow-purple"
          style={{ borderWidth: 1 }}
        >
          GET STARTED
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
        <button
          className="glass-cyan flex items-center gap-2 rounded-md border-neon-cyan px-7 py-3 font-hud text-sm tracking-[0.3em] text-white transition-all hover:glow-cyan"
          style={{ borderWidth: 1 }}
        >
          <Play className="h-4 w-4" />
          WATCH TRAILER
        </button>
      </motion.div>

      <div className="absolute bottom-6 left-0 right-0 text-center font-hud text-[10px] tracking-[0.4em] text-white/40">
        © Tech Explorers
      </div>
    </motion.section>
  );
}

function Index() {
  const [scene, setScene] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const t1 = setTimeout(() => setScene(2), 4500);
    const t2 = setTimeout(() => setScene(3), 9000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0D0D0D]">
      <TopBrand />
      <AnimatePresence mode="wait">
        {scene === 1 && <Scene1 />}
        {scene === 2 && <Scene2 />}
        {scene === 3 && <Scene3 onEnter={() => navigate({ to: "/login" })} />}
      </AnimatePresence>
    </main>
  );
}
