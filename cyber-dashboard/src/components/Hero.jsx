```jsx
import { useEffect, useState } from "react";

function Hero()
{
    const [scrollY, setScrollY] = useState(0);

    useEffect(() =>
    {
        const handleScroll = () =>
        {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () =>
        {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const heroOpacity = Math.max(0, 1 - scrollY / 500);
    const heroScale = Math.max(0.85, 1 - scrollY / 2500);
    const heroTranslate = Math.min(scrollY * 0.25, 120);

    return (
        <section
            id="home"
            className="hero-section"
        >

            <div
                className="hero-content"
                style={{
                    opacity: heroOpacity,
                    transform: `
                        translateY(-${heroTranslate}px)
                        scale(${heroScale})
                    `
                }}
            >

                <p className="hero-small-text">
                    HELLO, I'M
                </p>

                <h1>
                    Dhruv
                    <span> Bhatt</span>
                </h1>

                <h2>
                    Computer Science Student
                </h2>

                <p className="hero-description">
                    I build modern digital experiences while exploring
                    cybersecurity, software development, networking,
                    and emerging technologies.
                </p>

                <div className="hero-buttons">

                    <a
                        href="#projects"
                        className="primary-button"
                    >
                        View My Work
                    </a>

                    <a
                        href="#contact"
                        className="secondary-button"
                    >
                        Contact Me
                    </a>

                </div>

            </div>

            <div
                className="scroll-indicator"
                style={{
                    opacity: Math.max(0, 1 - scrollY / 150)
                }}
            >
                <span></span>
                <p>Scroll to explore</p>
            </div>

        </section>
    );
}

export default Hero;
```
