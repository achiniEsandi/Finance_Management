import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BalanceSheetUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', date: '', assets: '', liabilities: '' });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/balance-sheets/${id}`);
      setFormData(res.data);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/balance-sheets/update/${id}`, formData);
    navigate('/balance-sheets');
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Balance Sheet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
        <input type="date" name="date" value={formData.date?.slice(0, 10)} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="number" name="assets" value={formData.assets} onChange={handleChange} placeholder="Assets" className="w-full p-2 border rounded" />
        <input type="number" name="liabilities" value={formData.liabilities} onChange={handleChange} placeholder="Liabilities" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default BalanceSheetUpdate;
