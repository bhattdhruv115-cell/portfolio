import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ParticleBackground, CursorGlow } from "./components/Shared";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Certificates from "./pages/Certificates";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <ParticleBackground />
      <CursorGlow />
      <Navbar />
      <div className="dashboard">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;