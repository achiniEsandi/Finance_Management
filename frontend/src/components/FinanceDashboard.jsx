import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AddTransaction from "./AddTransaction";
import PaymentPortal from "./PaymentPortal";
import PettyCashManagement from "./PettyCashManagement";
import BalanceSheetForm from './BalanceSheetForm';
import BalanceSheetDetail from "./BalanceSheetDetail";

const FinanceDashboard = () => {
  const [reports, setReports] = useState({});
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/finance/reports");
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleDownload = async (type) => {
    let url = "";
    let filename = "";

    if (type === "pdf") {
      url = "http://localhost:5000/api/finance/reports/pdf";
      filename = "transaction-history.pdf";
    } else if (type === "excel") {
      url = "http://localhost:5000/api/finance/reports/excel";
      filename = "transaction-history.xlsx";
    } else if (type === "balance-sheet-pdf") {
      url = "http://localhost:5000/api/balance-sheet/pdf";
      filename = "balance-sheet.pdf";
    } else {
      console.error("Invalid report type:", type);
      return;
    }

    try {
      const response = await axios.get(url, {
        responseType: "blob",
        headers: { "Accept": "application/pdf" },
      });

      const blob = new Blob([response.data], {
        type: type.includes("pdf")
          ? "application/pdf"
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Error downloading ${type}:`, error);
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen p-7">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Finance Dashboard</h2>

        <button
          onClick={() => navigate("/")}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-gray-700"
        >
          ⬅ Back to Admin Dashboard
        </button>
        {/* Buttons Section */}
        <div className="flex flex-wrap gap-4 mb-4">

          {/* First Row (4 Buttons) */}
          <div className="flex gap-4 w-full justify-start flex-wrap">
            <button
              style={{ backgroundColor: '#213448' }}
              className="w-44 text-white text-base px-4 py-2 rounded-lg hover:opacity-90 ring-2 ring-blue-300"
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className="w-44 bg-blue-500 text-white text-base px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => setActiveTab("add-transaction")}
            >
              Add Transaction
            </button>
            <button
              className="w-44 bg-blue-500 text-white text-base px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => setActiveTab("add-balance-sheet")}
            >
              Add Balance Sheet
            </button>
            <button
              className="w-44 bg-blue-500 text-white text-base px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => setActiveTab("balance-sheet")}
            >
              Bank Book Management
            </button>
          </div>

          {/* Second Row (Centered) */}
          <div className="flex gap-4 w-full justify-start mt-2">
            <button
              className="w-44 bg-blue-500 text-white text-base px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => setActiveTab("payment-portal")}
            >
              Payment Portal
            </button>
            <button
              className="w-44 bg-blue-500 text-white text-base px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => setActiveTab("petty-cash")}
            >
              Petty Cash
            </button>
          </div>
        </div>





        {activeTab === "dashboard" && (
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-blue-700 underline">Financial Reports</h4>

            {reports?.profitLoss ? (
              <>
                <p className="mt-4 text-xl">
                  <strong>Profit & Loss:</strong><br />
                  Revenue: LKR {reports.profitLoss.revenue} &nbsp;|&nbsp;
                  Expenses: LKR {reports.profitLoss.expenses} &nbsp;|&nbsp;
                  Profit: LKR {reports.profitLoss.profit}
                </p>

                <div className="flex flex-wrap gap-4 mt-6">
                  <button onClick={() => handleDownload("pdf")} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Download Transaction History PDF</button>
                  <button onClick={() => handleDownload("excel")} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Download Transaction History Excel</button>
                  <button onClick={() => handleDownload("balance-sheet-pdf")} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">Download Balance Sheet PDF</button>
                </div>
              </>
            ) : (
              <p className="text-gray-700 mt-4">Loading report data...</p>
            )}
          </div>
        )}

        {activeTab === "add-transaction" && <AddTransaction />}
        {activeTab === "balance-sheet" && <BalanceSheetDetail />}
        {activeTab === "add-balance-sheet" && <BalanceSheetForm />}
        {activeTab === "payment-portal" && <PaymentPortal />}
        {activeTab === "petty-cash" && <PettyCashManagement />}
      </div>
    </div>
  );
};

export default FinanceDashboard;
