import React, { useState } from "react";

function Navbar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "skills", label: "SKILLS" },
    { id: "projects", label: "PROJECTS" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "education", label: "EDUCATION" },
    { id: "certifications", label: "CERTIFICATIONS" },
    { id: "contact", label: "CONTACT" },
  ];

  const handleClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      <div className="navbar-inner">

        <a
          href="#home"
          className="navbar-logo"
          onClick={handleClick}
        >
          <span>DB</span>
          <small>//SEC</small>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>

          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={handleClick}
              className={
                activeSection === link.id
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              

              {link.label}
            </a>
          ))}

        </nav>

        <a
          href="#contact"
          className="nav-connect"
          onClick={handleClick}
        >
          CONNECT
          <span>↗</span>
        </a>

        <button
          className={menuOpen ? "menu-button open" : "menu-button"}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

    </header>
  );
}

export default Navbar;