import { motion } from "framer-motion";
import { ShieldCheck, Bell } from "lucide-react";

export type Warranty = {
  id: string; product: string; expiry: string; remainingDays: number; totalDays: number;
};

export function WarrantyCard({ w }: { w: Warranty }) {
  const status =
    w.remainingDays <= 0 ? "EXPIRED" :
    w.remainingDays <= 30 ? "EXPIRING SOON" : "ACTIVE";
  const color =
    status === "ACTIVE" ? "#22D3EE" :
    status === "EXPIRING SOON" ? "#A855F7" : "#ef4444";
  const pct = Math.max(0, Math.min(100, (w.remainingDays / w.totalDays) * 100));

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="glass relative overflow-hidden rounded-xl p-5"
      style={{ borderColor: `${color}33` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" style={{ color }} />
          <div className="font-display text-sm tracking-widest text-white">{w.product}</div>
        </div>
        <Bell className="h-4 w-4 text-white/40 hover:text-neon-cyan" />
      </div>
      <div className="mt-3 flex justify-between font-hud text-[10px] tracking-[0.3em] text-white/50">
        <span>EXPIRES {w.expiry}</span>
        <span style={{ color }}>{w.remainingDays}d LEFT</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full rounded-full anim-glow"
          style={{ background: color, boxShadow: `0 0 12px ${color}` }}
        />
      </div>
      <div className="mt-3 font-hud text-[10px] tracking-[0.3em]" style={{ color }}>
        STATUS · {status}
      </div>
    </motion.div>
  );
}