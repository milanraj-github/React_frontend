import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Upload, FileText, Sparkles } from "lucide-react";
import { HUDCorners } from "./HUDCorners";

type Extracted = {
  store: string; date: string; amount: string;
  items: string[]; warranty: string; expiry: string;
};

const FAKE: Extracted = {
  store: "RECEIPTO MART",
  date: "2026-05-08",
  amount: "$1,249.99",
  items: ["Quantum Laptop X1", "USB-C Hub", "Extended Warranty"],
  warranty: "24 months",
  expiry: "2028-05-08",
};

export function UploadCard({ onSave }: { onSave: (e: Extracted) => void }) {
  const [file, setFile] = useState<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "scanning" | "done">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    const url = URL.createObjectURL(f);
    setFile(url);
    setPhase("scanning");
    setTimeout(() => setPhase("done"), 3200);
  };

  const reset = () => { setFile(null); setPhase("idle"); };

  return (
    <div className="glass relative overflow-hidden rounded-xl p-6">
      <HUDCorners color="#A855F7" />
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-sm tracking-[0.3em] text-neon-purple text-glow-purple">
          UPLOAD RECEIPT
        </h2>
        {phase === "done" && (
          <button onClick={reset} className="font-hud text-xs tracking-widest text-white/50 hover:text-neon-cyan">
            NEW UPLOAD
          </button>
        )}
      </div>

      {!file && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files[0];
            if (f) handleFile(f);
          }}
          className="group flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-neon-purple/40 bg-black/30 px-6 py-14 text-center transition-all hover:border-neon-cyan hover:bg-neon-cyan/5"
        >
          <Upload className="mb-3 h-10 w-10 text-neon-purple anim-glow" />
          <p className="font-hud text-sm tracking-widest text-white/80">
            DRAG & DROP OR CLICK TO UPLOAD
          </p>
          <p className="mt-1 font-hud text-[10px] tracking-[0.3em] text-white/40">
            SUPPORTS: JPG · PNG · PDF
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      )}

      {file && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg border border-neon-cyan/30 bg-black/40">
            <div className="flex h-64 items-center justify-center">
              <img src={file} alt="receipt" className="max-h-full max-w-full object-contain"
                onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
              <FileText className="absolute h-16 w-16 text-neon-cyan/30" />
            </div>
            {phase === "scanning" && (
              <motion.div
                className="absolute inset-x-0 h-16 scanline anim-scan"
                style={{ top: 0 }}
              />
            )}
          </div>

          <div className="space-y-2">
            <div className="font-hud text-[10px] tracking-[0.4em] text-neon-cyan text-glow-cyan">
              {phase === "scanning" ? "OCR · PROCESSING..." : "EXTRACTION COMPLETE"}
            </div>
            <AnimatePresence>
              {phase === "done" && (
                <ExtractedPanel data={FAKE} onSave={() => onSave(FAKE)} />
              )}
              {phase === "scanning" && <ScanPlaceholder />}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

function ScanPlaceholder() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="h-6 rounded bg-neon-purple/10"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function ExtractedPanel({ data, onSave }: { data: Extracted; onSave: () => void }) {
  const rows: [string, string][] = [
    ["STORE", data.store],
    ["DATE", data.date],
    ["AMOUNT", data.amount],
    ["ITEMS", data.items.join(", ")],
    ["WARRANTY", data.warranty],
    ["EXPIRY", data.expiry],
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-1.5"
    >
      {rows.map(([k, v], i) => (
        <motion.div
          key={k}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12 }}
          className="flex items-start justify-between gap-3 rounded border border-neon-cyan/20 bg-black/30 px-3 py-2"
        >
          <span className="font-hud text-[10px] tracking-[0.3em] text-neon-cyan">{k}</span>
          <span className="text-right font-hud text-sm text-white">{v}</span>
        </motion.div>
      ))}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onSave}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-neon-purple bg-neon-purple/15 py-2.5 font-hud text-xs tracking-[0.3em] text-white transition-all hover:bg-neon-purple/30 hover:glow-purple"
      >
        <Sparkles className="h-4 w-4" />
        SAVE RECEIPT
      </motion.button>
    </motion.div>
  );
}