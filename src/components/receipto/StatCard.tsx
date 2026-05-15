import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { HUDCorners } from "./HUDCorners";

export function StatCard({
  label, value, icon: Icon, accent = "purple", suffix = "",
}: {
  label: string; value: number; icon: LucideIcon;
  accent?: "purple" | "cyan"; suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);

  useEffect(() => {
    const controls = animate(mv, value, { duration: 1.5, ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)) });
    return controls.stop;
  }, [value, mv]);

  const color = accent === "cyan" ? "#22D3EE" : "#A855F7";
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`glass relative overflow-hidden rounded-xl p-5 ${
        accent === "cyan" ? "glow-cyan" : "glow-purple"
      }`}
      style={{ borderColor: `${color}33` }}
    >
      <HUDCorners color={color} />
      <div className="flex items-start justify-between">
        <div>
          <div className="font-hud text-[10px] tracking-[0.3em] text-white/50">{label}</div>
          <div className="mt-2 font-display text-3xl font-bold text-white text-glow-white">
            {suffix}{display.toLocaleString()}
          </div>
        </div>
        <div className="rounded-md border p-2" style={{ borderColor: `${color}55`, color }}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}