import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BalanceSheetDetail = () => {
  const { id } = useParams();
  const [sheet, setSheet] = useState(null);

  useEffect(() => {
    const fetchSheet = async () => {
      const res = await axios.get(`/api/balance-sheets/${id}`);
      setSheet(res.data);
    };
    fetchSheet();
  }, [id]);

  if (!sheet) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Balance Sheet Detail</h2>
      <p><strong>Title:</strong> {sheet.title}</p>
      <p><strong>Date:</strong> {new Date(sheet.date).toLocaleDateString()}</p>
      <p><strong>Assets:</strong> {sheet.assets}</p>
      <p><strong>Liabilities:</strong> {sheet.liabilities}</p>
    </div>
  );
};

export default BalanceSheetDetail;
