import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Men",
    image: "https://source.unsplash.com/400x300/?men-clothing",
    href: "/ready-to-wear/men",
  },
  {
    name: "Women",
    image: "https://source.unsplash.com/400x300/?women-clothing",
    href: "/ready-to-wear/women",
  },
  {
    name: "Girls",
    image: "https://source.unsplash.com/400x300/?girls-fashion",
    href: "/ready-to-wear/girls",
  },
  {
    name: "Boys",
    image: "https://source.unsplash.com/400x300/?boys-clothing",
    href: "/ready-to-wear/boys",
  },
  {
    name: "Jewelry",
    image: "https://source.unsplash.com/400x300/?jewelry",
    href: "/ready-to-wear/jewelry",
  },
  {
    name: "Bags",
    image: "https://source.unsplash.com/400x300/?bags",
    href: "/ready-to-wear/bags",
  },
  {
    name: "Blouses",
    image: "https://source.unsplash.com/400x300/?blouses",
    href: "/ready-to-wear/blouses",
  },
];

const ReadyToWear: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Ready to Wear</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-medium mb-2">{category.name}</h2>
                <Link
                  to={category.href}
                  className="text-indigo-600 hover:underline"
                >
                  View More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadyToWear;
