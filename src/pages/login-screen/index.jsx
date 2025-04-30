import React, { useState, useEffect } from 'react';

const APP_ID = '68037';
const REDIRECT_URI = encodeURIComponent('http://localhost:3000/redirect'); // Change this on production

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in
  const [marketData, setMarketData] = useState(null); // To store market data
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token')); // Check for stored token

  useEffect(() => {
    // Fetch market data if not logged in or if logged in
    const fetchMarketData = async () => {
      try {
        const response = await fetch('https://api.deriv.com/market-data'); // Placeholder for market data API
        const data = await response.json();
        setMarketData(data);
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError('Failed to fetch market data');
      }
    };

    fetchMarketData();

    // Check if the user has a token in localStorage
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, [accessToken]);

  const handleLogin = () => {
    setIsLoading(true);
    setError('');
    const oauthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${APP_ID}&redirect_uri=${REDIRECT_URI}`;
    
    // Redirect to OAuth URL
    window.location.href = oauthUrl;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('access_token'); // Clear the stored token
    setAccessToken(null); // Reset access token in state
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', padding: '20px' }}>
      <h2>Deriv Market Data</h2>
      <p>Explore the market data even if you're not logged in.</p>

      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
      
      {!isLoggedIn ? (
        <>
          <button 
            onClick={handleLogin} 
            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Redirecting...' : 'Login with Deriv'}
          </button>

          <div style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '14px', color: '#6c757d' }}>
              By logging in, you agree to our <a href="#" style={{ color: '#007bff' }}>Terms of Service</a> and <a href="#" style={{ color: '#007bff' }}>Privacy Policy</a>.
            </p>
          </div>
        </>
      ) : (
        <>
          <h3>Welcome Back!</h3>
          <button 
            onClick={handleLogout} 
            style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px' }}
          >
            Logout
          </button>
        </>
      )}

      <div style={{ marginTop: '20px' }}>
        <h3>Market Data</h3>
        {marketData ? (
          <pre>{JSON.stringify(marketData, null, 2)}</pre>
        ) : (
          <p>Loading market data...</p>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
