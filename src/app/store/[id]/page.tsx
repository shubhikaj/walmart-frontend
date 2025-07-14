'use client';
import React, { useState } from "react";

const incidents = [
  { time: "09:10 AM", desc: "Crate rebalanced by Rebalancer" },
  { time: "08:55 AM", desc: "Delay detected in delivery" },
];

export default function StoreDetailPage({ params }: { params: { id: string } }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--foreground-strong)] mb-4">Store #{params.id}</h1>
        <p className="text-lg md:text-xl text-[var(--foreground)] mb-8 max-w-2xl mx-auto">See inventory, incidents, shelf health, and demand spikes for this store.</p>
      </div>
      <div className="bg-[var(--panel)] rounded-lg shadow-lg p-8 w-full max-w-4xl flex flex-col gap-8 mb-24">
        {/* Store Info */}
        <div className="card flex flex-col gap-2 bg-[var(--panel)] rounded-lg shadow-lg hover:border-[var(--primary)]">
          <div className="text-lg font-bold text-[var(--foreground-strong)]">Store #{params.id}</div>
          <div className="text-[var(--foreground)] text-sm mb-2">Location: Midtown, City</div>
          <span className="inline-block bg-green-100 text-green-700 rounded px-2 py-1 text-xs font-bold w-max animate-pulse">Normal</span>
        </div>
        {/* Inventory Section */}
        <div className="card bg-[var(--panel)] rounded-lg shadow-lg hover:border-[var(--primary)] cursor-pointer" onClick={() => setShowModal(true)}>
          <div className="font-bold mb-2 text-[var(--foreground-strong)]">Inventory</div>
          <div className="h-24 flex items-center justify-center text-[var(--foreground)]">[Bar Chart/Table Placeholder]</div>
        </div>
        {/* Recent Incidents */}
        <div className="card flex flex-col gap-2 bg-[var(--panel)] rounded-lg shadow-lg hover:border-[var(--primary)]">
          <div className="font-bold mb-2 text-[var(--foreground-strong)]">Recent Incidents</div>
          <ul className="text-sm text-[var(--foreground)]">
            {incidents.map((inc, i) => (
              <li key={i} className="mb-1">{inc.time} – {inc.desc}</li>
            ))}
          </ul>
        </div>
        {/* Shelf Health & Demand Spike */}
        <div className="card flex flex-col gap-2 bg-[var(--panel)] rounded-lg shadow-lg hover:border-[var(--primary)]">
          <div className="font-bold mb-2 text-[var(--foreground-strong)]">Shelf Health</div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-16 h-10 bg-gray-200 rounded flex items-center justify-center text-[var(--foreground)]">[Image]</div>
            <span className="text-green-700 font-bold animate-pulse">92% filled</span>
          </div>
          <div className="font-bold mb-2 text-[var(--foreground-strong)]">Demand Spike</div>
          <div className="h-16 flex items-center justify-center text-[var(--foreground)]">[Demand Spike Chart Placeholder]</div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
            <div className="text-lg font-bold mb-4 text-[var(--foreground-strong)]">Inventory Chart (Coming Soon)</div>
            <div className="h-32 flex items-center justify-center text-[var(--foreground)]">[Chart Placeholder]</div>
            <button className="mt-6 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-xl px-4 py-2 font-semibold" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
} 