import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Existing imports
import FinanceDashboard from "./components/FinanceDashboard";
import BalanceSheetPage from "./components/BalanceSheetPage";
import BalanceSheetForm from "./components/BalanceSheetForm";
import BalanceSheetList from "./components/BalanceSheetList";
import BalanceSheetDetail from "./components/BalanceSheetDetail";
import BalanceSheetUpdate from "./components/BalanceSheetUpdate";
import AddBalanceSheetPage from "./components/AddBalanceSheetPage";
import PettyCashManagement from "./components/PettyCashManagement";
import AddTransaction from "./components/AddTransaction";
import PaymentPortal from "./components/PaymentPortal";
import AdminDashboard from "./components/AdminDashboard";
import QuotationDashboard from "./components/QuotationDashboard";
import QuotationHistory from "./pages/QuotationHistory";

// New Bank Book Components
import BankAccounts from "./pages/BankAccounts";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <Router>
      <div className="d-flex" style={{ backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh" }}>
        {/* Sidebar */}
        <div className="bg-light text-dark p-4" style={{ width: "250px", minHeight: "100vh", boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.1)" }}>
          <h3 className="mb-4">Admin Panel</h3>
          <div className="list-group">
            <Link to="/finance-dashboard" className="list-group-item list-group-item-action text-dark">Finance Dashboard</Link>
            <Link to="/finance-dashboard/balance-sheet" className="list-group-item list-group-item-action text-dark">Balance Sheet Management</Link>
            <Link to="/finance-dashboard/bank-accounts" className="list-group-item list-group-item-action text-dark">Bank Accounts</Link>
            <Link to="/finance-dashboard/bank-transactions" className="list-group-item list-group-item-action text-dark">Bank Transactions</Link>
            <Link to="/employee-dashboard" className="list-group-item list-group-item-action text-dark">Employee Dashboard</Link>
            <Link to="/quotation-dashboard" className="list-group-item list-group-item-action text-dark">Quotation Dashboard</Link>
            <Link to="/repair-dashboard" className="list-group-item list-group-item-action text-dark">Repair Job Requests</Link>
            <Link to="/appointment-dashboard" className="list-group-item list-group-item-action text-dark">Service Appointment Dashboard</Link>
            <Link to="/inventory-dashboard" className="list-group-item list-group-item-action text-dark">Inventory Management</Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-5">
          <Routes>
            {/* Admin Home */}
            <Route path="/" element={<AdminDashboard />} />

            {/* Finance Dashboard */}
            <Route path="/finance-dashboard" element={<FinanceDashboard />} />
            <Route path="/finance-dashboard/add-transaction" element={<AddTransaction />} />
            <Route path="/finance-dashboard/payment-portal" element={<PaymentPortal />} />
            <Route path="/finance-dashboard/petty-cash" element={<PettyCashManagement />} />
            
            {/* Bank Book Management */}
            <Route path="/finance-dashboard/bank-accounts" element={<BankAccounts />} />
            <Route path="/finance-dashboard/bank-transactions" element={<Transactions />} />

            {/* Balance Sheet Routes */}
            <Route path="/finance-dashboard/balance-sheet" element={<BalanceSheetForm />} />
            <Route path="/balance-sheets/add" element={<AddBalanceSheetPage />} />
            <Route path="/balance-sheets" element={<BalanceSheetList />} />
            <Route path="/balance-sheets/dashboard" element={<FinanceDashboard />} />
            <Route path="/finance-dashboard/balance-sheet/:id" element={<BalanceSheetDetail />} />
            <Route path="/finance-dashboard/balance-sheet/update/:id" element={<BalanceSheetUpdate />} />

            {/* Other Dashboards */}
            <Route path="/employee-dashboard" element={<h2>Employee Dashboard (Coming Soon)</h2>} />
            <Route path="/quotation-dashboard" element={<QuotationDashboard />} />
            <Route path="/RepairadminDash" element={<h2>Repair Dashboard (Coming Soon)</h2>} />
            <Route path="/inventory-dashboard" element={<h2>Inventory Dashboard (Coming Soon)</h2>} />
            <Route path="/appointment-dashboard" element={<h2>Service Appointment Dashboard (Coming Soon)</h2>} />

            {/* Misc Pages */}
            <Route path="/quotation-history" element={<QuotationHistory />} />

            {/* 404 Fallback */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
