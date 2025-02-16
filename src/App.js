import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BottomNav from "./components/BottomNav"; // Import BottomNav
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <BottomNav />
    </Router>
  );
}

export default App;
