import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom"; // To navigate to Checkout

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  // State for the coupon code
  const [coupon, setCoupon] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0); // Store discount percentage (e.g., 10% => 0.1)

  // Calculate total cart value
  const totalPrice = cart.reduce(
    (total, item) => total + parseInt(item.price.replace("₹", "").replace(",", "")),
    0
  );

  // Apply Coupon Logic
  const applyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(0.1); // 10% discount
      alert("Coupon applied! You get a 10% discount.");
    } else {
      alert("Invalid coupon code.");
    }
  };

  // Apply discount to the total price
  const discountedPrice = totalPrice * (1 - discount);

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl max-w-lg mx-auto mt-16">
      <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-600">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-6">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-gray-500">{item.price}</p>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-800 transition">
                  <Trash className="w-6 h-6" />
                </button>
              </li>
            ))}
          </ul>

          {/* Total Price */}
          <div className="mt-6 text-right font-semibold text-xl">
            <div>Total: ₹{totalPrice.toLocaleString()}</div>
            {discount > 0 && (
              <div className="text-green-600 mt-2">Discount Applied: {discount * 100}%</div>
            )}
            {discount > 0 && (
              <div className="font-bold text-xl mt-2">
                Total After Discount: ₹{discountedPrice.toLocaleString()}
              </div>
            )}
          </div>

          {/* Apply Coupon Section */}
          <div className="mt-6">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <button
              onClick={applyCoupon}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Apply Coupon
            </button>
          </div>

          {/* Checkout Button */}
          <div className="mt-6">
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
