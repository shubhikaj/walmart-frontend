"use client";
import React, { useRef, useEffect, useState } from "react";

const initialMessages = [
  { sender: "agent", text: "Hello! How can I help you today?" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: input },
      { sender: "agent", text: "Thank you for your message. We'll get back to you soon!" },
    ]);
    setInput("");
  }

  return (
    <div className="max-w-lg mx-auto py-12 px-4 flex flex-col h-[80vh]">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">Chat</h1>
      <div className="flex-1 overflow-y-auto space-y-4 bg-[#1e293b]/80 border border-[#334155] rounded-2xl shadow-lg p-6 backdrop-blur-md mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-2xl max-w-xs ${msg.sender === "user" ? "bg-green-700 text-white rounded-br-none" : "bg-[#334155] text-gray-100 rounded-bl-none"}`}>{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex gap-2 sticky bottom-0 bg-transparent">
        <input
          className="flex-1 px-4 py-2 rounded-xl bg-[#0f172a] border border-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2 rounded-xl shadow"
        >
          Send
        </button>
      </form>
    </div>
  );
} 