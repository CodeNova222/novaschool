import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation,useNavigate } from 'react-router-dom';
import { ToastProvider } from './components/toastContext.js'; // Import the ToastProvider
import BottomNav from './components/BottomNav'; // Import BottomNav
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Calculator from './pages/Calculate';
import Quotes from './pages/Quote';
import Settings from './pages/Settings.js';
function App() {
  return (
    <Router>
      <ToastProvider> {/* Wrap the AppContent with ToastProvider */}
        <AppContent />
      </ToastProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user"); // Check if user data exists
    if (user && (location.pathname === "/login" || location.pathname === "/register")) {
      navigate("/"); // Redirect to home if logged in
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calculate" element={<Calculator />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      {/* Show BottomNav except on the /calculate page */}
      {location.pathname !== "/calculate" && <BottomNav />}
    </>
  );
}

export default App;
