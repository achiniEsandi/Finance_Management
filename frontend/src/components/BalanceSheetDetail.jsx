import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BalanceSheetDetail = () => {
  const { id } = useParams(); // Get the balance sheet ID from the URL
  const [balanceSheet, setBalanceSheet] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBalanceSheet = async () => {
      try {
        const response = await axios.get(`/api/balance-sheet/${id}`); // Corrected route
        setBalanceSheet(response.data);
      } catch (error) {
        console.error("Error fetching balance sheet data:", error);
        setError("Error fetching balance sheet data.");
      }
    };

    fetchBalanceSheet();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!balanceSheet) {
    return <div>Loading balance sheet data...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Balance Sheet Detail</h2>
      <div className="mb-4">
        <strong>Title:</strong> {balanceSheet.company}
      </div>
      <div className="mb-4">
        <strong>Date:</strong> {balanceSheet.date}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Assets</h3>
        <ul className="list-disc pl-6">
          {balanceSheet.assets?.map((asset, index) => (
            <li key={index}>
              {asset.name}: ${asset.amount}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Liabilities</h3>
        <ul className="list-disc pl-6">
          {balanceSheet.liabilities?.map((liability, index) => (
            <li key={index}>
              {liability.name}: ${liability.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BalanceSheetDetail;
