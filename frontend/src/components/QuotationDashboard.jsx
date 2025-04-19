// src/components/QuotationDashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateQuotation from '../pages/CreateQuotation';
import QuotationHistory from '../pages/QuotationHistory';
import QuotationList from './QuotationList';
import QuotationDetails from './QuotationDetails';

const QuotationDashboard = () => {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<CreateQuotation />} />
        <Route path="quotations" element={<QuotationList />} />
        <Route path="list/:id" element={<QuotationDetails />} />
        <Route path="quotation-history" element={<QuotationHistory />} />
      </Routes>
    </div>
  );
};

export default QuotationDashboard;
