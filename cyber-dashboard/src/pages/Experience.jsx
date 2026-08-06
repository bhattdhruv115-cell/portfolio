import { TiltCard } from "../components/Shared";

const EXPERIENCE = [
  {
    role: "Frontend Developer Intern",
    company: "TechNova Solutions",
    duration: "Jun 2025 — Present",
    points: [
      "Built responsive dashboards using React and REST APIs",
      "Improved page load performance by 30% through code splitting",
      "Collaborated with a team of 5 using Git and Agile workflows",
    ],
  },
  {
    role: "Freelance Web Developer",
    company: "Self-employed",
    duration: "Jan 2024 — May 2025",
    points: [
      "Delivered 8+ client websites across e-commerce and portfolio niches",
      "Handled full project lifecycle: design, development, deployment",
    ],
  },
  {
    role: "Open Source Contributor",
    company: "Various GitHub Projects",
    duration: "2023 — Present",
    points: [
      "Contributed bug fixes and features to community-driven repos",
      "Reviewed pull requests and wrote technical documentation",
    ],
  },
];

export default function Experience() {
  return (
    <div className="page">
      <h1 className="page-title">💼 Experience</h1>
      <p className="page-subtitle">My professional journey so far</p>

      <div className="timeline">
        {EXPERIENCE.map((exp, i) => (
          <TiltCard key={i} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h2>{exp.role}</h2>
                <span className="timeline-date">{exp.duration}</span>
              </div>
              <p className="timeline-company">{exp.company}</p>
              <ul>
                {exp.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}