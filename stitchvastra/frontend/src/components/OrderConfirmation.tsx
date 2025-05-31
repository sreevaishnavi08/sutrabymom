import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { useOrders } from "../context/OrderContext";

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { addOrder } = useOrders(); // Access addOrder
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/assets/success.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  const handleOrderPlacement = () => {
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(), // Add the current date
      items: ["Custom Shirt"], // Example item(s)
      status: "In Progress", // Example status
    };
    addOrder(newOrder); // Add the new order to the context
    navigate("/"); // Navigate to the home or orders page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        {animationData ? (
          <Lottie animationData={animationData} className="w-48 h-48 mx-auto" />
        ) : (
          <p>Loading...</p>
        )}
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Hurray! 🎉 Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-4">
          Your order is confirmed. We will notify you once it's ready.
        </p>
        <button
          onClick={handleOrderPlacement}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
