// components/Payment.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment: React.FC<{ totalPrice: number }> = ({ totalPrice }) => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  // Handle Razorpay Payment
  const handleRazorpayPayment = async () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
      amount: totalPrice * 100, // Amount in paisa (INR * 100)
      currency: "INR",
      name: "StitchVastra",
      description: "Custom Tailoring Payment",
      image: "https://your-logo-url.com/logo.png",
      handler: function (response: any) {
        console.log("Payment Successful:", response);
        navigate("/order-confirmation"); // Redirect to success page
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  // Handle COD Payment
  const handleCODPayment = () => {
    alert("Your order has been placed with Cash on Delivery.");
    navigate("/order-confirmation"); // Redirect to success page
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Choose Payment Method</h3>
      <select
        className="w-full p-2 border rounded-lg mb-3"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="COD">Cash on Delivery (COD)</option>
        <option value="RAZORPAY">Razorpay (UPI, Card, Net Banking)</option>
      </select>

      {/* Confirm Payment */}
      <button
        onClick={paymentMethod === "COD" ? handleCODPayment : handleRazorpayPayment}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        {paymentMethod === "COD" ? "Place Order" : "Complete Payment"}
      </button>
    </div>
  );
};

export default Payment;
