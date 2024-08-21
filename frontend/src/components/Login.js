import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './styles.css'; // Add this line if you have a CSS file for styling

function Login({ userType }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Implement authentication logic here
    // For now, we'll just navigate to the respective dashboard
    if (userType === 'merchant') {
      navigate('/merchant');
    } else if (userType === 'customer') {
      navigate('/customer');
    }
  };

  return (
    <div className="login-container">
      <h2>{userType === 'merchant' ? 'Merchant Login' : 'Customer Login'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
