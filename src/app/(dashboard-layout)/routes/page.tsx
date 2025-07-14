import React from "react";

const timeline = [
  { time: "10:00 AM", event: "Flood detected" },
  { time: "10:02 AM", event: "Route changed" },
];

export default function RoutesPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[var(--pastel-blue)]/40 py-8 px-2">
      <div className="max-w-4xl w-full flex flex-col gap-8">
        <h1 className="text-2xl font-semibold mb-2 text-[var(--foreground)]">Route Visualization (Logistics Map)</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Map mockup */}
          <div className="flex-1 bg-[var(--pastel-blue)] rounded-xl shadow p-4 flex flex-col items-center" style={{ boxShadow: 'var(--card-shadow)' }}>
            <div className="w-full h-64 flex items-center justify-center relative">
              {/* SVG mock map */}
              <svg width="320" height="180" className="rounded-lg">
                {/* Before Disruption */}
                <polyline points="30,150 80,100 150,80 250,60" fill="none" stroke="#7dafff" strokeWidth="6" />
                {/* After Reroute */}
                <polyline points="30,150 80,100 120,120 200,100 250,60" fill="none" stroke="#0057b8" strokeWidth="6" strokeDasharray="8 4" />
                {/* Checkpoints */}
                <circle cx="30" cy="150" r="7" fill="#0057b8">
                  <title>Checkpoint FC3 → Store 14</title>
                </circle>
                <circle cx="250" cy="60" r="7" fill="#0057b8">
                  <title>Checkpoint Store 14</title>
                </circle>
              </svg>
              <div className="absolute top-2 left-2 bg-white rounded px-2 py-1 text-xs shadow text-[var(--foreground)]">Before Disruption</div>
              <div className="absolute bottom-2 right-2 bg-blue-700 text-white rounded px-2 py-1 text-xs shadow">After Rebalancer Reroute</div>
            </div>
            <div className="mt-4 flex gap-4 text-xs">
              <span className="bg-gray-200 rounded px-2 py-1 text-[var(--foreground)]">Legend: <span className="text-blue-700">Reroute</span> <span className="text-[#7dafff]">Original</span></span>
              <span className="bg-gray-200 rounded px-2 py-1 text-[var(--foreground)]">Show: <span className="text-blue-700">Flood-affected zones only</span></span>
            </div>
          </div>
          {/* Timeline */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="bg-white rounded-xl shadow p-4" style={{ boxShadow: 'var(--card-shadow)' }}>
              <div className="font-semibold mb-2 text-[#111]">Timeline</div>
              <ul>
                {timeline.map((item, i) => (
                  <li key={i} className="mb-1 text-[#111]"><span className="font-mono text-blue-700">{item.time}:</span> {item.event}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 