import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token1'); // Deriv provides token as token1
    const account = urlParams.get('acct1');
    const currency = urlParams.get('cur1');

    if (token) {
      // Save the token to localStorage
      localStorage.setItem('access_token', token);
      localStorage.setItem('account_id', account);
      localStorage.setItem('currency', currency);

      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      // If token not found, redirect to login
      navigate('/login-screen');
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h3>Processing your login...</h3>
      <p>Please wait while we redirect you.</p>
    </div>
  );
};

export default RedirectHandler;
