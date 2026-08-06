import { TiltCard } from "../components/Shared";
import SecurityGlobe from "../SecurityGlobe";
import WorldTrafficChart from "../WorldTrafficChart";

export default function Dashboard() {
  return (
    <div className="page">
      <div className="subtitle">Live monitoring</div>
      <h1 className="page-title" style={{ textAlign: "center" }}>🛡 Cyber Security Dashboard</h1>

      <TiltCard className="panel globe-panel">
        <div className="panel-header">
          <h2>🌐 Global Threat Map</h2>
          <span className="live-tag">LIVE</span>
        </div>
        <SecurityGlobe height={380} />
      </TiltCard>

      <div className="top-section">
        <TiltCard className="score-card">
          <h2>Security Score</h2>
          <div className="score">92%</div>
          <p className="green">System Protected</p>
        </TiltCard>
        <TiltCard className="card">
          <h2>Threats Detected</h2>
          <p className="red">⚠️ 3 Active Threats</p>
        </TiltCard>
        <TiltCard className="card">
          <h2>Firewall</h2>
          <p className="green"><span className="status-dot green-dot"></span>Active</p>
        </TiltCard>
        <TiltCard className="card">
          <h2>Network</h2>
          <p className="blue">📡 Monitoring</p>
        </TiltCard>
      </div>

      <TiltCard className="panel">
        <h2>📊 Global Network Traffic</h2>
        <WorldTrafficChart />
      </TiltCard>

      <TiltCard className="panel">
        <h2>🚨 Security Alerts</h2>
        <div className="alert critical">🔴 Suspicious login attempt blocked</div>
        <div className="alert warning">🟡 Multiple failed password attempts</div>
        <div className="alert success">🟢 System scan completed successfully</div>
      </TiltCard>
    </div>
  );
}