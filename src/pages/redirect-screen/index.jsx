// src/pages/redirect-screen/index.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token1');

    if (token) {
      localStorage.setItem('access_token', token);
      navigate('/dashboard'); // ✅ Redirect to dashboard after saving token
    } else {
      navigate('/login'); // fallback if no token
    }
  }, [navigate]);

  return <p>Logging in...</p>;
};

export default RedirectHandler;
