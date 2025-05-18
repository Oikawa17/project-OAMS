import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './messages.css';

function Messages() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  // Array of button info and logo paths
  const buttons = [
    { label: 'Dashboard', path: '/dashboard', logo: '/dash.png' },
    { label: 'Application Form', path: '/application-form', logo: '/form.png' },
    { label: 'Application Status', path: '/application-status', logo: '/status.png' },
    { label: 'Payment Information', path: '/payment-information', logo: '/payment.png' },
    { label: 'Documents Upload', path: '/document-upload', logo: '/docs.png' },
    { label: 'Messages', path: '/messages', logo: '/message.png' },
    { label: 'Profile', path: '/profile', logo: '/profile.png' },
    { label: 'Settings', path: '/settings', logo: '/settings.png' },
  ];

  return (
    <div className="messages-container">
      {/* Left side buttons */}
      <div
        className={`messages-sidebar${collapsed ? ' collapsed' : ''}`}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
      >
        {buttons.map((btn, idx) => (
          <div className="sidebar-btn-row" key={btn.label}>
            <img
              src={btn.logo}
              alt={btn.label + " logo"}
              className="sidebar-btn-logo"
            />
            <button onClick={() => navigate(btn.path)}>
              {btn.label}
            </button>
          </div>
        ))}
        {collapsed && (
          <div className="sidebar-icon">☰</div>
        )}
      </div>
      {/* Right side content */}
      <div className="messages-content">
        <div>
          <h3>Welcome to Messages</h3>
          <p>Select an option from the left to view details.</p>
        </div>
      </div>
    </div>
  );
}

export default Messages;