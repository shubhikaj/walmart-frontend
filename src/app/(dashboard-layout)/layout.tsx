"use client";
import React, { useState, useEffect, createContext } from "react";
import { Home, Users, MessageCircle, Eye, Map, Bell, Settings, Zap } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
  { href: "/agent-feed", label: "Agent Feed", icon: <Users size={20} /> },
  { href: "/chat", label: "Chat", icon: <MessageCircle size={20} /> },
  { href: "/vision-inspector", label: "Vision Inspector", icon: <Eye size={20} /> },
  { href: "/routes", label: "Routes", icon: <Map size={20} /> },
  { href: "/alerts", label: "Alerts", icon: <Bell size={20} /> },
  { href: "/settings", label: "Settings", icon: <Settings size={20} /> },
];

export const TimeRangeContext = createContext<{ timeRange: string; setTimeRange: (v: string) => void }>({ timeRange: "Today", setTimeRange: () => {} });
export const StoreGroupContext = createContext<{ storeGroup: string; setStoreGroup: (v: string) => void }>({ storeGroup: "All Stores", setStoreGroup: () => {} });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [clock, setClock] = useState("");
  const [timeRange, setTimeRange] = useState("Today");
  const [storeGroup, setStoreGroup] = useState("All Stores");

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [dark]);

  return (
    <TimeRangeContext.Provider value={{ timeRange, setTimeRange }}>
      <StoreGroupContext.Provider value={{ storeGroup, setStoreGroup }}>
        <div className="min-h-screen bg-[var(--background)] flex flex-col">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-40 w-full bg-[var(--panel)]/90 backdrop-blur border-b border-[var(--sidebar-border)] shadow flex items-center justify-between px-8 h-16">
            <div className="flex items-center gap-3">
              <Zap className="text-[var(--primary)]" size={26} />
              <span className="font-bold text-lg tracking-tight text-[var(--foreground-strong)]">WalmartOps</span>
            </div>
            <nav className="flex gap-2 ml-8">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="group flex items-center gap-2 px-3 py-2 rounded-md font-medium text-[var(--foreground)] hover:bg-[var(--primary)]/10 transition-all border-b-2 border-transparent hover:border-[var(--primary)] focus:border-[var(--primary)]">
                  <span className="text-[var(--primary)] group-hover:text-[var(--primary)]">{link.icon}</span>
                  <span className="hidden md:inline truncate">{link.label}</span>
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              {/* Placeholder for user/profile/actions */}
              <button className="btn px-4 py-1">Quick Actions</button>
            </div>
          </header>
          {/* Main Content */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </StoreGroupContext.Provider>
    </TimeRangeContext.Provider>
  );
} 