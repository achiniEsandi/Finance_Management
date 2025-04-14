// src/components/BalanceSheetList.js

//import { fetchBalanceSheets } from "../api/balanceSheet"; // import API call
/*
import React, { useEffect, useState } from "react";
import axios from "axios";

const BalanceSheetList = () => {
  const [balanceSheets, setBalanceSheets] = useState([]);

  // Fetch balance sheet data from backend
  useEffect(() => {
    const fetchBalanceSheets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/balance-sheet/all");
        setBalanceSheets(response.data);
      } catch (error) {
        console.error("Error fetching balance sheets:", error);
      }
    };

    fetchBalanceSheets();
  }, []);

  return (
    <div className="container">
      <h3>Balance Sheets</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Assets</th>
            <th>Total Liabilities</th>
            <th>Equity</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {balanceSheets.length > 0 ? (
            balanceSheets.map((sheet) => (
              <tr key={sheet._id}>
                <td>{new Date(sheet.createdAt).toLocaleDateString()}</td>
                <td>{sheet.assets}</td>
                <td>{sheet.liabilities}</td>
                <td>{sheet.equity}</td>
                <td>{sheet.description || "No description"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No balance sheets available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BalanceSheetList;*/
