'use client';

import React, { useRef, useEffect, useState } from "react";

const initialMessages = [
  { sender: "agent", text: "Hello! How can I help you today?" },
  { sender: "user", text: "Why was Store 14 rebalanced yesterday?" },
  { sender: "agent", text: "Store 14 was rebalanced due to a detected stockout risk. Would you like more details?" },
];

function randomEmoji() {
  const emojis = ["👍", "🤖", "✅", "🚀", "🎉", "💡", "🔍", "📦", "🟢", "🔴", "🟡"];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages(msgs => [...msgs, { sender: "agent", text: `[AgentX++] ${randomEmoji()} ${input.split(" ")[0] || "OK"}` }]);
      setLoading(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1200);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--pastel-blue)]/40">
      <div className="flex-1 flex flex-col justify-end max-w-2xl w-full mx-auto py-8 px-2">
        <div className="mb-4 text-center text-[var(--foreground)] text-sm">Ask anything. AgentX++ knows everything your ops team does — and more.</div>
        <div className="flex flex-col gap-3 mb-24">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`rounded-xl px-4 py-2 max-w-[70%] shadow ${msg.sender === "user" ? "bg-[var(--primary)] text-white ml-auto" : "bg-white text-[#111]"}`} style={{ boxShadow: 'var(--card-shadow)' }}>
                {msg.sender === "agent" && <span className="mr-2">🤖</span>}
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-xl px-4 py-2 bg-white text-[#111] shadow flex items-center gap-2" style={{ boxShadow: 'var(--card-shadow)' }}>
                <span>🤖</span>
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={sendMessage} className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto flex items-center bg-white rounded-xl shadow px-4 py-2 mb-4" style={{ boxShadow: 'var(--card-shadow)' }}>
          <input
            className="flex-1 outline-none bg-transparent py-2 px-2 text-[#111]"
            placeholder="Why was Store 14 rebalanced yesterday?"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit" className="ml-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] animate-bounce" aria-label="Send message">
            <span role="img" aria-label="send">🛩️</span>
          </button>
        </form>
        {showConfetti && <div className="fixed inset-0 pointer-events-none z-50 animate-fade-in">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl">🎉</div>
        </div>}
      </div>
    </div>
  );
} 