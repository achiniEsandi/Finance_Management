import React, { useEffect, useState } from 'react';
import { getAllSheets, deleteSheet, getPDF } from '../api/balanceSheetAPI';
import { useNavigate } from 'react-router-dom';

const BalanceSheetList = () => {
  const [sheets, setSheets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSheets();
  }, []);

  const fetchSheets = async () => {
    const res = await getAllSheets();
    setSheets(res.data);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this balance sheet?")) {
      await deleteSheet(id);
      fetchSheets();
    }
  };

  const downloadPDF = async () => {
    const res = await getPDF();
    const blob = new Blob([res.data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'BalanceSheetReport.pdf';
    link.click();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Balance Sheets</h2>
      <button onClick={downloadPDF} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Download PDF
      </button>
      <div className="grid gap-4">
        {sheets.map((sheet) => (
          <div key={sheet._id} className="bg-white p-4 shadow rounded flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{sheet.title || 'Untitled Balance Sheet'}</h3>
              <p className="text-gray-500">{new Date(sheet.date).toLocaleDateString()}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => navigate(`/balance-sheets/${sheet._id}`)} className="text-blue-600">View</button>
              <button onClick={() => navigate(`/balance-sheets/edit/${sheet._id}`)} className="text-yellow-600">Edit</button>
              <button onClick={() => handleDelete(sheet._id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BalanceSheetList;
