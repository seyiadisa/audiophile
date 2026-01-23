"use client";

import { Product } from "@/types";
import { useEffect, useState } from "react";

export default function ProductView() {
  const initialProductState: Product = {
    isNew: false,
    shortName: "",
    name: "",
    image: "",
    price: 0,
    details: "",
    features: "",
    inTheBox: {},
    category: "headphones",
  };

  const [formData, setFormData] = useState<Product>(initialProductState);
  const [boxItems, setBoxItems] = useState<
    { item: string; quantity: number }[]
  >([{ item: "", quantity: 1 }]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);

  // Mock fetch products
  useEffect(() => {
    // TODO: Fetch from API
    // setProducts(fetchedProducts);
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      <div className="mb-6 flex gap-4">
        {["all", "headphones", "speakers", "earphones"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded border px-3 py-1 capitalize ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, idx) => (
            <div key={idx} className="rounded border p-4 shadow">
              <img
                src={product.image}
                alt={product.name}
                className="mb-4 h-48 w-full rounded object-cover"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="mb-2 text-sm text-gray-600">{product.category}</p>
              <p className="font-semibold">
                ${(product.price / 100).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
