import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MerchantDashboard from './components/MerchantDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/merchant" element={<Login userType="merchant" />} />
        <Route path="/login/customer" element={<Login userType="customer" />} />
        <Route path="/merchant" element={<MerchantDashboard />} />
        <Route path="/customer" element={<CustomerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
