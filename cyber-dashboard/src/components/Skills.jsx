```jsx
const skills = [
    {
        category: "Programming",
        items: [
            "C++",
            "JavaScript",
            "Python",
            "HTML",
            "CSS"
        ]
    },
    {
        category: "Development",
        items: [
            "React",
            "Vite",
            "Git",
            "GitHub",
            "VS Code"
        ]
    },
    {
        category: "Cybersecurity",
        items: [
            "Network Security",
            "Linux",
            "Kali Linux",
            "Security Fundamentals",
            "Threat Analysis"
        ]
    },
    {
        category: "Technologies",
        items: [
            "Networking",
            "Virtual Machines",
            "Arduino",
            "Cloud Fundamentals",
            "IT Support"
        ]
    }
];

function Skills()
{
    return (
        <section
            id="skills"
            className="section skills-section"
        >

            <div className="section-heading">

                <p className="section-label">
                    02 — SKILLS
                </p>

                <h2>
                    Technologies I
                    <span> work with.</span>
                </h2>

            </div>

            <div className="skills-grid">

                {skills.map((skill, index) => (
                    <div
                        className="skill-card"
                        key={index}
                    >

                        <div className="skill-number">
                            0{index + 1}
                        </div>

                        <h3>
                            {skill.category}
                        </h3>

                        <div className="skill-list">

                            {skill.items.map((item, itemIndex) => (
                                <span key={itemIndex}>
                                    {item}
                                </span>
                            ))}

                        </div>

                    </div>
                ))}

            </div>

        </section>
    );
}

export default Skills;
```
