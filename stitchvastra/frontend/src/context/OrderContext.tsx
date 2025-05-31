// src/context/OrderContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface Order {
  id: string;
  date: string;
  items: string[];
  status: string; // e.g., "In Progress", "Delivered"
}

interface OrderContextType {
  orders: Order[];
  fetchOrders: () => void; // Fetch orders from API
  addOrder: (order: Order) => void; // Add a new order
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = () => {
    // Simulate fetching orders from an API
    setTimeout(() => {
      setOrders([
        { id: "1", date: "2025-01-30", items: ["Shirt", "Trousers"], status: "Delivered" },
        { id: "2", date: "2025-01-28", items: ["Jacket"], status: "In Progress" },
      ]);
    }, 1000);
  };

  const addOrder = (order: Order) => {
    setOrders((prevOrders) => [...prevOrders, order]); // Add the new order to the existing orders
  };

  return (
    <OrderContext.Provider value={{ orders, fetchOrders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within an OrderProvider");
  return context;
};
