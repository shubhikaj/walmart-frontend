"use client";
import React, { useRef, useContext } from "react";
import { AlertCircle, Package, RefreshCw } from "lucide-react";
import { TimeRangeContext, StoreGroupContext } from "../layout";

interface CardType {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  section: string;
}

const statusCardData: Record<string, CardType[]> = {
  Today: [
    { icon: <AlertCircle className="text-yellow-500" />, label: "Stockout Risk", value: "3 stores", color: "bg-[var(--pastel-pink)]", section: "heatmap" },
    { icon: <RefreshCw className="text-red-500" />, label: "Delays", value: "1", color: "bg-[var(--pastel-pink)]", section: "heatmap" },
    { icon: <Package className="text-green-600" />, label: "Crates Rebalanced", value: "40", color: "bg-[var(--pastel-green)]", section: "agentfeed" },
  ],
  "This Week": [
    { icon: <AlertCircle className="text-yellow-500" />, label: "Stockout Risk", value: "7 stores", color: "bg-[var(--pastel-pink)]", section: "heatmap" },
    { icon: <RefreshCw className="text-red-500" />, label: "Delays", value: "5", color: "bg-[var(--pastel-pink)]", section: "heatmap" },
    { icon: <Package className="text-green-600" />, label: "Crates Rebalanced", value: "210", color: "bg-[var(--pastel-green)]", section: "agentfeed" },
  ],
  "This Month": [
    { icon: <AlertCircle className="text-yellow-500" />, label: "Stockout Risk", value: "15 stores", color: "bg-[var(--pastel-pink)]", section: "heatmap" },
    { icon: <RefreshCw className="text-red-500" />, label: "Delays", value: "12", color: "bg-[var(--pastel-pink)]", section: "heatmap" },
    { icon: <Package className="text-green-600" />, label: "Crates Rebalanced", value: "800", color: "bg-[var(--pastel-green)]", section: "agentfeed" },
  ],
};

export default function DashboardPage() {
  const heatmapRef = useRef<HTMLDivElement>(null);
  const agentFeedRef = useRef<HTMLDivElement>(null);
  const { timeRange } = useContext(TimeRangeContext);
  const { storeGroup } = useContext(StoreGroupContext);

  const statusCards: CardType[] = statusCardData[timeRange] || statusCardData["Today"];

  function scrollToSection(section: string) {
    if (section === "heatmap") heatmapRef.current?.scrollIntoView({ behavior: "smooth" });
    if (section === "agentfeed") agentFeedRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Current Filters */}
      <div className="px-2 sm:px-8 pt-6 pb-2 text-[var(--foreground)] text-sm font-semibold flex gap-4 items-center">
        <span>Time Range: <span className="font-bold">{timeRange}</span></span>
        <span>Store Group: <span className="font-bold">{storeGroup}</span></span>
      </div>
      {/* Status Cards */}
      <section className="flex gap-4 px-2 sm:px-8 py-6 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200">
        {statusCards.map((card: CardType, i: number) => (
          <button
            key={i}
            className={`card min-w-[200px] flex flex-col items-start ${card.color} focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-transform hover:scale-105`}
            style={{ boxShadow: 'var(--card-shadow)' }}
            onClick={() => scrollToSection(card.section)}
            aria-label={`Go to ${card.label}`}
          >
            <div className="text-2xl mb-2">{card.icon}</div>
            <div className="font-bold text-lg mb-1 text-[#111]">{card.label}</div>
            <div className="text-[#111] text-sm font-semibold">{card.value}</div>
          </button>
        ))}
      </section>
      {/* Inventory Heatmap/Table Placeholder */}
      <section ref={heatmapRef} className="px-2 sm:px-8 py-4">
        <div className="card bg-white min-h-[200px] mb-6 flex flex-col items-center justify-center">
          <div className="font-mono text-[#111] text-center">[Inventory Heatmap/Table Placeholder for <b>{timeRange}</b> in <b>{storeGroup}</b>]</div>
        </div>
      </section>
      {/* Agent Feed Placeholder */}
      <section ref={agentFeedRef} className="px-2 sm:px-8 pb-8">
        <div className="card bg-white min-h-[120px] flex flex-col items-center justify-center">
          <div className="font-mono text-[#111] text-center">[Embedded Agent Feed Placeholder for <b>{timeRange}</b> in <b>{storeGroup}</b>]</div>
        </div>
      </section>
    </>
  );
} 