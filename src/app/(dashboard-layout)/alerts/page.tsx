'use client';
import React, { useState } from "react";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const initialAlerts = [
  { icon: <AlertTriangle className="text-red-500" />, summary: "Stockout risk detected in Store 7", time: "09:15 AM", agent: "InventoryAgent", severity: "Critical" },
  { icon: <CheckCircle className="text-green-500" />, summary: "Crates rebalanced in Store 14", time: "09:10 AM", agent: "Rebalancer", severity: "Resolved" },
  { icon: <XCircle className="text-yellow-500" />, summary: "Delay in delivery to Store 22", time: "08:55 AM", agent: "LogisticsBot", severity: "Moderate" },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? alerts : alerts.filter(a => a.severity === filter);

  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--foreground-strong)] mb-4">Notification Center</h1>
        <p className="text-lg md:text-xl text-[var(--foreground)] mb-8 max-w-2xl mx-auto">See all triggered alerts, filter by type, agent, store, or status. Color tags indicate severity.</p>
      </div>
      <div className="mb-8 flex gap-2 flex-wrap justify-center">
        {["All", "Critical", "Moderate", "Resolved"].map(f => (
          <button
            key={f}
            className={`px-4 py-2 rounded-full font-semibold shadow-sm border border-[#334155] text-sm transition-colors ${filter === f ? 'bg-[var(--primary)] text-white' : 'bg-[#23293a] text-[var(--foreground)] hover:bg-[var(--primary)]/10'}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl mb-24">
        {filtered.length === 0 ? (
          <div className="col-span-full text-muted text-center py-12">No alerts in this category.</div>
        ) : (
          filtered.map((alert, i) => (
            <div key={i} className="bg-[#23293a] border border-[#334155] rounded-xl shadow-sm p-6 flex flex-col gap-2 hover:shadow-lg hover:border-[var(--primary)] transition-all">
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-block w-2 h-2 rounded-full ${alert.severity === 'Critical' ? 'bg-red-500' : alert.severity === 'Moderate' ? 'bg-yellow-400' : alert.severity === 'Resolved' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                <span className="font-bold text-[var(--foreground-strong)] text-base">{alert.severity}</span>
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-semibold bg-[#1e293b] text-[var(--foreground)] border border-[#334155]">{alert.severity}</span>
              </div>
              <div className="text-[var(--foreground)] font-semibold">{alert.summary}</div>
              <div className="text-muted text-xs">{alert.agent} • {alert.time}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 