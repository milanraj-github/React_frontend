import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, ScanLine } from "lucide-react";

export type NotifKind = "warning" | "success" | "info";

export function NotificationCard({
  kind, title, time,
}: { kind: NotifKind; title: string; time: string }) {
  const map = {
    warning: { color: "#ef4444", Icon: AlertTriangle, glow: "shadow-[0_0_20px_rgba(239,68,68,0.35)]" },
    success: { color: "#22D3EE", Icon: CheckCircle2, glow: "glow-cyan" },
    info:    { color: "#A855F7", Icon: ScanLine, glow: "glow-purple" },
  }[kind];
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`glass flex items-center gap-3 rounded-xl p-4 ${map.glow}`}
      style={{ borderColor: `${map.color}55` }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-md border"
        style={{ borderColor: map.color, color: map.color }}
      >
        <map.Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="font-hud text-sm tracking-wider text-white">{title}</div>
        <div className="font-hud text-[10px] tracking-[0.3em] text-white/40">{time}</div>
      </div>
    </motion.div>
  );
}