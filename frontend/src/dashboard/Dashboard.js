import React from "react";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div>
      <Sidebar />
      <div className="dashboard-main-content">
        <h1 className="dashboard-title">
          Welcome to the PTC OAMS Dashboard!
        </h1>
        <p className="dashboard-desc">
          Use the sidebar to navigate through your application, check your status, upload documents, send messages, and more.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;