import React from 'react';
import { useNavigate } from 'react-router-dom';

const BalanceSheetPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Balance Sheet Management</h2>
      <div className="flex flex-col gap-4">
        <button onClick={() => navigate('/balance-sheets')} className="bg-blue-500 text-white px-4 py-2 rounded">
          View Balance Sheets
        </button>
        <button onClick={() => navigate('/balance-sheets/add')} className="bg-green-500 text-white px-4 py-2 rounded">
          Add New Balance Sheet
        </button>
        <button onClick={() => navigate('/balance-sheets/dashboard')} className="bg-gray-700 text-white px-4 py-2 rounded">
          Finance Dashboard
        </button>
      </div>
    </div>
  );
};

export default BalanceSheetPage;
