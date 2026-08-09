import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  /* =====================================================
     ACTIVE SECTION
     ===================================================== */

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.15, 0.3, 0.5, 0.7],
        rootMargin: "-15% 0px -45% 0px",
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  /* =====================================================
     SCROLL REVEAL
     ===================================================== */

  useEffect(() => {
    const elements =
      document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  /* =====================================================
     SKILLS
     ===================================================== */

  const skills = [
    {
      icon: "🛡️",
      title: "Cybersecurity",
      skills: [
        "Network Security",
        "Threat Detection",
        "Security Monitoring",
        "Incident Response",
        "Vulnerability Assessment",
        "Security Fundamentals",
      ],
    },
    {
      icon: "💻",
      title: "Programming",
      skills: [
        "C++",
        "Python",
        "JavaScript",
        "React",
        "HTML",
        "CSS",
      ],
    },
    {
      icon: "🌐",
      title: "Networking",
      skills: [
        "TCP/IP",
        "OSI Model",
        "Network Troubleshooting",
        "Linux Networking",
        "Virtual Machines",
        "System Administration",
      ],
    },
    {
      icon: "⚙️",
      title: "Tools",
      skills: [
        "VS Code",
        "Git",
        "GitHub",
        "VirtualBox",
        "Kali Linux",
        "Arduino",
      ],
    },
  ];

  /* =====================================================
     PROJECTS
     ===================================================== */

  const projects = [
    {
      number: "01",
      title: "Cyber Security Dashboard",
      description:
        "An interactive cybersecurity dashboard for monitoring system security, threats, firewall activity, network status, and security events.",
      tags: ["React", "CSS", "Cybersecurity"],
      status: "ACTIVE",
    },
    {
      number: "02",
      title: "Personal Portfolio",
      description:
        "A modern cybersecurity portfolio designed to showcase technical skills, projects, certifications, education, and professional experience.",
      tags: ["React", "Vite", "CSS"],
      status: "ONLINE",
    },
    {
      number: "03",
      title: "Network Security Lab",
      description:
        "Hands-on cybersecurity and networking experiments using Linux, virtual machines, network configurations, and security tools.",
      tags: ["Kali Linux", "Networking", "VirtualBox"],
      status: "LAB",
    },
    {
      number: "04",
      title: "Arduino Projects",
      description:
        "Hardware and software experiments using Arduino, LED matrices, sensors, and embedded programming.",
      tags: ["Arduino", "C++", "Hardware"],
      status: "COMPLETE",
    },
  ];

  /* =====================================================
     EXPERIENCE
     ===================================================== */

  const experience = [
    {
      date: "2024 — PRESENT",
      company: "Best Buy",
      role: "Technology / Retail Experience",
      description:
        "Developing customer service, technology communication, troubleshooting, and product knowledge in a technology-focused retail environment.",
    },
    {
      date: "2025 — PRESENT",
      company: "Lotto Spot",
      role: "Customer Service",
      description:
        "Developing communication, customer service, transaction handling, and problem-solving skills.",
    },
    {
      date: "2025",
      company: "KFC",
      role: "Team Member",
      description:
        "Developed teamwork, communication, time management, and problem-solving skills in a fast-paced environment.",
    },
    {
      date: "VOLUNTEER",
      company: "Regina Food Bank",
      role: "Volunteer",
      description:
        "Contributing to the community through regular volunteer work and collaborative service activities.",
    },
  ];

  /* =====================================================
     CERTIFICATIONS
     ===================================================== */

  const certifications = [
    {
      icon: "🔐",
      title: "Google Cybersecurity Certificate",
      issuer: "Google / Coursera",
      status: "VERIFIED",
      file: "/certificates/google-cybersecurity.png",
    },
    {
      icon: "🖥️",
      title: "Google IT Support Certificate",
      issuer: "Google / Coursera",
      status: "VERIFIED",
      file: "/certificates/google-it-support.png",
    },
    {
      icon: "🎯",
      title: "TryHackMe Pre Security",
      issuer: "TryHackMe",
      status: "VERIFIED",
      file: "/certificates/tryhackme-presecurity.png",
    },
  ];

  return (
    <>
      {/* =================================================
          SPACE BACKGROUND
          ================================================= */}

      <div className="space-background">
        <div className="stars stars-small"></div>
        <div className="stars stars-medium"></div>
        <div className="stars stars-large"></div>

        <div className="nebula nebula-one"></div>
        <div className="nebula nebula-two"></div>

        <div className="planet-glow"></div>
      </div>

      <div className="space-overlay"></div>

      {/* =================================================
          NAVBAR
          ================================================= */}

      <Navbar activeSection={activeSection} />

      <main>

        {/* =================================================
            HERO
            ================================================= */}

        <section
          id="home"
          className="hero section reveal"
        >
          <div className="hero-content">

            <div className="hero-status">
              <span className="status-dot"></span>
              SYSTEM ONLINE
            </div>

            <p className="hero-command">
              <span>$</span> whoami
            </p>

            <h1>
              DHRUV
              <span>BHATT</span>
            </h1>

            <div className="hero-line"></div>

            <h2>
              COMPUTER SCIENCE STUDENT
              <span>•</span>
              CYBERSECURITY
            </h2>

            <p className="hero-description">
              I build, explore, and secure technology
              while developing practical skills in
              cybersecurity, networking, programming,
              and information technology.
            </p>

            <div className="hero-buttons">

              <a
                href="#projects"
                className="space-button primary"
              >
                VIEW PROJECTS
                <span>→</span>
              </a>

              <a
                href="/Dhruv_Bhatt.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="space-button"
              >
                VIEW RESUME
                <span>↗</span>
              </a>

              <a
                href="#contact"
                className="space-button"
              >
                CONTACT ME
                <span>↗</span>
              </a>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="hero-visual">

            <div className="orbit orbit-one"></div>

            <div className="orbit orbit-two"></div>

            <div className="security-orb">

              <div className="orb-inner">

                <div className="orb-shield">
                  🛡️
                </div>

                <span>
                  SECURE
                </span>

              </div>

            </div>

            <div className="floating-card card-one">

              <span>
                THREATS
              </span>

              <strong>
                00
              </strong>

            </div>

            <div className="floating-card card-two">

              <span>
                FIREWALL
              </span>

              <strong>
                ACTIVE
              </strong>

            </div>

          </div>


          <div className="scroll-hint">

            <span></span>

            SCROLL TO EXPLORE

          </div>

        </section>


        {/* =================================================
            ABOUT
            ================================================= */}

        <section
          id="about"
          className="section reveal"
        >

          <div className="section-heading">

            <span>01</span>

            <div>

              <small>
                IDENTITY FILE
              </small>

              <h2>
                ABOUT ME
              </h2>

            </div>

          </div>


          <div className="about-grid">

            <div className="glass-panel about-main">

              <div className="panel-label">

                USER_PROFILE

                <span>
                  ONLINE
                </span>

              </div>

              <h3>

                Technology isn't just something I study.

                <em>
                  {" "}It's something I build.
                </em>

              </h3>

              <p>
                I'm a Computer Science student at the
                University of Regina with a strong
                interest in cybersecurity, networking,
                programming, and information technology.
              </p>

              <p>
                I enjoy understanding how systems work,
                solving technical problems, experimenting
                with security technologies, and turning
                ideas into functional projects.
              </p>

              <p>
                My long-term goal is to build a career
                in cybersecurity while continuing to
                develop strong programming, networking,
                cloud, and security skills.
              </p>

              <div className="about-tags">

                <span>
                  CYBERSECURITY
                </span>

                <span>
                  NETWORKING
                </span>

                <span>
                  PROGRAMMING
                </span>

                <span>
                  IT
                </span>

              </div>

            </div>


            <div className="terminal-panel">

              <div className="terminal-top">

                <span className="terminal-dot red"></span>

                <span className="terminal-dot yellow"></span>

                <span className="terminal-dot green"></span>

                <span>
                  profile.sh
                </span>

              </div>

              <div className="terminal-body">

                <p>
                  <b>$</b> cat profile.txt
                </p>

                <div className="terminal-output">

                  Name: Dhruv Bhatt
                  <br />

                  Field: Computer Science
                  <br />

                  Focus: Cybersecurity
                  <br />

                  Status: Student
                  <br />

                  Location: Canada
                  <br />

                  Mission: Build. Learn. Secure.

                </div>

                <p>

                  <b>$</b>{" "}

                  <span className="cursor">
                    _
                  </span>

                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            SKILLS
            ================================================= */}

        <section
          id="skills"
          className="section reveal"
        >

          <div className="section-heading">

            <span>02</span>

            <div>

              <small>
                TECHNICAL DATABASE
              </small>

              <h2>
                SKILLS
              </h2>

            </div>

          </div>


          <div className="skills-grid">

            {skills.map((category) => (

              <div
                className="skill-card glass-panel"
                key={category.title}
              >

                <div className="skill-icon">
                  {category.icon}
                </div>

                <h3>
                  {category.title}
                </h3>

                <div className="skill-items">

                  {category.skills.map((skill) => (

                    <span key={skill}>

                      <b>
                        ›
                      </b>

                      {skill}

                    </span>

                  ))}

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =================================================
            PROJECTS
            ================================================= */}

        <section
          id="projects"
          className="section reveal"
        >

          <div className="section-heading">

            <span>03</span>

            <div>

              <small>
                MISSION ARCHIVE
              </small>

              <h2>
                PROJECTS
              </h2>

            </div>

          </div>


          <div className="projects-grid">

            {projects.map((project) => (

              <article
                className="project-card glass-panel"
                key={project.number}
              >

                <div className="project-header">

                  <span>
                    {project.number}
                  </span>

                  <small>
                    ● {project.status}
                  </small>

                </div>


                <div className="project-body">

                  <label>
                    /mission/{project.number}
                  </label>

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {project.description}
                  </p>

                  <div className="project-tags">

                    {project.tags.map((tag) => (

                      <span key={tag}>
                        {tag}
                      </span>

                    ))}

                  </div>

                </div>


                <div className="project-footer">

                  SECURITY_LEVEL: ACTIVE

                  <span>
                    ↗
                  </span>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/* =================================================
            EXPERIENCE
            ================================================= */}

        <section
          id="experience"
          className="section reveal"
        >

          <div className="section-heading">

            <span>04</span>

            <div>

              <small>
                OPERATION HISTORY
              </small>

              <h2>
                EXPERIENCE
              </h2>

            </div>

          </div>


          <div className="timeline">

            {experience.map((item, index) => (

              <div
                className="timeline-item"
                key={item.company}
              >

                <div className="timeline-number">

                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}

                </div>


                <div className="timeline-card glass-panel">

                  <span className="timeline-date">
                    {item.date}
                  </span>

                  <h3>
                    {item.company}
                  </h3>

                  <h4>
                    {item.role}
                  </h4>

                  <p>
                    {item.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* =================================================
            EDUCATION
            ================================================= */}

        <section
          id="education"
          className="section reveal"
        >

          <div className="section-heading">

            <span>05</span>

            <div>

              <small>
                KNOWLEDGE DATABASE
              </small>

              <h2>
                EDUCATION
              </h2>

            </div>

          </div>


          <div className="education-card glass-panel">

            <div className="education-icon">
              🎓
            </div>


            <div>

              <span className="education-status">
                CURRENT
              </span>

              <h3>
                University of Regina
              </h3>

              <h4>
                Bachelor of Computer Science
              </h4>

              <p>
                Developing a strong foundation in
                programming, data structures, computer
                systems, networking, cybersecurity,
                and software development.
              </p>

            </div>

          </div>

        </section>


        {/* =================================================
            CERTIFICATIONS
            ================================================= */}

        <section
          id="certifications"
          className="section reveal certifications-section"
        >

          <div className="section-heading">

            <span>06</span>

            <div>

              <small>
                VERIFIED CREDENTIALS
              </small>

              <h2>
                CERTIFICATIONS
              </h2>

            </div>

          </div>


          <div className="certifications-grid">

            {certifications.map((cert) => (

              <a
                key={cert.title}
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-card glass-panel"
              >

                {/* CERTIFICATE THUMBNAIL */}

                <div className="certificate-thumbnail">

                  <img
                    src={cert.file}
                    alt={cert.title}
                  />

                  <div className="thumbnail-overlay">

                    <span>
                      OPEN CERTIFICATE ↗
                    </span>

                  </div>

                </div>


                {/* CERTIFICATE DETAILS */}

                <div className="certificate-content">

                  <span className="certificate-status">

                    ✓ {cert.status}

                  </span>


                  <h3>
                    {cert.title}
                  </h3>


                  <p>
                    {cert.issuer}
                  </p>


                  <div className="certificate-line"></div>


                  <span className="certificate-id">

                    VIEW CREDENTIAL ↗

                  </span>

                </div>

              </a>

            ))}

          </div>


          {/* =================================================
              RESUME
              ================================================= */}

          <div className="resume-section">

            <div className="resume-header">

              <span>
                PROFESSIONAL DOCUMENT
              </span>

              <h3>
                RESUME
              </h3>

              <p>
                View or download my current resume.
              </p>

            </div>


            <div className="resume-buttons">

              <a
                href="/Dhruv_Bhatt.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="space-button primary"
              >
                VIEW RESUME
                <span>↗</span>
              </a>


              <a
                href="/Dhruv_Bhatt.pdf"
                download="Dhruv_Bhatt.pdf"
                className="space-button"
              >
                DOWNLOAD RESUME
                <span>↓</span>
              </a>

            </div>

          </div>

        </section>


        {/* =================================================
            CONTACT
            ================================================= */}

        <section
          id="contact"
          className="section reveal contact-section"
        >

          <div className="section-heading">

            <span>07</span>

            <div>

              <small>
                COMMUNICATION CHANNEL
              </small>

              <h2>
                CONTACT
              </h2>

            </div>

          </div>


          <div className="contact-grid">

            <div className="glass-panel contact-info">

              <h3>
                Let's connect.
              </h3>

              <p>
                Interested in technology, cybersecurity,
                projects, collaboration, or opportunities?
                Feel free to reach out.
              </p>


              <a href="mailto:your-email@example.com">

                <span>
                  EMAIL
                </span>

                your-email@example.com

              </a>


              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >

                <span>
                  GITHUB
                </span>

                github.com

              </a>


              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >

                <span>
                  LINKEDIN
                </span>

                linkedin.com

              </a>

            </div>


            <div className="contact-terminal">

              <div className="terminal-top">

                <span className="terminal-dot red"></span>

                <span className="terminal-dot yellow"></span>

                <span className="terminal-dot green"></span>

                <span>
                  connect.sh
                </span>

              </div>


              <div className="terminal-body">

                <p>
                  <b>$</b> ./connect.sh
                </p>

                <p className="muted">
                  Initializing secure communication...
                </p>

                <p className="success">
                  [✓] Connection available
                </p>

                <p className="success">
                  [✓] Channel secured
                </p>

                <a
                  href="mailto:your-email@example.com"
                  className="terminal-button"
                >
                  [ START CONNECTION ]
                </a>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* =================================================
          FOOTER
          ================================================= */}

      <footer>

        <div>

          <strong>
            DB//SEC
          </strong>

          <p>
            CYBERSECURITY • TECHNOLOGY • DEVELOPMENT
          </p>

        </div>


        <span>
          © {new Date().getFullYear()} Dhruv Bhatt
        </span>

      </footer>

    </>
  );
}

export default App;