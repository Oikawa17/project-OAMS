import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

// Fixed green sidebar component using PNG icons and ptclogo
function FixedGreenSidebar({ onHover, onLeave }) {
  const icons = [
    { label: "Dashboard", path: "/dashboard", icon: "/dash.png" },
    { label: "Application Form", path: "/application-form", icon: "/form.png" },
    { label: "Application Status", path: "/application-status", icon: "/status.png" },
    { label: "Payment Information", path: "/payment-information", icon: "/payment.png" },
    { label: "Documents Upload", path: "/document-upload", icon: "/docs.png" },
    { label: "Messages", path: "/messages", icon: "/message.png" },
    { label: "Profile", path: "/profile", icon: "/profile.png" },
    { label: "Settings", path: "/settings", icon: "/settings.png" },
  ];
  return (
    <div
      className="fixed-green-sidebar"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <img src="/ptclogo.png" alt="PTC Logo" className="sidebar-logo-fixed" /> {/* ✅ Kept logo in fixed sidebar */}
      <nav className="sidebar-nav-fixed">
        {icons.map((item) => (
          <a key={item.label} href={item.path} title={item.label}>
            <img
              src={item.icon}
              alt={item.label}
              className="sidebar-fixed-icon"
              style={{ width: 28, height: 28 }}
            />
          </a>
        ))}
      </nav>
    </div>
  );
}

const buttons = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Application Form", path: "/application-form" },
  { label: "Application Status", path: "/application-status" },
  { label: "Payment Information", path: "/payment-information" },
  { label: "Documents Upload", path: "/document-upload" },
  { label: "Messages", path: "/messages" },
  { label: "Profile", path: "/profile" },
  { label: "Settings", path: "/settings" },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [forceExpand, setForceExpand] = useState(false);
  const navigate = useNavigate();

  // Expand sliding sidebar when hovering over fixed sidebar
  const handleFixedSidebarHover = () => setForceExpand(true);
  const handleFixedSidebarLeave = () => setForceExpand(false);

  return (
    <>
      <FixedGreenSidebar
        onHover={handleFixedSidebarHover}
        onLeave={handleFixedSidebarLeave}
      />
      <div
        className={`messages-sidebar${collapsed && !forceExpand ? " collapsed" : ""}`}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        style={{ left: 68 }} // ensure it sits next to the fixed sidebar
      >
        {/* ✅ Removed PTC logo from sliding sidebar */}
        {(!collapsed || forceExpand) && (
          <div style={{ display: "flex", alignItems: "center", margin: "10px auto 30px auto", width: "fit-content" }}>
            <span style={{ fontWeight: "bold", fontSize: 22, color: "#2c781d", letterSpacing: 1 }}>PTC OAMS</span>
          </div>
        )}

        {buttons.map((btn) => (
          <div className="sidebar-btn-row" key={btn.label}>
            <button onClick={() => navigate(btn.path)}>
              {btn.label}
            </button>
          </div>
        ))}

        {/* Sign Out Button */}
        {(!collapsed || forceExpand) && (
          <div className="sidebar-btn-row" style={{ marginTop: 30 }}>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
              style={{
                color: "#c62828",
                fontWeight: 700,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                marginLeft: 4,
              }}
            >
              Sign Out
            </button>
          </div>
        )}

        {collapsed && !forceExpand && (
          <img className="sidebar-icon" src="/logoptc.png" alt="Menu" />
        )}
      </div>
    </>
  );
}

export default Sidebar;
