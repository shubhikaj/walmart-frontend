"use client";
import React from "react";

const agentFeed = [
  {
    id: 1,
    agent: "John Doe",
    action: "Checked shelf A1",
    time: "2 min ago",
    status: "Success",
    details: "No issues found. Stock at 80%."
  },
  {
    id: 2,
    agent: "Priya Singh",
    action: "Reported low stock on shelf B2",
    time: "5 min ago",
    status: "Alert",
    details: "Stock below 20%. Needs restock."
  },
  {
    id: 3,
    agent: "Carlos M.",
    action: "Resolved alert on shelf C3",
    time: "10 min ago",
    status: "Resolved",
    details: "Restocked and verified."
  },
];

const statusColors = {
  Success: "bg-green-700 text-green-200",
  Alert: "bg-yellow-700 text-yellow-200",
  Resolved: "bg-blue-700 text-blue-200"
};

export default function AgentFeedPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">Agent Feed</h1>
      <p className="text-gray-300 mb-8">Live updates from field agents. Track actions, alerts, and resolutions in real time.</p>
      <div className="space-y-6">
        {agentFeed.map((item) => (
          <div key={item.id} className="bg-[#1e293b]/80 border border-[#334155] rounded-2xl shadow-lg p-6 backdrop-blur-md flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-2xl transition">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-white text-lg">{item.agent}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[item.status as keyof typeof statusColors]}`}>{item.status}</span>
              </div>
              <div className="text-gray-200 font-medium">{item.action}</div>
              <div className="text-gray-400 text-sm mt-1">{item.details}</div>
            </div>
            <div className="text-gray-400 text-xs md:text-sm md:text-right whitespace-nowrap">{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 