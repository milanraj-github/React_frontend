import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard, Upload, ReceiptText, ShieldCheck, Bell, Settings, LogOut,
} from "lucide-react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, hash: "" },
  { to: "/dashboard", label: "Upload Receipt", icon: Upload, hash: "#upload" },
  { to: "/dashboard", label: "Saved Receipts", icon: ReceiptText, hash: "#saved" },
  { to: "/dashboard", label: "Warranty Tracker", icon: ShieldCheck, hash: "#warranty" },
  { to: "/dashboard", label: "Notifications", icon: Bell, hash: "#notifications" },
  { to: "/dashboard", label: "Settings", icon: Settings, hash: "#settings" },
];

export function Sidebar() {
  const location = useLocation();
  return (
    <aside className="glass sticky top-0 hidden h-screen w-64 flex-col p-5 lg:flex">
      <div className="mb-10 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-neon-cyan anim-glow" />
        <span className="font-display text-lg tracking-[0.35em] text-white text-glow-purple">
          RECEIPTO
        </span>
      </div>
      <nav className="flex-1 space-y-1">
        {items.map((it) => {
          const active = location.hash === it.hash.replace("#", "") ||
            (it.hash === "" && !location.hash);
          const Icon = it.icon;
          return (
            <Link
              key={it.label}
              to={it.to}
              hash={it.hash.replace("#", "")}
              className={`group flex items-center gap-3 rounded-md border border-transparent px-3 py-2.5 font-hud text-sm tracking-wider transition-all hover:border-neon-purple/40 hover:bg-neon-purple/10 hover:text-white ${
                active ? "border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan glow-cyan" : "text-white/70"
              }`}
            >
              <Icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <Link
        to="/login"
        className="mt-4 flex items-center gap-3 rounded-md border border-white/10 px-3 py-2.5 font-hud text-sm tracking-wider text-white/60 transition-all hover:border-neon-purple hover:text-white"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Link>
    </aside>
  );
}