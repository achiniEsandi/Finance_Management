// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="bg-light text-dark p-4"
      style={{ width: "250px", minHeight: "100vh", boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.1)" }}
    >
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
  );
};

export default Sidebar;
