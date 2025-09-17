import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "particle";

      const size = Math.random() * 4 + 2;
      particle.style.width = size + "px";
      particle.style.height = size + "px";
      particle.style.left = Math.random() * window.innerWidth + "px";
      particle.style.top = Math.random() * window.innerHeight + "px";
      particle.style.animationDelay = Math.random() * 6 + "s";
      particle.style.animationDuration = Math.random() * 4 + 4 + "s";

      container.appendChild(particle);
      particlesRef.current.push(particle);

      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
          const index = particlesRef.current.indexOf(particle);
          if (index > -1) {
            particlesRef.current.splice(index, 1);
          }
        }
      }, 10000);
    };

    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(createParticle, i * 100);
    }

    // Create particles periodically
    const interval = setInterval(createParticle, 300);

    return () => {
      clearInterval(interval);
      particlesRef.current.forEach((particle) => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      });
      particlesRef.current = [];
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" data-testid="particle-background" />;
}
