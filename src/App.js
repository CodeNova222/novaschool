import './App.css'
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import BottomNav from "./components/BottomNav"; // Import BottomNav
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Calculator from './pages/Calculate';

function App() {
  return (
    <Router>
      <AppContent />
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
      </Routes>

      {/* Render BottomNav only if we're not on the '/calculate' page */}
      {location.pathname !== '/calculate' && <BottomNav />}
    </>
  );
}

export default App;
