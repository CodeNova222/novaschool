import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation,useNavigate } from 'react-router-dom';
import { ToastProvider } from './components/toastContext.js';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Calculator from './pages/Calculate';
import Quotes from './pages/Quote';
import Settings from './pages/Settings.js';
import PDFViewer from './pages/PdfViwer.js';
import Booksshow from './showpages/Booksshow.js';
function App() {
  return (
    <Router>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    
    const user = localStorage.getItem("user");
    if (user && (location.pathname === "/login" || location.pathname === "/register")) {
      navigate("/");
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
        <Route path="/pdf" element={<PDFViewer />} />
        <Route path="/bookshow" element={<Booksshow />} />
      </Routes>
      {location.pathname !== "/calculate" && location.pathname !== "/pdf" && <BottomNav />}
    </>
  );
}

export default App;
