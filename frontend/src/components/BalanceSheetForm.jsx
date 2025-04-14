import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BalanceSheetForm = () => {
  const [balanceSheets, setBalanceSheets] = useState([]);
  const [formData, setFormData] = useState({
    assets: {
      currentAssets: {
        cashBankBalances: "",
        accountsReceivable: "",
        inventory: "",
        prepaidExpenses: "",
      },
      nonCurrentAssets: {
        propertyPlantEquipment: "",
        machineryTools: "",
        vehicles: "",
        intangibleAssets: "",
      },
    },
    liabilities: {
      currentLiabilities: {
        accountsPayable: "",
        shortTermLoans: "",
        taxesPayable: "",
        wagesPayable: "",
      },
      nonCurrentLiabilities: {
        longTermLoans: "",
        leaseObligations: "",
        deferredTaxLiabilities: "",
      },
    },
    equity: {
      ownersCapital: "",
      retainedEarnings: "",
      shareholderContributions: "",
    },
    description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/balance-sheets/all")
      .then((response) => setBalanceSheets(response.data))
      .catch((error) =>
        console.error("Error fetching balance sheets:", error)
      );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setFormData((prev) => {
      let updated = { ...prev };
      let current = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      axios
        .put(`/api/balance-sheets/update/${editId}`, formData)
        .then((response) => {
          alert(response.data.message);
          setBalanceSheets(
            balanceSheets.map((sheet) =>
              sheet._id === editId ? response.data.updatedBalanceSheet : sheet
            )
          );
          resetForm();
        })
        .catch((error) =>
          console.error("Error updating balance sheet:", error)
        );
    } else {
      axios
        .post("/api/balance-sheets/add", formData)
        .then((response) => {
          alert(response.data.message);
          setBalanceSheets([response.data.balanceSheet, ...balanceSheets]);
          resetForm();
        })
        .catch((error) =>
          console.error("Error adding balance sheet:", error)
        );
    }
  };

  const handleEdit = (id) => {
    const sheetToEdit = balanceSheets.find((sheet) => sheet._id === id);
    setFormData(sheetToEdit);
    setEditMode(true);
    setEditId(id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/balance-sheets/delete/${id}`)
      .then((response) => {
        alert(response.data.message);
        setBalanceSheets(balanceSheets.filter((sheet) => sheet._id !== id));
      })
      .catch((error) =>
        console.error("Error deleting balance sheet:", error)
      );
  };

  const handleDownload = (id) => {
    const url = `/api/balance-sheets/pdf/${id}`;
    axios
      .get(url, {
        responseType: "blob",
        headers: { Accept: "application/pdf" },
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `balance-sheet-${id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) =>
        console.error("Error downloading balance sheet:", error)
      );
  };

  const resetForm = () => {
    setFormData({
      assets: {
        currentAssets: {
          cashBankBalances: "",
          accountsReceivable: "",
          inventory: "",
          prepaidExpenses: "",
        },
        nonCurrentAssets: {
          propertyPlantEquipment: "",
          machineryTools: "",
          vehicles: "",
          intangibleAssets: "",
        },
      },
      liabilities: {
        currentLiabilities: {
          accountsPayable: "",
          shortTermLoans: "",
          taxesPayable: "",
          wagesPayable: "",
        },
        nonCurrentLiabilities: {
          longTermLoans: "",
          leaseObligations: "",
          deferredTaxLiabilities: "",
        },
      },
      equity: {
        ownersCapital: "",
        retainedEarnings: "",
        shareholderContributions: "",
      },
      description: "",
    });
    setEditMode(false);
    setEditId(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">
        Balance Sheet Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="font-semibold text-xl">Assets</h2>
            <div className="space-y-2">
              <label>Cash & Bank Balances</label>
              <input
                type="number"
                name="assets.currentAssets.cashBankBalances"
                value={formData.assets.currentAssets.cashBankBalances}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <label>Accounts Receivable</label>
              <input
                type="number"
                name="assets.currentAssets.accountsReceivable"
                value={formData.assets.currentAssets.accountsReceivable}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-xl">Liabilities</h2>
            <div className="space-y-2">
              <label>Accounts Payable</label>
              <input
                type="number"
                name="liabilities.currentLiabilities.accountsPayable"
                value={formData.liabilities.currentLiabilities.accountsPayable}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <label>Short-Term Loans</label>
              <input
                type="number"
                name="liabilities.currentLiabilities.shortTermLoans"
                value={formData.liabilities.currentLiabilities.shortTermLoans}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-xl">Equity</h2>
          <div className="space-y-2">
            <label>Owner’s Capital</label>
            <input
              type="number"
              name="equity.ownersCapital"
              value={formData.equity.ownersCapital}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label>Retained Earnings</label>
            <input
              type="number"
              name="equity.retainedEarnings"
              value={formData.equity.retainedEarnings}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="mb-4">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          {editMode ? "Update Balance Sheet" : "Add Balance Sheet"}
        </button>
      </form>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Balance Sheets</h2>

      <div className="space-y-4">
        {balanceSheets.map((sheet) => (
          <div
            key={sheet._id}
            className="p-4 border border-gray-300 rounded-lg"
          >
            <h3 className="font-semibold text-lg">
              Balance Sheet #{sheet._id}
            </h3>
            <p>
              <strong>Description:</strong> {sheet.description}
            </p>
            <p>
              <strong>Assets:</strong> {JSON.stringify(sheet.assets, null, 2)}
            </p>
            <p>
              <strong>Liabilities:</strong>{" "}
              {JSON.stringify(sheet.liabilities, null, 2)}
            </p>
            <p>
              <strong>Equity:</strong> {JSON.stringify(sheet.equity, null, 2)}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => navigate(`/balance-sheet/${sheet._id}`)}
                className="bg-indigo-500 text-white px-3 py-2 rounded hover:bg-indigo-600"
              >
                Display
              </button>
              <button
                onClick={() => handleEdit(sheet._id)}
                className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(sheet._id)}
                className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => handleDownload(sheet._id)}
                className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BalanceSheetForm;
