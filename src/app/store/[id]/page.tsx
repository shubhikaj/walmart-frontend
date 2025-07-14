'use client';
import React, { useState } from "react";

const incidents = [
  { time: "09:10 AM", desc: "Crate rebalanced by Rebalancer" },
  { time: "08:55 AM", desc: "Delay detected in delivery" },
];

export default function StoreDetailPage({ params }: { params: { id: string } }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="min-h-screen flex flex-col items-center bg-[var(--pastel-blue)]/40 py-8 px-2">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Store Info */}
        <div className="card flex flex-col gap-2 bg-white" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="text-lg font-bold text-[#111]">Store #{params.id}</div>
          <div className="text-[#111] text-sm mb-2">Location: Midtown, City</div>
          <span className="inline-block bg-green-100 text-green-700 rounded px-2 py-1 text-xs font-bold w-max animate-pulse">Normal</span>
        </div>
        {/* Inventory Section */}
        <div className="card bg-white cursor-pointer hover:bg-[var(--pastel-blue)] transition-colors" style={{ boxShadow: 'var(--card-shadow)' }} onClick={() => setShowModal(true)}>
          <div className="font-bold mb-2 text-[#111]">Inventory</div>
          <div className="h-24 flex items-center justify-center text-[#111]">[Bar Chart/Table Placeholder]</div>
        </div>
        {/* Recent Incidents */}
        <div className="card flex flex-col gap-2 bg-white" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="font-bold mb-2 text-[#111]">Recent Incidents</div>
          <ul className="text-sm text-[#111]">
            {incidents.map((inc, i) => (
              <li key={i} className="mb-1">{inc.time} – {inc.desc}</li>
            ))}
          </ul>
        </div>
        {/* Shelf Health & Demand Spike */}
        <div className="card flex flex-col gap-2 bg-white" style={{ boxShadow: 'var(--card-shadow)' }}>
          <div className="font-bold mb-2 text-[#111]">Shelf Health</div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-16 h-10 bg-gray-200 rounded flex items-center justify-center text-[#111]">[Image]</div>
            <span className="text-green-700 font-bold animate-pulse">92% filled</span>
          </div>
          <div className="font-bold mb-2 text-[#111]">Demand Spike</div>
          <div className="h-16 flex items-center justify-center text-[#111]">[Demand Spike Chart Placeholder]</div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
            <div className="text-lg font-bold mb-4 text-[#111]">Inventory Chart (Coming Soon)</div>
            <div className="h-32 flex items-center justify-center text-[#111]">[Chart Placeholder]</div>
            <button className="mt-6 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-xl px-4 py-2 font-semibold" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
} 