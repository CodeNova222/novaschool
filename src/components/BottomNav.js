import { NavLink } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import './../assets/styles/bottom.css';

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavItem to="/" icon="bx bx-home" label="سەرەتا" />
      <NavItem to="/library" icon="bx bx-calculator" label="حاسیبە" />
      <NavItem to="/profile" icon="bx bx-calendar" label="خشتەكان" />
      <NavItem to="/quotes" icon="bx bxs-quote-alt-right" label="وتەكان" />
      <NavItem to="/settings" icon="bx bx-cog" label="ڕیكخستەكان" />
    </nav>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} // Conditionally apply 'active' class
    >
      <i className={`${icon} icon`}></i>
      <span className="label">{label}</span>
    </NavLink>
  );
}
