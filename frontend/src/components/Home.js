import React from 'react';
import { Link } from 'react-router-dom';
// import './styles.css'; // Add this line if you have a CSS file for styling

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Financial Dashboard</h1>
      <div className="login-register-options">
        <Link to="/login/merchant">
          <button className="login-button">Merchant Login</button>
        </Link>
        <Link to="/login/customer">
          <button className="login-button">Customer Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
