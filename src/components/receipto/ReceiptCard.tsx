import { motion } from "framer-motion";
import { Eye, Store } from "lucide-react";

export type Receipt = {
  id: string; store: string; amount: string; date: string;
  warrantyStatus: "ACTIVE" | "EXPIRING" | "EXPIRED";
};

export function ReceiptCard({ r }: { r: Receipt }) {
  const color =
    r.warrantyStatus === "ACTIVE" ? "#22D3EE" :
    r.warrantyStatus === "EXPIRING" ? "#A855F7" : "#ef4444";
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass relative overflow-hidden rounded-xl p-5 transition-all hover:glow-purple"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded border border-neon-purple/40 p-1.5 text-neon-purple">
            <Store className="h-4 w-4" />
          </div>
          <div>
            <div className="font-display text-sm tracking-widest text-white">{r.store}</div>
            <div className="font-hud text-[10px] tracking-[0.2em] text-white/40">{r.date}</div>
          </div>
        </div>
        <span
          className="rounded border px-2 py-0.5 font-hud text-[9px] tracking-[0.25em]"
          style={{ borderColor: color, color, boxShadow: `0 0 10px ${color}55` }}
        >
          {r.warrantyStatus}
        </span>
      </div>
      <div className="mt-5 flex items-end justify-between">
        <div className="font-display text-2xl text-neon-cyan text-glow-cyan">{r.amount}</div>
        <button className="flex items-center gap-1 rounded border border-white/10 px-3 py-1.5 font-hud text-[10px] tracking-[0.3em] text-white/70 hover:border-neon-cyan hover:text-neon-cyan">
          <Eye className="h-3 w-3" /> VIEW
        </button>
      </div>
    </motion.div>
  );
}