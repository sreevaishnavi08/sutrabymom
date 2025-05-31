// components/TailorSelection.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Tailor {
  id: number;
  name: string;
  price: string;
  ratings: number;
  time: string;
  joined: string;
}

const TailorSelection: React.FC = () => {
  const [tailors, setTailors] = useState<Tailor[]>([]);
  const [sortOption, setSortOption] = useState("ratings");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tailors (dummy data for now)
    setTailors([
      { id: 1, name: "Tailor A", price: "High", ratings: 4.8, time: "2 days", joined: "2024-01-10" },
      { id: 2, name: "Tailor B", price: "Medium", ratings: 4.2, time: "3 days", joined: "2023-11-20" },
      { id: 3, name: "Tailor C", price: "Low", ratings: 3.9, time: "1 day", joined: "2024-02-01" },
    ]);
  }, []);

  const handleSort = (option: string) => {
    setSortOption(option);
    let sortedTailors = [...tailors];

    switch (option) {
      case "price-high":
        sortedTailors.sort((a, b) => (a.price > b.price ? -1 : 1));
        break;
      case "price-low":
        sortedTailors.sort((a, b) => (a.price < b.price ? -1 : 1));
        break;
      case "ratings":
        sortedTailors.sort((a, b) => b.ratings - a.ratings);
        break;
      case "time":
        sortedTailors.sort((a, b) => (a.time > b.time ? 1 : -1));
        break;
      case "recently-joined":
        sortedTailors.sort((a, b) => new Date(b.joined).getTime() - new Date(a.joined).getTime());
        break;
      default:
        break;
    }
    setTailors(sortedTailors);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Choose Your Tailor</h2>
      <select
        className="w-full p-2 border rounded-lg mb-4"
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value="ratings">Ratings</option>
        <option value="price-high">Price: High to Low</option>
        <option value="price-low">Price: Low to High</option>
        <option value="time">Least Time Taken</option>
        <option value="recently-joined">Recently Joined</option>
      </select>
      {tailors.map((tailor) => (
        <div key={tailor.id} className="border p-4 rounded-lg mb-4 shadow-sm">
          <h3 className="text-lg font-semibold">{tailor.name}</h3>
          <p>Price: {tailor.price}</p>
          <p>Ratings: {tailor.ratings} ⭐</p>
          <p>Time: {tailor.time}</p>
          <button
            onClick={() => navigate("/checkout", { state: { tailor } })}
            className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Select Tailor
          </button>
        </div>
      ))}
    </div>
  );
};

export default TailorSelection;
