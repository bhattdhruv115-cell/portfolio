import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) => "nav-link" + (isActive ? " active" : "");

  return (
    <nav className="navbar">
      <div className="nav-logo">DV<span>.</span></div>
      <div className="nav-links">
        <NavLink to="/" className={linkClass} end>Home</NavLink>
        <NavLink to="/experience" className={linkClass}>Experience</NavLink>
        <NavLink to="/certificates" className={linkClass}>Certificates</NavLink>
        <NavLink to="/dashboard" className={linkClass}>Project</NavLink>
      </div>
    </nav>
  );
}