import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { applicationId } = location.state || {};
  const handleChange = () => {
    axios.post('http://localhost:5000/login/change-password', {
      application_id: applicationId,
      newPassword: newPassword
    }).then(() => {
      alert('Password changed successfully!');
      navigate('/dashboard');
    }).catch(err => alert('Failed to update password'));
  };

  return (
    <div>
      <h2>Change Password</h2>
      <input placeholder="New Password" onChange={e => setNewPassword(e.target.value)} />
      <button onClick={handleChange}>Change</button>
    </div>
  );
}

export default ChangePassword;
