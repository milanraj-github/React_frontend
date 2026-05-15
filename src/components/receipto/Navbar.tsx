import { Bell, Search } from "lucide-react";

export function Navbar() {
  return (
    <header className="glass sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-neon-purple/20 px-6 py-3">
      <div>
        <div className="font-hud text-[10px] tracking-[0.4em] text-neon-cyan">WELCOME BACK</div>
        <div className="font-display text-base tracking-widest text-white text-glow-white">
          ANALYST
        </div>
      </div>
      <div className="relative hidden flex-1 max-w-md md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neon-cyan" />
        <input
          placeholder="Search receipts, warranties..."
          className="w-full rounded-md border border-white/10 bg-black/40 py-2 pl-9 pr-3 font-hud text-sm text-white placeholder:text-white/30 outline-none focus:border-neon-cyan focus:glow-cyan"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-md border border-white/10 p-2 text-white/80 transition-all hover:border-neon-purple hover:text-neon-purple">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-neon-cyan anim-glow" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neon-purple bg-neon-purple/20 font-display text-sm text-white glow-purple">
          R
        </div>
      </div>
    </header>
  );
}