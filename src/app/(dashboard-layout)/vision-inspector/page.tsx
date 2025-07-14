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
  { id: "store-4", name: "Walmart Hypermart #4" },
  { id: "store-5", name: "Walmart City Center #5" },
  { id: "store-6", name: "Walmart Local #6" },
  { id: "store-7", name: "Walmart Plaza #7" },
  { id: "store-8", name: "Walmart Mart #8" },
  { id: "store-9", name: "Walmart Hub #9" },
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
  "store-4": [
    { id: "cam-6", name: "Bakery Camera" },
  ],
  "store-5": [
    { id: "cam-7", name: "Dairy Camera" },
  ],
  "store-6": [
    { id: "cam-8", name: "Frozen Foods Camera" },
  ],
  "store-7": [
    { id: "cam-9", name: "Pharmacy Camera" },
  ],
  "store-8": [
    { id: "cam-10", name: "Electronics Camera" },
  ],
  "store-9": [
    { id: "cam-11", name: "Garden Camera" },
  ],
};

const shelvesByCamera: { [key: string]: string[] } = {
  "cam-1": ["Shelf A1", "Shelf A2"],
  "cam-2": ["Shelf B1"],
  "cam-3": ["Shelf C1", "Shelf C2"],
  "cam-4": ["Shelf D1"],
  "cam-5": ["Shelf E1", "Shelf E2", "Shelf E3"],
  "cam-6": ["Shelf F1"],
  "cam-7": ["Shelf G1"],
  "cam-8": ["Shelf H1"],
  "cam-9": ["Shelf I1"],
  "cam-10": ["Shelf J1"],
  "cam-11": ["Shelf K1"],
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
  "Shelf F1": [
    { product: "Cake", percent: 75, image: "/mock/cake.jpg" },
  ],
  "Shelf G1": [
    { product: "Cheese", percent: 55, image: "/mock/cheese.jpg" },
  ],
  "Shelf H1": [
    { product: "Ice Cream", percent: 40, image: "/mock/icecream.jpg" },
  ],
  "Shelf I1": [
    { product: "Medicine", percent: 90, image: "/mock/medicine.jpg" },
  ],
  "Shelf J1": [
    { product: "TV", percent: 20, image: "/mock/tv.jpg" },
  ],
  "Shelf K1": [
    { product: "Plants", percent: 80, image: "/mock/plants.jpg" },
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

      {/* Store Selection Table */}
      {!selectedStore && (
        <div className="mb-6 overflow-x-auto">
          <label className="block text-gray-400 mb-2 font-semibold">Select Store</label>
          <table className="min-w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-4 py-2 text-gray-400 font-semibold">Store Name</th>
                <th className="px-4 py-2 text-gray-400 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.id} className="bg-[#334155]/60 rounded-xl">
                  <td className="px-4 py-3 font-bold text-white text-lg rounded-l-xl">{store.name}</td>
                  <td className="px-4 py-3 rounded-r-xl">
                    <button
                      className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow"
                      onClick={() => {
                        setSelectedStore(store.id);
                        setSelectedCamera(null);
                        setSelectedShelf(null);
                        setShowImage(null);
                      }}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Camera Selection Table */}
      {selectedStore && !selectedCamera && (
        <div className="mb-6 overflow-x-auto">
          <button
            className="mb-4 flex items-center gap-2 bg-green-800 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
            onClick={() => setSelectedStore(null)}
          >
            <span className="text-lg">&#8592;</span> Back to Stores
          </button>
          <label className="block text-gray-400 mb-2 font-semibold">Select Camera</label>
          <table className="min-w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-4 py-2 text-gray-400 font-semibold">Camera Name</th>
                <th className="px-4 py-2 text-gray-400 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {(camerasByStore[selectedStore] || []).map((cam: Camera) => (
                <tr key={cam.id} className="bg-[#334155]/60 rounded-xl">
                  <td className="px-4 py-3 font-bold text-white text-lg rounded-l-xl">{cam.name}</td>
                  <td className="px-4 py-3 rounded-r-xl">
                    <button
                      className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow"
                      onClick={() => {
                        setSelectedCamera(cam.id);
                        setSelectedShelf(null);
                        setShowImage(null);
                      }}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Shelf Selection Table */}
      {selectedCamera && !selectedShelf && (
        <div className="mb-6 overflow-x-auto">
          <button
            className="mb-4 flex items-center gap-2 bg-green-800 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
            onClick={() => setSelectedCamera(null)}
          >
            <span className="text-lg">&#8592;</span> Back to Cameras
          </button>
          <label className="block text-gray-400 mb-2 font-semibold">Select Shelf</label>
          <table className="min-w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-4 py-2 text-gray-400 font-semibold">Shelf ID</th>
                <th className="px-4 py-2 text-gray-400 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {(shelvesByCamera[selectedCamera] || []).map((shelf: string) => (
                <tr key={shelf} className="bg-[#334155]/60 rounded-xl">
                  <td className="px-4 py-3 font-bold text-white text-lg rounded-l-xl">{shelf}</td>
                  <td className="px-4 py-3 rounded-r-xl">
                    <button
                      className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow"
                      onClick={() => {
                        setSelectedShelf(shelf);
                        setShowImage(null);
                      }}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Shelf Details Table (already table) */}
      {selectedShelf && (
        <div className="bg-[#1e293b]/80 border border-[#334155] rounded-2xl shadow-lg p-6 backdrop-blur-md mt-6">
          <button
            className="mb-4 flex items-center gap-2 bg-green-800 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
            onClick={() => setSelectedShelf(null)}
          >
            <span className="text-lg">&#8592;</span> Back to Shelves
          </button>
          <h2 className="text-xl font-semibold mb-4 text-white">Products on {selectedShelf}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-gray-400 font-semibold">Product</th>
                  <th className="px-4 py-2 text-gray-400 font-semibold">% Available</th>
                  <th className="px-4 py-2 text-gray-400 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {(shelfDetails[selectedShelf] || []).map((item: ShelfDetail, idx: number) => (
                  <tr key={item.product} className="bg-[#334155]/60 rounded-xl">
                    <td className="px-4 py-3 font-bold text-white text-lg rounded-l-xl">{item.product}</td>
                    <td className="px-4 py-3 text-green-400 font-mono text-base">{item.percent}%</td>
                    <td className="px-4 py-3 rounded-r-xl">
                      <button
                        className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow"
                        onClick={() => setShowImage(idx)}
                      >
                        View Image
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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