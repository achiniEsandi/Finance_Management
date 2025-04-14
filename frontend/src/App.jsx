import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import FinanceDashboard from "./components/FinanceDashboard"; 
import BalanceSheetList from "./components/BalanceSheetList";
import BalanceSheetDetail from "./components/BalanceSheetDetail";
import BalanceSheetUpdate from "./components/BalanceSheetUpdate";
import BalanceSheetPage from "./components/BalanceSheetPage";
import BalanceSheetForm from './components/BalanceSheetForm';
import PettyCashManagement from "./components/PettyCashManagement";
import AddTransaction from "./components/AddTransaction";
import PaymentPortal from "./components/PaymentPortal";
import AdminDashboard from "./components/AdminDashboard";
//import Sidebar from "./components/Sidebar";


function App() {
  return (
    <Router>
      <div
        className="d-flex"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >

       
      
        {/* Sidebar */}
        <div className="bg-light text-dark p-4" style={{ width: "250px", minHeight: "100vh", boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.1)" }}>
          <h3 className="mb-4">Admin Panel</h3>
          <div className="list-group">
            <Link to="/finance-dashboard" className="list-group-item list-group-item-action text-dark">
              Finance Dashboard
            </Link>
            {/*<Link to="/finance-dashboard/petty-cash" className="list-group-item list-group-item-action text-dark">
              Petty Cash Management
            </Link>*/}
            <Link to="/employee-dashboard" className="list-group-item list-group-item-action text-dark">
              Employee Dashboard
            </Link>
            <Link to="/quotation-dashboard" className="list-group-item list-group-item-action text-dark">
              Quotation History
            </Link>
            <Link to="/repair-dashboard" className="list-group-item list-group-item-action text-dark">
              Repair Job Requests
            </Link>
            <Link to="/appointment-dashboard" className="list-group-item list-group-item-action text-dark">
              Service Appointment Dashboard
            </Link>
            <Link to="/inventory-dashboard" className="list-group-item list-group-item-action text-dark">
              Inventory Management
            </Link>
          </div>
        </div>  

        {/* Main Content */}
        <div className="flex-grow-1 p-5">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            
            {/* Finance Dashboard as Parent Route */}
            <Route path="/finance-dashboard" element={<FinanceDashboard />}>
              <Route path="add-transaction" element={<AddTransaction />} />
              <Route path="payment-portal" element={<PaymentPortal />} />
              <Route path="petty-cash" element={<PettyCashManagement />} />
              {/*<Route path="balance-sheet/:id" element={<BalanceSheetDetail />} />
              <Route path="balance-sheets" element={<BalanceSheetList />} />
              <Route path="balance-sheet/update/:id" element={<BalanceSheetUpdate />} />*/}
              <Route path="add-balance-sheet" element={<BalanceSheetForm />} />
              <Route path="*" element={<h2>404 - Page Not Found</h2>} />
                

            </Route>

            
            <Route path="/employee-dashboard" element={<h2>Employee Dashboard (Coming Soon)</h2>} />
            <Route path="/quotation-dashboard" element={<h2>Quotation Dashboard (Coming Soon)</h2>} />
            <Route path="/service-dashboard" element={<h2>Service Appointments (Coming Soon)</h2>} />
            <Route path="/repair-dashboard" element={<h2>Repair Dashboard (Coming Soon)</h2>} />
            <Route path="/inventory-dashboard" element={<h2>Inventory Dashboard (Coming Soon)</h2>} />
            <Route path="/appointment-dashboard" element={<h2>Service Appointment Dashboard (Coming Soon)</h2>} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
