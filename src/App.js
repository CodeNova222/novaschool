import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastProvider } from './components/toastContext'; // Import the ToastProvider
import BottomNav from './components/BottomNav'; // Import BottomNav
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Calculator from './pages/Calculate';
import Quotes from './pages/Quote';

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
  const location = useLocation(); // Get the current location

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calculate" element={<Calculator />} />
        <Route path="/quotes" element={<Quotes />} />
      </Routes>

      {/* Render BottomNav only if we're not on the '/calculate' page */}
      {location.pathname !== '/calculate' && <BottomNav />}
    </>
  );
}

export default App;
