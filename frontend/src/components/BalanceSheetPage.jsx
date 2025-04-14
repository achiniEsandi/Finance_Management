import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BalanceSheetPage = () => {
  const [balanceSheet, setBalanceSheet] = useState({
    assets: "",
    liabilities: "",
    equity: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBalanceSheet();
  }, []);

  // Fetch the balance sheet data
  const fetchBalanceSheet = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/balance-sheet");
      setBalanceSheet(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching balance sheet:", error);
      setLoading(false);
    }
  };

  // Navigate to update page
  const handleUpdateClick = () => {
    navigate("/update-balance-sheet");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Balance Sheet Details</h2>
      
      <div className="card">
        <div className="card-header">
          <h5>Balance Sheet Overview</h5>
        </div>
        <div className="card-body">
          <p><strong>Assets:</strong> LKR {balanceSheet.assets}</p>
          <p><strong>Liabilities:</strong> LKR {balanceSheet.liabilities}</p>
          <p><strong>Equity:</strong> LKR {balanceSheet.equity}</p>

          <button
            onClick={handleUpdateClick}
            className="btn btn-primary mt-3"
          >
            Update Balance Sheet
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceSheetPage;
