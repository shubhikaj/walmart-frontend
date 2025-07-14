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
    <div className="min-h-screen bg-[var(--pastel-blue)]/40 flex flex-col items-center py-8 px-2">
      <div className="max-w-2xl w-full">
        <div className="mb-6 flex gap-2 flex-wrap">
          {["All", "Critical", "Moderate", "Resolved"].map(f => (
            <button
              key={f}
              className={`px-4 py-2 rounded-xl font-semibold shadow transition-colors ${filter === f ? 'bg-[var(--primary)] text-white' : 'bg-white text-[#222] hover:bg-[var(--pastel-blue)]'}`}
              onClick={() => setFilter(f)}
            >
              {f}
              {f === "Critical" && alerts.some(a => a.severity === "Critical") && (
                <span className="ml-2 inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              )}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {filtered.map((alert, i) => (
            <div key={i} className="card flex items-center gap-4 bg-white" style={{ boxShadow: 'var(--card-shadow)' }}>
              <span className="text-2xl" aria-label="alert-icon">{alert.icon}</span>
              <div className="flex-1">
                <div className="text-[#222] font-semibold">{alert.summary}</div>
                <div className="text-xs text-[#222] mt-1">{alert.time} • {alert.agent}</div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-xl ${alert.severity === 'Critical' ? 'bg-red-100 text-red-700' : alert.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{alert.severity}</span>
            </div>
          ))}
          {filtered.length === 0 && <div className="text-center text-[#222]">No alerts in this category.</div>}
        </div>
      </div>
    </div>
  );
} 