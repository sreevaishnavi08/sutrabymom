import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Recruitment from "./components/JoinUsPage";
import ApplyNow from "./components/ApplyNow";
import { ThemeProvider } from "./components/context/ThemeContext";
import AdminDashboard from "./components/AdminDashboard";
import VastrakarDashboard from "./components/VastrakarDashboard";
import SideMenu from "./components/SideMenu";
import FabricCollection from "./components/FabricCollection";
import WomenCustomization from "./components/customization/women/WomenCustomization";
import Cart from "./components/Cart";
import { CartProvider } from "./components/CartContext";
import Checkout from "./components/Checkout";
import TailorSelection from "./components/TailorSelection";
import OrderConfirmation from "./components/OrderConfirmation";
import { OrderProvider } from "./context/OrderContext";
import ReadyToWear from "./components/ReadyToWear";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider> {/* Ensuring cart state is available throughout the app */}
        <OrderProvider> {/* Fixed syntax error */}
          <Router>
            <div className="min-h-screen">
              <Navbar isSignedIn={false} />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/joinus" element={<Recruitment />} />
                <Route path="/apply-now" element={<ApplyNow />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/vastrakar-dashboard" element={<VastrakarDashboard />} />
                <Route path="/fabrics" element={<FabricCollection />} />
                <Route path="/customization/women" element={<WomenCustomization />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} /> 
                <Route path="/tailor-selection" element={<TailorSelection />} /> 
                <Route path="/order-confirmation" element={<OrderConfirmation />} /> 
                <Route path="/ready-to-wear" element={<ReadyToWear />} />
              </Routes>
            </div>
          </Router>
        </OrderProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
