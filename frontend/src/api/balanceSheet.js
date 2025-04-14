// src/api/balanceSheet.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/balance-sheet/all"; // Replace with your backend API URL

// Fetch all balance sheets
export const fetchBalanceSheets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Returns an array of balance sheets
  } catch (error) {
    console.error("Error fetching balance sheets:", error);
    throw error;
  }
};

// Fetch a single balance sheet by ID
export const fetchBalanceSheet = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; // Returns a single balance sheet
  } catch (error) {
    console.error("Error fetching balance sheet:", error);
    throw error;
  }
};
