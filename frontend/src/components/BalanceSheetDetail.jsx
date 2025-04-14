// src/components/BalanceSheetDetail.js
/*import React, { useEffect, useState } from "react";
import { fetchBalanceSheet } from "../api/balanceSheet"; // import API call
import { useParams } from "react-router-dom"; // To get the ID from the URL

const BalanceSheetDetail = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [balanceSheet, setBalanceSheet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch balance sheet details on component mount
  useEffect(() => {
    const getBalanceSheet = async () => {
      try {
        const data = await fetchBalanceSheet(id);
        setBalanceSheet(data); // Set data in state
      } catch (error) {
        setError("Failed to load balance sheet");
      } finally {
        setLoading(false);
      }
    };

    getBalanceSheet();
  }, [id]);

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Balance Sheet Details</h2>
      {balanceSheet && (
        <div>
          <p><strong>Date:</strong> {new Date(balanceSheet.date).toLocaleDateString()}</p>
          <p><strong>Total Assets:</strong> {balanceSheet.totalAssets}</p>
          <p><strong>Total Liabilities:</strong> {balanceSheet.totalLiabilities}</p>
          <p><strong>Equity:</strong> {balanceSheet.equity}</p>
          <p><strong>Description:</strong> {balanceSheet.description}</p>
        </div>
      )}
    </div>
  );
};

export default BalanceSheetDetail;*/
