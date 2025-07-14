"use client";
import React from "react";

const route = {
  id: "route-123",
  name: "Morning Delivery Run",
  status: "In Progress",
  stops: [
    { id: 1, name: "Warehouse", status: "Departed", icon: "🚚" },
    { id: 2, name: "Store #1", status: "Delivered", icon: "🏬" },
    { id: 3, name: "Store #2", status: "Pending", icon: "🏬" },
    { id: 4, name: "Store #3", status: "Pending", icon: "🏬" },
  ],
};

const statusColors = {
  "Departed": "bg-blue-700 text-blue-200",
  "Delivered": "bg-green-700 text-green-200",
  "Pending": "bg-yellow-700 text-yellow-200"
};

export default function RoutesPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">Route Visualizer</h1>
      <div className="bg-[#1e293b]/80 border border-[#334155] rounded-2xl shadow-lg p-6 backdrop-blur-md mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="font-bold text-white text-lg">{route.name}</div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-700 text-green-200">{route.status}</span>
        </div>
        <div className="text-gray-300 text-sm">Route ID: {route.id}</div>
      </div>
      <div className="space-y-4">
        {route.stops.map((stop) => (
          <div key={stop.id} className="flex items-center gap-4 bg-[#334155]/60 border border-[#334155] rounded-xl p-4 shadow hover:shadow-lg transition">
            <span className="text-2xl">{stop.icon}</span>
            <div className="flex-1">
              <div className="font-bold text-white">{stop.name}</div>
              <div className="text-gray-400 text-xs">Stop #{stop.id}</div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[stop.status as keyof typeof statusColors]}`}>{stop.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 