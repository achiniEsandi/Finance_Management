// src/components/ProfitLossManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/profit-loss';

const emptyEntry = {
  date: '',
  description: '',
  revenue: { serviceIncome: 0, sparePartsSales: 0, otherIncome: 0 },
  cogs:    { partsCost: 0, materialsCost: 0 },
  expenses:{ salaries: 0, rent: 0, utilities: 0, maintenance: 0, marketing: 0, depreciation: 0 },
  other:   { interestIncome: 0, interestExpense: 0, misc: 0 }
};

export default function ProfitLossManagement() {
  const [entries, setEntries] = useState([]);
  const [form, setForm]       = useState(emptyEntry);
  const [editingId, setEditingId] = useState(null);
  const [summary, setSummary] = useState(null);

  // Helpers to load data
  const fetchEntries = async () => {
    const res = await axios.get(`${baseUrl}/`);
    setEntries(res.data);
  };
  const fetchSummary = async () => {
    const now = new Date();
    const params = { month: now.getMonth()+1, year: now.getFullYear() };
    const res = await axios.get(`${baseUrl}/monthly`, { params });
    setSummary(res.data);
  };

  useEffect(() => {
    fetchEntries();
    fetchSummary();
  }, []);

  // Form handlers
  const handleChange = (section, field) => e => {
    const value = section
      ? { ...form[section], [field]: Number(e.target.value) }
      : e.target.value;
    setForm(prev => section
      ? ({ ...prev, [section]: value })
      : ({ ...prev, [field]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = { ...form };
    // ensure date is string
    payload.date = form.date;

    if (editingId) {
      await axios.put(`${baseUrl}/update/${editingId}`, payload);
    } else {
      await axios.post(`${baseUrl}/add`, payload);
    }
    setForm(emptyEntry);
    setEditingId(null);
    await fetchEntries();
    await fetchSummary();
  };

  const startEdit = entry => {
    setEditingId(entry._id);
    setForm({
      ...entry,
      date: entry.date.slice(0,10) // yyyy-mm-dd for <input type="date">
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async id => {
    if (!confirm('Delete this entry?')) return;
    await axios.delete(`${baseUrl}/delete/${id}`);
    await fetchEntries();
    await fetchSummary();
  };

  // Render
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* SUMMARY */}
      {summary && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h2 className="text-xl font-semibold mb-2">Monthly Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <Stat label="Total Revenue" value={summary.totalRevenue} />
            <Stat label="Total COGS"    value={summary.totalCOGS} />
            <Stat label="Gross Profit"  value={summary.grossProfit} />
            <Stat label="Op. Expenses"  value={summary.totalOperatingExpenses} />
            <Stat label="Op. Profit"    value={summary.operatingProfit} />
            <Stat label="Other (Net)"   value={summary.netOther} />
            <Stat label="Net Profit"    value={summary.netProfit} highlight />
          </div>
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded space-y-4">
        <h2 className="text-2xl font-bold">{editingId ? 'Edit' : 'Add'} Proft & Loss Entry</h2>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex-2">
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="mt-1 block w-full border rounded p-2"
              placeholder="e.g. April services & sales"
            />
          </div>
        </div>

        <Section title="Revenue" section="revenue" data={form} onChange={handleChange} />
        <Section title="COGS"    section="cogs"    data={form} onChange={handleChange} />
        <Section title="Expenses"section="expenses"data={form} onChange={handleChange} />
        <Section title="Other"   section="other"   data={form} onChange={handleChange} />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 font-semibold rounded hover:bg-green-700"
        >
          {editingId ? 'Update Entry' : 'Add Entry'}
        </button>
      </form>

      {/* ENTRY LIST */}
      <div className="bg-white shadow p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">All Entries</h2>
        {entries.length === 0 ? (
          <p className="text-gray-500">No entries yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Date</th>
                  <th className="p-2">Desc</th>
                  <th className="p-2">Rev</th>
                  <th className="p-2">COGS</th>
                  <th className="p-2">Exp</th>
                  <th className="p-2">Other</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map(e => (
                  <tr key={e._id} className="text-center border-t">
                    <td className="p-2">{e.date.slice(0,10)}</td>
                    <td className="p-2">{e.description}</td>
                    <td className="p-2">
                      {(e.revenue.serviceIncome + e.revenue.sparePartsSales + e.revenue.otherIncome).toLocaleString()}
                    </td>
                    <td className="p-2">
                      {(e.cogs.partsCost + e.cogs.materialsCost).toLocaleString()}
                    </td>
                    <td className="p-2">
                      {Object.values(e.expenses).reduce((a,b)=>a+b,0).toLocaleString()}
                    </td>
                    <td className="p-2">
                      {(e.other.interestIncome - e.other.interestExpense + e.other.misc).toLocaleString()}
                    </td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => startEdit(e)}
                        className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(e._id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-components

function Section({ title, section, data, onChange }) {
  return (
    <fieldset className="border p-4 rounded space-y-2">
      <legend className="font-semibold">{title}</legend>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(data[section]).map(([key, val]) => (
          <div key={key}>
            <label className="block text-sm">{key.replace(/([A-Z])/g,' $1')}</label>
            <input
              type="number"
              step="any"
              value={val}
              onChange={onChange(section, key)}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
        ))}
      </div>
    </fieldset>
  );
}

function Stat({ label, value, highlight = false }) {
  return (
    <div className={`p-3 rounded ${highlight ? 'bg-green-100' : 'bg-white'} border`}>
      <div className="text-sm text-gray-600">{label}</div>
      <div className={`text-xl font-bold ${highlight ? 'text-green-800' : 'text-gray-800'}`}>
        LKR {value.toFixed(2).toLocaleString()}
      </div>
    </div>
  );
}
