import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ReceiptText, ShieldCheck, AlarmClock, Wallet } from "lucide-react";
import { Sidebar } from "@/components/receipto/Sidebar";
import { Navbar } from "@/components/receipto/Navbar";
import { StatCard } from "@/components/receipto/StatCard";
import { UploadCard } from "@/components/receipto/UploadCard";
import { ReceiptCard, type Receipt } from "@/components/receipto/ReceiptCard";
import { WarrantyCard, type Warranty } from "@/components/receipto/WarrantyCard";
import { NotificationCard } from "@/components/receipto/NotificationCard";
import { FloatingParticles } from "@/components/receipto/FloatingParticles";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

const initialReceipts: Receipt[] = [
  { id: "1", store: "QUANTUM ELECTRONICS", amount: "$1,249.99", date: "2026-04-12", warrantyStatus: "ACTIVE" },
  { id: "2", store: "NEON GROCERS", amount: "$84.20", date: "2026-04-29", warrantyStatus: "EXPIRING" },
  { id: "3", store: "ARCADE OUTLET", amount: "$329.00", date: "2026-03-02", warrantyStatus: "ACTIVE" },
  { id: "4", store: "RECEIPTO MART", amount: "$8.37", date: "2026-05-01", warrantyStatus: "EXPIRED" },
];

const warranties: Warranty[] = [
  { id: "1", product: "Quantum Laptop X1", expiry: "2028-05-08", remainingDays: 730, totalDays: 730 },
  { id: "2", product: "Neon Headphones", expiry: "2026-06-04", remainingDays: 27, totalDays: 365 },
  { id: "3", product: "Holo Monitor 32\"", expiry: "2027-01-15", remainingDays: 252, totalDays: 730 },
  { id: "4", product: "Plasma Toaster", expiry: "2026-03-22", remainingDays: -1, totalDays: 365 },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-4 font-display text-sm tracking-[0.4em] text-neon-cyan text-glow-cyan">
        // {title}
      </h2>
      {children}
    </section>
  );
}

function Dashboard() {
  const [receipts, setReceipts] = useState<Receipt[]>(initialReceipts);

  const handleSave = (e: { store: string; amount: string; date: string }) => {
    setReceipts((prev) => [
      { id: String(Date.now()), store: e.store, amount: e.amount, date: e.date, warrantyStatus: "ACTIVE" },
      ...prev,
    ]);
  };

  return (
    <div className="relative min-h-screen bg-[#0D0D0D] text-white">
      <div className="pointer-events-none fixed inset-0 hud-grid opacity-20" />
      <FloatingParticles count={25} color="#A855F7" />

      <div className="relative flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <motion.main
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12 p-6 lg:p-8"
          >
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="TOTAL RECEIPTS" value={receipts.length * 12} icon={ReceiptText} />
              <StatCard label="ACTIVE WARRANTIES" value={18} icon={ShieldCheck} accent="cyan" />
              <StatCard label="EXPIRING SOON" value={3} icon={AlarmClock} accent="cyan" />
              <StatCard label="MONTHLY SPENDING" value={2480} icon={Wallet} suffix="$" />
            </div>

            <Section id="upload" title="UPLOAD RECEIPT">
              <UploadCard onSave={handleSave} />
            </Section>

            <Section id="saved" title="SAVED RECEIPTS">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {receipts.map((r) => <ReceiptCard key={r.id} r={r} />)}
              </div>
            </Section>

            <Section id="warranty" title="WARRANTY TRACKER">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {warranties.map((w) => <WarrantyCard key={w.id} w={w} />)}
              </div>
            </Section>

            <Section id="notifications" title="SMART NOTIFICATIONS">
              <div className="grid gap-3 lg:grid-cols-2">
                <NotificationCard kind="warning" title="Plasma Toaster warranty expired" time="2 hours ago" />
                <NotificationCard kind="success" title="Receipt uploaded successfully" time="5 minutes ago" />
                <NotificationCard kind="info" title="OCR extraction complete · Quantum Laptop X1" time="just now" />
                <NotificationCard kind="warning" title="Neon Headphones warranty expires in 27 days" time="today" />
              </div>
            </Section>

            <div className="pt-4 text-center font-hud text-[10px] tracking-[0.4em] text-white/30">
              © Tech Explorers
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
}