"use client";
import React, { useState } from "react";

// Mock data
type Store = { id: string; name: string };
type Camera = { id: string; name: string };
type ShelfDetail = { product: string; percent: number; image: string };

const stores: Store[] = [
  { id: "store-1", name: "Walmart Supercenter #1" },
  { id: "store-2", name: "Walmart Neighborhood Market #2" },
  { id: "store-3", name: "Walmart Express #3" },
];

const camerasByStore: { [key: string]: Camera[] } = {
  "store-1": [
    { id: "cam-1", name: "Entrance Camera" },
    { id: "cam-2", name: "Aisle 5 Camera" },
  ],
  "store-2": [
    { id: "cam-3", name: "Produce Section Camera" },
    { id: "cam-4", name: "Checkout Camera" },
  ],
  "store-3": [
    { id: "cam-5", name: "Main Hall Camera" },
  ],
};

const shelvesByCamera: { [key: string]: string[] } = {
  "cam-1": ["Shelf A1", "Shelf A2"],
  "cam-2": ["Shelf B1"],
  "cam-3": ["Shelf C1", "Shelf C2"],
  "cam-4": ["Shelf D1"],
  "cam-5": ["Shelf E1", "Shelf E2", "Shelf E3"],
};

const shelfDetails: { [key: string]: ShelfDetail[] } = {
  "Shelf A1": [
    { product: "Cereal", percent: 80, image: "/mock/cereal.jpg" },
    { product: "Milk", percent: 60, image: "/mock/milk.jpg" },
  ],
  "Shelf A2": [
    { product: "Bread", percent: 90, image: "/mock/bread.jpg" },
  ],
  "Shelf B1": [
    { product: "Eggs", percent: 50, image: "/mock/eggs.jpg" },
  ],
  "Shelf C1": [
    { product: "Apples", percent: 70, image: "/mock/apples.jpg" },
  ],
  "Shelf C2": [
    { product: "Bananas", percent: 40, image: "/mock/bananas.jpg" },
  ],
  "Shelf D1": [
    { product: "Chips", percent: 95, image: "/mock/chips.jpg" },
  ],
  "Shelf E1": [
    { product: "Soda", percent: 30, image: "/mock/soda.jpg" },
  ],
  "Shelf E2": [
    { product: "Water", percent: 85, image: "/mock/water.jpg" },
  ],
  "Shelf E3": [
    { product: "Juice", percent: 60, image: "/mock/juice.jpg" },
  ],
};

export default function VisionInspectorPage() {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [selectedShelf, setSelectedShelf] = useState<string | null>(null);
  const [showImage, setShowImage] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">Vision Inspector</h1>
      <p className="text-gray-300 mb-8">Select a store, camera, and shelf to view product availability and the latest shelf image.</p>

      {/* Store Selection */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-2 font-semibold">Select Store</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stores.map((store) => (
            <button
              key={store.id}
              className={`bg-[#1e293b]/80 border border-[#334155] rounded-xl p-4 text-white font-medium shadow hover:shadow-lg transition backdrop-blur-md ${selectedStore === store.id ? "ring-2 ring-green-500" : ""}`}
              onClick={() => {
                setSelectedStore(store.id);
                setSelectedCamera(null);
                setSelectedShelf(null);
                setShowImage(null);
              }}
            >
              {store.name}
            </button>
          ))}
        </div>
      </div>

      {/* Camera Selection */}
      {selectedStore && (
        <div className="mb-6">
          <label className="block text-gray-400 mb-2 font-semibold">Select Camera</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(camerasByStore[selectedStore] || []).map((cam: Camera) => (
              <button
                key={cam.id}
                className={`bg-[#1e293b]/80 border border-[#334155] rounded-xl p-4 text-white font-medium shadow hover:shadow-lg transition backdrop-blur-md ${selectedCamera === cam.id ? "ring-2 ring-green-500" : ""}`}
                onClick={() => {
                  setSelectedCamera(cam.id);
                  setSelectedShelf(null);
                  setShowImage(null);
                }}
              >
                {cam.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Shelf Selection */}
      {selectedCamera && (
        <div className="mb-6">
          <label className="block text-gray-400 mb-2 font-semibold">Select Shelf</label>
          <div className="flex flex-wrap gap-4">
            {(shelvesByCamera[selectedCamera] || []).map((shelf: string) => (
              <button
                key={shelf}
                className={`bg-[#1e293b]/80 border border-[#334155] rounded-xl p-3 text-white font-medium shadow hover:shadow-lg transition backdrop-blur-md ${selectedShelf === shelf ? "ring-2 ring-green-500" : ""}`}
                onClick={() => {
                  setSelectedShelf(shelf);
                  setShowImage(null);
                }}
              >
                {shelf}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Shelf Details */}
      {selectedShelf && (
        <div className="bg-[#1e293b]/80 border border-[#334155] rounded-2xl shadow-lg p-6 backdrop-blur-md mt-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Products on {selectedShelf}</h2>
          <div className="space-y-4">
            {(shelfDetails[selectedShelf] || []).map((item: ShelfDetail, idx: number) => (
              <div key={item.product} className="flex items-center justify-between bg-[#334155]/60 rounded-lg p-4">
                <div>
                  <div className="font-bold text-white text-lg">{item.product}</div>
                  <div className="text-green-400 font-mono text-base">{item.percent}% available</div>
                </div>
                <button
                  className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow"
                  onClick={() => setShowImage(idx)}
                >
                  View Image
                </button>
              </div>
            ))}
          </div>
          {/* Show image modal or inline */}
          {showImage !== null && (
            <div className="mt-6 flex flex-col items-center">
              <div className="mb-2 text-gray-300">Most recent image for <span className="font-bold text-white">{shelfDetails[selectedShelf][showImage].product}</span>:</div>
              <img
                src={shelfDetails[selectedShelf][showImage].image}
                alt={shelfDetails[selectedShelf][showImage].product}
                className="rounded-xl border border-[#334155] shadow-lg max-w-xs"
              />
              <button
                className="mt-4 text-sm text-green-400 underline hover:text-green-300"
                onClick={() => setShowImage(null)}
              >
                Close Image
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 