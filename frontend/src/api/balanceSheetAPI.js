// src/api/balanceSheetAPI.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/balance-sheets"; // adjust based on your backend

export const getAllSheets = () => axios.get(BASE_URL);
export const deleteSheet = (id) => axios.delete(`${BASE_URL}/${id}`);
export const getPDF = (id) => axios.get(`${BASE_URL}/${id}/pdf`, { responseType: 'blob' });
