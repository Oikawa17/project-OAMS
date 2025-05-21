import React from "react";
import Sidebar from "../components/Sidebar";

function Profile() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "40px 32px" }}>
        <h1 style={{ color: "#228c22", fontWeight: 700, fontSize: "2rem" }}>
          Profile
        </h1>
        <p style={{ fontSize: "1.15rem", color: "#444", marginTop: 18 }}>
          Manage your profile information here.
        </p>
      </div>
    </div>
  );
}

export default Profile;