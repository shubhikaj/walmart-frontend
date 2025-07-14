'use client';

import React, { useState } from "react";

export default function SettingsPage() {
  const [showToast, setShowToast] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  function handleSave() {
    setShowToast(true);
    setShowConfetti(true);
    setTimeout(() => setShowToast(false), 2000);
    setTimeout(() => setShowConfetti(false), 1200);
  }
  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--foreground-strong)] mb-4">Settings</h1>
        <p className="text-lg md:text-xl text-[var(--foreground)] mb-8 max-w-2xl mx-auto">Manage your profile, role, theme, and notification preferences. Styled like a Linear settings panel.</p>
      </div>
      <div className="bg-[var(--panel)] rounded-lg shadow-lg p-8 w-full max-w-2xl flex flex-col items-center mb-24">
        {/* Profile Picture/Role */}
        <div className="flex flex-col items-center gap-4 md:w-1/3">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl">👤</div>
          <select className="rounded-lg border px-3 py-1 text-sm bg-white shadow-sm text-[var(--foreground)]">
            <option>Ops Manager</option>
            <option>Inventory Agent</option>
            <option>Rebalancer</option>
          </select>
        </div>
        {/* Form */}
        <form className="flex-1 flex flex-col gap-4 md:w-2/3">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-bold text-[#111]">Email</span>
            <input type="email" className="border rounded-lg px-3 py-2 bg-gray-50 text-[var(--foreground)]" defaultValue="ops@company.com" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-bold text-[#111]">Name</span>
            <input type="text" className="border rounded-lg px-3 py-2 bg-gray-50 text-[var(--foreground)]" defaultValue="Ops Manager" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-bold text-[#111]">Notification Preferences</span>
            <select className="border rounded-lg px-3 py-2 bg-gray-50 text-[var(--foreground)]">
              <option>All</option>
              <option>Critical Only</option>
              <option>None</option>
            </select>
          </label>
          <button type="button" className="mt-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold rounded-xl py-2 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] animate-bounce" onClick={handleSave}>
            Save Settings
          </button>
        </form>
      </div>
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-[var(--primary)] text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in">Settings saved!</div>
      )}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Confetti animation placeholder */}
        </div>
      )}
    </div>
  );
} 