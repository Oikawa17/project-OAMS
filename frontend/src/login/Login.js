import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [applicationId, setApplicationId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = () => {
  axios.post('http://localhost:5000/login', {
    application_id: applicationId,
    password: password
  })
  .then(res => {
    if (res.data.application_id) {
      localStorage.setItem('application_id', res.data.application_id); // Save application_id
    }

    if (res.data.changePassword) {
      navigate('/change-password', { state: { applicationId } });
    } else {
      navigate('/application-form'); // Redirect to form instead of dashboard
    }
  })
  .catch(err => alert(err.response.data));
};

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Application ID" onChange={e => setApplicationId(e.target.value)} />
      <input placeholder="Temporary Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
