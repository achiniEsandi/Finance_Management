import { useState } from "react";

export default function BalanceSheetForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    company: "",
    date: "",
    assets: [{ name: "", amount: "" }],
    liabilities: [{ name: "", amount: "" }]
  });

  const handleChange = (e, index, type) => {
    const newItems = [...formData[type]];
    newItems[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [type]: newItems });
  };

  const handleAddField = (type) => {
    setFormData({
      ...formData,
      [type]: [...formData[type], { name: "", amount: "" }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      company: "",
      date: "",
      assets: [{ name: "", amount: "" }],
      liabilities: [{ name: "", amount: "" }]
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Add Balance Sheet</h2>
      <input
        type="text"
        placeholder="Company"
        className="input"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        required
      />
      <input
        type="date"
        className="input"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />

      <div>
        <h3 className="font-semibold">Assets</h3>
        {formData.assets.map((item, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              name="name"
              placeholder="Asset Name"
              value={item.name}
              onChange={(e) => handleChange(e, idx, "assets")}
              className="input flex-1"
            />
            <input
              name="amount"
              placeholder="Amount"
              type="number"
              value={item.amount}
              onChange={(e) => handleChange(e, idx, "assets")}
              className="input w-28"
            />
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-blue-500 underline"
          onClick={() => handleAddField("assets")}
        >
          + Add Asset
        </button>
      </div>

      <div>
        <h3 className="font-semibold">Liabilities</h3>
        {formData.liabilities.map((item, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              name="name"
              placeholder="Liability Name"
              value={item.name}
              onChange={(e) => handleChange(e, idx, "liabilities")}
              className="input flex-1"
            />
            <input
              name="amount"
              placeholder="Amount"
              type="number"
              value={item.amount}
              onChange={(e) => handleChange(e, idx, "liabilities")}
              className="input w-28"
            />
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-blue-500 underline"
          onClick={() => handleAddField("liabilities")}
        >
          + Add Liability
        </button>
      </div>

      <button type="submit" className="btn bg-blue-600 text-white">
        Submit
      </button>
    </form>
  );
}
