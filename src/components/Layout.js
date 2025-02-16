import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav"; // Import BottomNav component

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Outlet /> {/* This renders the current page */}
      <BottomNav /> {/* Bottom navigation stays on all pages */}
    </div>
  );
}
