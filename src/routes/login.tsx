import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { FloatingParticles } from "@/components/receipto/FloatingParticles";
import { HUDCorners } from "@/components/receipto/HUDCorners";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/dashboard" });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0D0D0D] px-4">
      <div className="absolute inset-0 hud-grid opacity-30" />
      <FloatingParticles count={40} color="#A855F7" />
      <FloatingParticles count={20} color="#22D3EE" />

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="glass relative z-10 w-full max-w-md rounded-2xl p-10 glow-purple"
      >
        <HUDCorners color="#22D3EE" />
        <div className="mb-2 text-center font-hud text-xs tracking-[0.5em] text-neon-cyan text-glow-cyan">
          SECURE SIGN-IN
        </div>
        <h1 className="mb-8 text-center font-display text-3xl font-bold tracking-[0.2em] text-white text-glow-purple">
          RECEIPTO
        </h1>

        <Field icon={<Mail className="h-4 w-4" />} type="email" placeholder="you@company.com"
          value={email} onChange={setEmail} />
        <div className="h-4" />
        <Field icon={<Lock className="h-4 w-4" />} type="password" placeholder="••••••••"
          value={password} onChange={setPassword} />

        <button
          type="submit"
          className="group mt-8 flex w-full items-center justify-center gap-2 rounded-md border border-neon-purple bg-neon-purple/10 py-3 font-hud text-sm tracking-[0.3em] text-white transition-all hover:bg-neon-purple/25 hover:glow-purple"
        >
          SIGN IN
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>

        <p className="mt-6 text-center font-hud text-[10px] tracking-[0.3em] text-white/40">
          SECURE ACCESS 
        </p>
      </motion.form>
    </main>
  );
}

function Field({
  icon, type, placeholder, value, onChange,
}: {
  icon: React.ReactNode; type: string; placeholder: string;
  value: string; onChange: (v: string) => void;
}) {
  return (
    <label className="group relative block">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neon-cyan">
        {icon}
      </span>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-white/10 bg-black/40 py-3 pl-10 pr-4 font-hud text-sm tracking-wider text-white placeholder:text-white/30 outline-none transition-all focus:border-neon-cyan focus:glow-cyan"
      />
    </label>
  );
}