// components/Checkout.tsx
import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import Payment from "./Payment";

const Checkout: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(1);
  const [selectedTailor, setSelectedTailor] = useState(location.state?.tailor || null);
  const [address, setAddress] = useState({ houseNo: "", street: "", city: "", pincode: "", state: "" });
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(50); // Default delivery charge
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [extraTailorCharge, setExtraTailorCharge] = useState(0);

  useEffect(() => {
    let basePrice = cart.reduce((total, item) => total + parseInt(item.price.replace("₹", "").replace(",", "")), 0);
    if (selectedTailor) {
      if (selectedTailor.price === "High") basePrice *= 1.2;
      else if (selectedTailor.price === "Medium") basePrice *= 1.1;
      else if (selectedTailor.price === "Low") basePrice *= 1.0;
      setExtraTailorCharge(selectedTailor.price === "High" ? 100 : selectedTailor.price === "Medium" ? 50 : 0);
    }
    setTotalPrice(basePrice + deliveryCharges + extraTailorCharge - couponDiscount);
  }, [cart, selectedTailor, deliveryCharges, extraTailorCharge, couponDiscount]);

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {step === 1 && (
        <>
          <h3 className="text-lg font-semibold mb-3">Delivery Address</h3>
          <input className="w-full p-2 border rounded-lg mb-3" placeholder="House No." onChange={(e) => setAddress({ ...address, houseNo: e.target.value })} />
          <input className="w-full p-2 border rounded-lg mb-3" placeholder="Street" onChange={(e) => setAddress({ ...address, street: e.target.value })} />
          <input className="w-full p-2 border rounded-lg mb-3" placeholder="City" onChange={(e) => setAddress({ ...address, city: e.target.value })} />
          <input className="w-full p-2 border rounded-lg mb-3" placeholder="Pincode" onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
          <input className="w-full p-2 border rounded-lg mb-3" placeholder="State" value={address.state} readOnly />
          
          <button
            onClick={() => navigate("/tailor-selection")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mb-4"
          >
            Choose Vastrakar
          </button>
          
          {selectedTailor && (
            <div className="p-4 border rounded-lg mb-4">
              <h3 className="text-lg font-semibold">Selected Tailor: {selectedTailor.name}</h3>
              <p>Price Category: {selectedTailor.price}</p>
              <p>Ratings: {selectedTailor.ratings} ⭐</p>
              <p>Distance: {selectedTailor.distance} km</p>
              <p>Time: {selectedTailor.time}</p>
            </div>
          )}
          
          <button onClick={() => setStep(2)} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
            Proceed to Order Summary
          </button>
        </>
      )}

      {step === 2 && (
        <div className="p-6 border rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <p>Items Total: ₹{cart.reduce((total, item) => total + parseInt(item.price.replace("₹", "").replace(",", "")), 0)}</p>
          <p>Delivery Charges: ₹{deliveryCharges}</p>
          <p>Tailor Extra Charges: ₹{extraTailorCharge}</p>
          <p>Coupon Discount: -₹{couponDiscount}</p>
          <h3 className="text-lg font-semibold mt-4">Total Price: ₹{totalPrice}</h3>
          <button onClick={() => setStep(3)} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition mt-4">
            Proceed to Payment
          </button>
        </div>
      )}
      
      {step === 3 && <Payment totalPrice={totalPrice} />}
    </div>
  );
};

export default Checkout;
