'use client';
import React, { useState } from "react";
import { Mail, Lock, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [dark]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email === "ops@company.com" && password === "password") {
        router.push("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    }, 800);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--pastel-blue)] to-[var(--pastel-pink)] transition-colors duration-300">
      <button
        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 shadow border border-gray-200 text-gray-700 hover:bg-[var(--pastel-blue)]"
        onClick={() => setDark(d => !d)}
        aria-label="Toggle dark mode"
      >
        {dark ? <Sun /> : <Moon />}
      </button>
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl w-full animate-fade-in">
        {/* Left section: Logo/Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center bg-[var(--pastel-blue)] px-10 py-12">
          <div className="text-3xl font-bold mb-4 text-[var(--primary)]">Welcome to OpsCenter</div>
          {/* Optionally add an illustration or logo here */}
        </div>
        {/* Right section: Login Card */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 text-[var(--foreground)]">Sign in</h1>
            <p className="text-gray-700 text-sm">Your command center. Sign in to monitor and manage.</p>
          </div>
          <form className={`flex flex-col gap-4 ${error ? 'animate-shake' : ''}`} onSubmit={handleLogin}>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-[var(--foreground)]">Email</span>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 ring-blue-200">
                <Mail className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="bg-transparent outline-none flex-1 text-[var(--foreground)]"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-[var(--foreground)]">Password</span>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 ring-blue-200">
                <Lock className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-transparent outline-none flex-1 text-[var(--foreground)]"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </label>
            <button
              type="submit"
              className="mt-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold rounded-xl py-2 transition-colors shadow-md relative overflow-hidden focus:outline-none"
              style={{ boxShadow: 'var(--card-shadow)', borderRadius: 'var(--border-radius-xl)' }}
              disabled={loading}
            >
              {loading ? <span className="animate-pulse">Signing in…</span> : "Login"}
            </button>
            {error && <div className="text-red-600 text-sm text-center animate-fade-in">{error}</div>}
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-[var(--primary)] hover:underline text-sm font-semibold"
              onClick={() => router.push("/dashboard")}
            >
              Continue without login
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.7s; }
        @keyframes shake { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-8px); } 40%, 60% { transform: translateX(8px); } }
        .animate-shake { animation: shake 0.4s; }
      `}</style>
    </div>
  );
}
