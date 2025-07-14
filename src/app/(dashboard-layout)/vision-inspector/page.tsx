'use client';

import React, { useRef, useState } from "react";

const fakeBoxes = [
  { x: 40, y: 30, w: 80, h: 60, label: "Empty Slot", color: "yellow" },
  { x: 160, y: 50, w: 60, h: 40, label: "Product", color: "green" },
  { x: 250, y: 80, w: 70, h: 50, label: "Alert", color: "red" },
];

export default function VisionInspectorPage() {
  const [img, setImg] = useState<string | null>(null);
  const [highlight, setHighlight] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [zoom, setZoom] = useState(1);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  function handleMouseDown(e: React.MouseEvent) {
    setDragging(true);
    setStart({ x: e.clientX - drag.x, y: e.clientY - drag.y });
  }
  function handleMouseMove(e: React.MouseEvent) {
    if (!dragging) return;
    setDrag({ x: e.clientX - start.x, y: e.clientY - start.y });
  }
  function handleMouseUp() {
    setDragging(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-[var(--pastel-blue)]/40 py-8 px-2">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-2 text-[#111]">Shelf Scanner (Computer Vision Demo)</h1>
          <p className="text-[#111] font-bold mb-4">Upload a shelf image or use the placeholder below. Bounding boxes show detected items or alerts.</p>
          <div
            className="relative bg-gray-50 border rounded-xl shadow p-4 flex items-center justify-center min-h-[320px] w-full max-w-md overflow-hidden"
            style={{ boxShadow: 'var(--card-shadow)', cursor: dragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="transition-transform"
              style={{ transform: `scale(${zoom}) translate(${drag.x / zoom}px, ${drag.y / zoom}px)` }}
            >
              {img ? (
                <img src={img} alt="Shelf" className="rounded-lg max-h-80 object-contain" />
              ) : (
                <div className="w-[350px] h-[200px] bg-gray-200 rounded-lg flex items-center justify-center text-[#111]">[Shelf Placeholder]</div>
              )}
              {/* Overlay bounding boxes */}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" width={350} height={200} style={{ zIndex: 2 }}>
                {fakeBoxes.map((box, i) => (
                  <rect
                    key={i}
                    x={box.x}
                    y={box.y}
                    width={box.w}
                    height={box.h}
                    fill="none"
                    stroke={box.color}
                    strokeWidth={highlight ? 6 : 3}
                    style={{ transition: 'stroke-width 0.3s' }}
                  />
                ))}
              </svg>
            </div>
            <button
              className="absolute bottom-4 right-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-full px-4 py-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              onClick={() => inputRef.current?.click()}
              aria-label="Upload shelf image"
            >
              Upload Image
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = ev => setImg(ev.target?.result as string);
                  reader.readAsDataURL(file);
                  setHighlight(true);
                  setTimeout(() => setHighlight(false), 1000);
                }
              }}
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <button className="bg-white/80 rounded-full px-2 py-1 shadow text-[var(--primary)] font-bold" onClick={() => setZoom(z => Math.max(0.5, z - 0.2))}>-</button>
              <span className="bg-white/80 rounded px-2 py-1 shadow text-xs">Zoom: {zoom.toFixed(1)}x</span>
              <button className="bg-white/80 rounded-full px-2 py-1 shadow text-[var(--primary)] font-bold" onClick={() => setZoom(z => Math.min(2, z + 0.2))}>+</button>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-[var(--pastel-blue)] rounded-xl shadow p-4" style={{ boxShadow: 'var(--card-shadow)' }}>
            <div className="text-lg font-bold mb-2 text-[#111]">Caption Summary</div>
            <div className="text-yellow-600 text-lg">🟡 3 empty slots detected in Store 22</div>
          </div>
        </div>
      </div>
    </div>
  );
} 