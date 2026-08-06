import { TiltCard } from "../components/Shared";

const CERTIFICATES = [
  {
    title: "Google Cybersecurity",
    issuer: "Google / Coursera",
    date: "May 2026",
    color: "#00ff88",
    image: "/certificates/google-cybersecurity.png",
    verifyLink: "https://coursera.org/verify/professional-cert/YINCR0Z65FJJ",
  },
  {
    title: "Google IT Support",
    issuer: "Google / Coursera",
    date: "May 2026",
    color: "#00eaff",
    image: "/certificates/google-it-support.png",
    verifyLink: "https://coursera.org/verify/professional-cert/T404WCGBXJOO",
  },
  {
    title: "Pre Security Learning Path",
    issuer: "TryHackMe",
    date: "Jan 2026",
    color: "#ffb84d",
    image: "/certificates/tryhackme-presecurity.png",
    verifyLink: null,
  },
];

export default function Certificates() {
  return (
    <div className="page">
      <h1 className="page-title">🎓 Certificates</h1>
      <p className="page-subtitle">Courses and credentials I've completed</p>

      <div className="cert-grid">
        {CERTIFICATES.map((c, i) => (
          <TiltCard key={i} className="cert-card">
            <div className="cert-thumb" style={{ borderColor: c.color }}>
              <img src={c.image} alt={`${c.title} certificate`} />
            </div>
            <h3>{c.title}</h3>
            <p className="cert-issuer">{c.issuer}</p>
            <span className="cert-date">{c.date}</span>
            <div className="cert-links">
              <a href={c.image} target="_blank" rel="noreferrer" style={{ color: c.color }}>
                View Certificate
              </a>
              {c.verifyLink && (
                <a href={c.verifyLink} target="_blank" rel="noreferrer" style={{ color: c.color }}>
                  Verify →
                </a>
              )}
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}