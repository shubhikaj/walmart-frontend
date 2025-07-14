"use client";
import React, { useState, useEffect, createContext } from "react";
import { Home, Sun, Moon, Menu, X, Zap } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/agent-feed", label: "Agent Feed" },
  { href: "/chat", label: "Chat" },
  { href: "/vision-inspector", label: "Vision Inspector" },
  { href: "/routes", label: "Routes" },
  { href: "/alerts", label: "Alerts" },
  { href: "/settings", label: "Settings" },
];

export const TimeRangeContext = createContext<{ timeRange: string; setTimeRange: (v: string) => void }>({ timeRange: "Today", setTimeRange: () => {} });
export const StoreGroupContext = createContext<{ storeGroup: string; setStoreGroup: (v: string) => void }>({ storeGroup: "All Stores", setStoreGroup: () => {} });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        <div className="min-h-screen flex bg-[var(--background)]">
          {/* Sidebar */}
          <aside className={`fixed z-30 top-0 left-0 h-full w-56 bg-white/90 dark:bg-[#181a1b] border-r border-gray-100 dark:border-gray-800 flex flex-col gap-2 py-8 px-4 shadow-md transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:w-56`}>
            <div className="mb-8 text-lg font-bold flex items-center gap-2 text-[var(--primary)]">
              <Home className="text-[var(--primary)]" /> OpsCenter
            </div>
            <nav className="flex flex-col gap-3">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--primary)] font-semibold transition-colors px-2 py-2 rounded-lg focus:bg-[var(--pastel-blue)]">
                  {link.label}
                </Link>
              ))}
            </nav>
            <button
              className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-[var(--primary)]"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X />
            </button>
          </aside>
          {/* Hamburger for mobile */}
          <button
            className="fixed z-40 top-4 left-4 md:hidden bg-white/90 dark:bg-[#181a1b] p-2 rounded-full shadow border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu />
          </button>
          {/* Main Content */}
          <main className="flex-1 flex flex-col min-h-screen bg-[var(--pastel-blue)]/60 transition-colors duration-300">
            {/* Sticky Header */}
            <header className="sticky top-0 z-10 bg-white/90 dark:bg-[#181a1b] backdrop-blur border-b border-gray-100 dark:border-gray-800 px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-xl font-semibold text-[var(--foreground)]">Good Morning, Ops Manager 👋</span>
                <span className="ml-2 px-2 py-1 rounded bg-[var(--pastel-blue)] text-[var(--primary)] font-mono text-xs shadow">{clock}</span>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <select
                  className="rounded-lg border px-3 py-1 text-sm bg-white dark:bg-[#23263a] text-[var(--foreground)] shadow-sm"
                  value={timeRange}
                  onChange={e => setTimeRange(e.target.value)}
                >
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
                <select
                  className="rounded-lg border px-3 py-1 text-sm bg-white dark:bg-[#23263a] text-[var(--foreground)] shadow-sm"
                  value={storeGroup}
                  onChange={e => setStoreGroup(e.target.value)}
                >
                  <option>All Stores</option>
                  <option>Group A</option>
                  <option>Group B</option>
                </select>
                <button
                  className="ml-2 p-2 rounded-full bg-[var(--pastel-blue)] hover:bg-[var(--primary)] text-[var(--primary)] hover:text-white transition-colors"
                  onClick={() => setDark(d => !d)}
                  aria-label="Toggle dark mode"
                >
                  {dark ? <Sun /> : <Moon />}
                </button>
              </div>
            </header>
            <div className="flex-1 w-full max-w-full overflow-x-auto">{children}</div>
            {/* Quick Actions Floating Button */}
            <button
              className="fixed bottom-8 right-8 z-40 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-full p-4 shadow-lg flex items-center gap-2 animate-bounce"
              style={{ boxShadow: '0 8px 32px 0 rgba(37,99,235,0.16)' }}
              onClick={() => alert('Quick Actions coming soon!')}
            >
              <Zap className="w-5 h-5" /> Quick Actions
            </button>
          </main>
        </div>
      </StoreGroupContext.Provider>
    </TimeRangeContext.Provider>
  );
} 