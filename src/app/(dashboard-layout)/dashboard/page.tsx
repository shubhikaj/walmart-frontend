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
    <div className="flex flex-col items-center w-full min-h-screen pt-16">
      {/* Hero section */}
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">Walmart Logistics Operations Dashboard</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">A modern, glassy dashboard for managing logistics, agent feeds, vision insights, and more.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pb-16">
        {/* Agent Feed Card */}
        <div className="bg-[#1e293b]/80 border border-[#334155] rounded-2xl shadow-lg p-6 backdrop-blur-md hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold mb-2 text-white">Agent Feed</h2>
          <p className="text-gray-300 mb-4">Monitor real-time updates from field agents, track activities, and stay informed about on-ground operations.</p>
        </div>
        {/* Vision Inspector Card */}
        <div className="bg-[#1e293b]/80 border border-[#334155] rounded-2xl shadow-lg p-6 backdrop-blur-md hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold mb-2 text-white">Vision Inspector</h2>
          <p className="text-gray-300 mb-4">Analyze shelf stock, product availability, and get visual insights from in-store cameras using AI-powered vision tools.</p>
        </div>
        {/* Alerts Card */}
        <div className="bg-[#1e293b]/80 border border-[#334155] rounded-2xl shadow-lg p-6 backdrop-blur-md hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold mb-2 text-white">Alerts & Notifications</h2>
          <p className="text-gray-300 mb-4">Receive instant alerts for low stock, anomalies, or urgent issues. Stay proactive with real-time notifications.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pb-16">
        {/* Chat Card */}
        <div className="bg-[#1e293b]/80 border border-[#334155] rounded-2xl shadow-lg p-6 backdrop-blur-md hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold mb-2 text-white">Chat</h2>
          <p className="text-gray-300 mb-4">Communicate with team members, agents, and support directly from the dashboard.</p>
        </div>
        {/* Store & Routes Card */}
        <div className="bg-[#1e293b]/80 border border-[#334155] rounded-2xl shadow-lg p-6 backdrop-blur-md hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold mb-2 text-white">Store & Routes</h2>
          <p className="text-gray-300 mb-4">Manage store locations, optimize delivery routes, and monitor logistics performance.</p>
        </div>
      </div>
      <footer className="w-full border-t border-[#334155] bg-[#0f172a]/80 backdrop-blur-md py-8 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
          <div className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Walmart Logistics Ops. All rights reserved.</div>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="/privacy" className="hover:text-green-400 transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-green-400 transition">Terms of Service</a>
            <a href="mailto:support@walmartops.com" className="hover:text-green-400 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
} 