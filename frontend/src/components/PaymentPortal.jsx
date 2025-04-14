import React, { useState } from "react";
import axios from "axios";

const PaymentPortal = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    cardNumber: "",
    cvc: "",
    amount: "",
    paymentMethod: "",
    bankSlip: null,
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, bankSlip: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.post(
        "http://localhost:5000/api/payments/process-payment",
        formDataToSend
      );
      setMessage(response.data.message);

      // Reset form
      setFormData({
        customerName: "",
        email: "",
        cardNumber: "",
        cvc: "",
        amount: "",
        paymentMethod: "",
        bankSlip: null,
      });

      // Clear file input
      const fileInput = document.getElementById("bankSlipInput");
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/uploads/paymentPortal.jpg')" }}
    >
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Payment Portal</h2>
        {message && <div className="text-green-600 bg-green-100 p-2 mb-3 rounded">{message}</div>}
        {error && <div className="text-red-600 bg-red-100 p-2 mb-3 rounded">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Payment Method</label>
            <select
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              name="paymentMethod"
              onChange={handleChange}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Online Bank Slip">Online Bank Slip</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          {formData.paymentMethod && (
            <>
              <div>
                <label className="block text-sm font-medium">Customer Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                  name="customerName"
                  placeholder="Enter your name"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Amount</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                  name="amount"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              {formData.paymentMethod === "Credit Card" || formData.paymentMethod === "Debit Card" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium">Card Number</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                      name="cardNumber"
                      placeholder="Enter card number"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">CVC</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                      name="cvc"
                      placeholder="Enter CVC"
                      value={formData.cvc}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              ) : formData.paymentMethod === "Online Bank Slip" ? (
                <>
                  <div className="text-blue-600 bg-blue-100 p-2 rounded">
                    Company Account Details: 100254879650 (Sampath Bank - Nugegoda Branch)
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Upload Bank Slip</label>
                    <input
                      type="file"
                      className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                      name="bankSlip"
                      id="bankSlipInput"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                </>
              ) : (
                <div className="text-yellow-600 bg-yellow-100 p-2 rounded">
                  Payment Status: Processing
                </div>
              )}

              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Pay Now
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default PaymentPortal;
