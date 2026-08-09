```jsx
const projects = [
    {
        number: "01",
        title: "Cybersecurity Dashboard",
        description:
            "An interactive cybersecurity dashboard designed to monitor system status, threats, firewall activity, network activity, and security events.",
        technologies:
            "React • JavaScript • CSS",
        link: "#"
    },
    {
        number: "02",
        title: "Personal Portfolio",
        description:
            "A modern personal portfolio website showcasing my skills, projects, experience, and interest in technology.",
        technologies:
            "React • Vite • JavaScript",
        link: "#"
    },
    {
        number: "03",
        title: "Networking & Security Projects",
        description:
            "Hands-on projects exploring networking concepts, Linux environments, virtual machines, and cybersecurity fundamentals.",
        technologies:
            "Linux • Networking • Kali Linux",
        link: "#"
    }
];

function Projects()
{
    return (
        <section
            id="projects"
            className="section projects-section"
        >

            <div className="section-heading">

                <p className="section-label">
                    03 — PROJECTS
                </p>

                <h2>
                    Things I've
                    <span> built.</span>
                </h2>

            </div>

            <div className="projects-container">

                {projects.map((project) => (
                    <article
                        className="project-card"
                        key={project.number}
                    >

                        <div className="project-top">

                            <span className="project-number">
                                {project.number}
                            </span>

                            <span className="project-arrow">
                                ↗
                            </span>

                        </div>

                        <h3>
                            {project.title}
                        </h3>

                        <p>
                            {project.description}
                        </p>

                        <span className="project-tech">
                            {project.technologies}
                        </span>

                    </article>
                ))}

            </div>

        </section>
    );
}

export default Projects;
```
