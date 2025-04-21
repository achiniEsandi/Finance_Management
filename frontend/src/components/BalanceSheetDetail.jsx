import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BalanceSheetDetail = () => {
  const { id } = useParams();
  const [balanceSheet, setBalanceSheet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalanceSheet = async () => {
      try {
        const response = await axios.get(`/api/balance-sheet/${id}`);
        setBalanceSheet(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBalanceSheet();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Balance Sheet for {balanceSheet.company}</h1>
      <div className="my-4">
        <h2 className="text-2xl font-semibold">Date: {balanceSheet.date}</h2>
        <h3 className="text-xl mt-2">Assets</h3>
        {balanceSheet.assets?.map((asset, index) => (
          <div key={index} className="flex justify-between">
            <span>{asset.name}</span>
            <span>{formatCurrency(asset.amount)}</span>
          </div>
        ))}
        <h3 className="text-xl mt-4">Liabilities</h3>
        {balanceSheet.liabilities?.map((liability, index) => (
          <div key={index} className="flex justify-between">
            <span>{liability.name}</span>
            <span>{formatCurrency(liability.amount)}</span>
          </div>
        ))}
        <h3 className="text-xl mt-4">Equity</h3>
        {balanceSheet.equity?.map((equity, index) => (
          <div key={index} className="flex justify-between">
            <span>{equity.name}</span>
            <span>{formatCurrency(equity.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BalanceSheetDetail;
