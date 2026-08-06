import { Link } from "react-router-dom";
import { TiltCard } from "../components/Shared";

const SKILLS = [
  "Windows 10/11",
  "Linux",
  "TCP/IP",
  "DNS",
  "DHCP",
  "Python",
  "SQL",
  "C++",
  "HTML/CSS/JavaScript",
  "Network Troubleshooting",
  "Help Desk Support",
  "Technical Documentation",
];

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-tag">Welcome to my portfolio</div>
        <h1 className="hero-title">
          Hi, I'm <span className="glow-text">Dhruv Bhatt</span>
        </h1>
        <p className="hero-role">Computer Science Student · IT Support & Cybersecurity</p>
        <p className="hero-bio">
          Computer Science student at the University of Regina with a
          Google IT Support and Google Cybersecurity Professional
          Certificate. Comfortable across Windows, Linux, networking
          fundamentals, and hardware/software troubleshooting — looking
          for IT Support, Help Desk, or Junior IT opportunities.
        </p>
        <div className="hero-actions">
          <Link to="/experience" className="btn btn-primary">
            View Experience
          </Link>
          <Link to="/certificates" className="btn btn-outline">
            See Certificates
          </Link>
          <a href="/Dhruv_Bhatt.pdf" download className="btn btn-outline">
            Download Resume
          </a>
        </div>
      </section>

      <TiltCard className="panel">
        <h2>Skills</h2>
        <div className="skills-grid">
          {SKILLS.map((s) => (
            <span key={s} className="skill-chip">
              {s}
            </span>
          ))}
        </div>
      </TiltCard>

      <div className="top-section" style={{ marginTop: 28 }}>
        <TiltCard className="card">
          <h2>Education</h2>
          <p className="blue">B.Sc Computer Science</p>
        </TiltCard>
        <TiltCard className="card">
          <h2>Certificates</h2>
          <p className="green">3 Earned</p>
        </TiltCard>
        <TiltCard className="card">
          <h2>Languages</h2>
          <p className="blue">English, Hindi, Gujarati</p>
        </TiltCard>
        <TiltCard className="card">
          <h2>Availability</h2>
          <p className="green">Open to Internships</p>
        </TiltCard>
      </div>

      <TiltCard className="panel" style={{ textAlign: "center" }}>
        <h2>Get in Touch</h2>
        <p style={{ color: "#9aa2b3", marginBottom: 16 }}>
          Regina, Saskatchewan, Canada
        </p>
        <div className="hero-actions" style={{ flexWrap: "wrap" }}>
          <a href="mailto:bhattdhruv115@gmail.com" className="btn btn-primary">
            Email Me
          </a>
          <a href="tel:+13065299566" className="btn btn-outline">
            Call
          </a>
          <a href="https://linkedin.com/in/dhruv-bhatt-301913326" target="_blank" rel="noreferrer" className="btn btn-outline">
            LinkedIn
          </a>
        </div>
      </TiltCard>
    </div>
  );
}