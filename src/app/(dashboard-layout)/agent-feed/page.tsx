'use client';
import React, { useState, useRef, useEffect } from "react";

const initialLogs = [
  { icon: "✅", text: "Rebalancer completed crate move for Store 14.", time: "09:12 AM", agent: "Rebalancer" },
  { icon: "🔁", text: "InventoryAgent started shelf scan in Store 22.", time: "09:10 AM", agent: "InventoryAgent" },
  { icon: "🚧", text: "Delay detected in Store 7 delivery.", time: "08:55 AM", agent: "LogisticsBot" },
  { icon: "📦", text: "New shipment arrived at Store 3.", time: "08:40 AM", agent: "InventoryAgent" },
];

function getRandomLog() {
  const emojis = ["✅", "🔁", "🚧", "📦", "🤖", "🟢", "🔴", "🟡"];
  const agents = ["Rebalancer", "InventoryAgent", "LogisticsBot", "OpsBot"];
  const texts = [
    "AgentX++ performed a check.",
    "Crate moved successfully.",
    "Stockout risk recalculated.",
    "Shelf scan completed.",
    "Delay resolved.",
    "New shipment processed.",
    "Alert acknowledged.",
  ];
  return {
    icon: emojis[Math.floor(Math.random() * emojis.length)],
    text: texts[Math.floor(Math.random() * texts.length)],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    agent: agents[Math.floor(Math.random() * agents.length)],
  };
}

export default function AgentFeedPage() {
  const [logs, setLogs] = useState(initialLogs);
  const [loading, setLoading] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);

  // Infinite scroll
  useEffect(() => {
    function onScroll() {
      if (!feedRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = feedRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
        setLoading(true);
        setTimeout(() => {
          setLogs(l => [...l, getRandomLog()]);
          setLoading(false);
        }, 600);
      }
    }
    const ref = feedRef.current;
    if (ref) ref.addEventListener('scroll', onScroll);
    return () => { if (ref) ref.removeEventListener('scroll', onScroll); };
  }, [loading]);

  return (
    <div className="min-h-screen bg-[var(--pastel-blue)]/40 flex flex-col items-center py-8 px-2" style={{ fontFamily: 'IBM Plex Mono Variable, monospace' }}>
      <div className="max-w-xl w-full">
        <div className="mb-6 text-lg font-bold text-[var(--foreground)]">📜 These are the whispers of your autonomous system…</div>
        <div ref={feedRef} className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200">
          {logs.map((log, i) => (
            <div key={i} className="card flex items-center gap-4 bg-white hover:bg-[var(--pastel-blue)] transition-colors" style={{ boxShadow: 'var(--card-shadow)' }}>
              <span className="text-2xl" aria-label="log-icon">{log.icon}</span>
              <div className="flex-1">
                <div className="text-[#111] font-semibold">{log.text}</div>
                <div className="text-xs text-[#111] mt-1">{log.time} • {log.agent}</div>
              </div>
            </div>
          ))}
          {loading && <div className="text-center text-[var(--primary)] animate-pulse">Loading more logs…</div>}
        </div>
      </div>
    </div>
  );
} 