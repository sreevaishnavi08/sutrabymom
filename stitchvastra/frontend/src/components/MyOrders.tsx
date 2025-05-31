// src/components/MyOrders.tsx
import React, { useEffect } from "react";
import { useOrders } from "../context/OrderContext";

const MyOrders: React.FC = () => {
  const { orders, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders(); // Fetch orders when component loads
  }, [fetchOrders]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800"
            >
              <h2 className="font-medium text-gray-900 dark:text-white">
                Order #{order.id}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Date: {order.date}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Status: {order.status}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Items: {order.items.join(", ")}
              </p>
              <div className="mt-3">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Track Order
                </button>
                <button className="px-4 py-2 ml-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                  Help
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
