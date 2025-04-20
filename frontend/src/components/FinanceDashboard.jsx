import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AddTransaction from "./AddTransaction";
import PaymentPortal from "./PaymentPortal";
import PettyCashManagement from "./PettyCashManagement";
import BalanceSheetForm from "./BalanceSheetForm";
import BalanceSheetDetail from "./BalanceSheetDetail";

const FinanceDashboard = () => {
  const [reports, setReports] = useState(null);
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

    switch (type) {
      case "pdf":
        url = "http://localhost:5000/api/finance/reports/pdf";
        filename = "transaction-history.pdf";
        break;
      case "excel":
        url = "http://localhost:5000/api/finance/reports/excel";
        filename = "transaction-history.xlsx";
        break;
      case "balance-sheet-pdf":
        url = "http://localhost:5000/api/balance-sheet/pdf";
        filename = "balance-sheet.pdf";
        break;
      default:
        console.error("Invalid report type:", type);
        return;
    }

    try {
      const response = await axios.get(url, {
        responseType: "blob",
        headers: { Accept: "application/pdf" },
      });

      const blob = new Blob([response.data], {
        type: type.includes("pdf")
          ? "application/pdf"
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
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
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Finance Dashboard</h2>

        <button
          onClick={() => navigate("/")}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg mb-6 hover:bg-gray-800"
        >
          ⬅ Back to Admin Dashboard
        </button>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          {[
            { label: "Dashboard", value: "dashboard", bg: "#213448" },
            { label: "Add Transaction", value: "add-transaction" },
            { label: "Add Balance Sheet", value: "add-balance-sheet" },
            { label: "Balance Sheet Detail", value: "balance-sheet" },
            { label: "Payment Portal", value: "payment-portal" },
            { label: "Petty Cash", value: "petty-cash" },
          ].map((tab) => (
            <button
              key={tab.value}
              className={`w-48 text-white px-4 py-2 rounded-lg ring-2 ring-blue-300 hover:opacity-90 ${
                activeTab === tab.value
                  ? "bg-blue-700"
                  : tab.bg
                  ? `bg-[${tab.bg}]`
                  : "bg-blue-500"
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "dashboard" && (
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-blue-700 underline">Financial Reports</h4>
            {reports ? (
              <>
                <p className="mt-4 text-lg">
                  <strong>Revenue:</strong> LKR {reports.profitLoss.revenue} &nbsp;|&nbsp;
                  <strong>Expenses:</strong> LKR {reports.profitLoss.expenses} &nbsp;|&nbsp;
                  <strong>Profit:</strong> LKR {reports.profitLoss.profit}
                </p>

                <div className="flex flex-wrap gap-4 mt-6">
                  <button
                    onClick={() => handleDownload("pdf")}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Download Transaction History PDF
                  </button>
                  <button
                    onClick={() => handleDownload("excel")}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Download Transaction History Excel
                  </button>
                  <button
                    onClick={() => handleDownload("balance-sheet-pdf")}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Download Balance Sheet PDF
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-600 mt-4">Loading report data...</p>
            )}
          </div>
        )}

        {activeTab === "add-transaction" && <AddTransaction />}
        {activeTab === "add-balance-sheet" && <BalanceSheetForm />}
        {activeTab === "balance-sheet" && <BalanceSheetDetail />}
        {activeTab === "payment-portal" && <PaymentPortal />}
        {activeTab === "petty-cash" && <PettyCashManagement />}
      </div>
    </div>
  );
};

export default FinanceDashboard;
