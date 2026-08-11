import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const skillSystems = [
  {
    id: "languages",
    title: "Languages",
    color: "from-cyan-glow/90 to-violet-glow/70",
    skills: ["C++", "C", "Python", "JavaScript", "JAVA"],
    baseX: 28,
    baseY: 42,
    radius: 100,
    orbitDuration: 18,
  },
  {
    id: "frontend",
    title: "Frontend",
    color: "from-cyan-glow/90 to-violet-glow/70",
    skills: ["React.js", "Tailwind CSS", "CSS", "HTML"],
    baseX: 18,
    baseY: 22,
    radius: 100,
    orbitDuration: 18,
  },
  {
    id: "backend",
    title: "Backend",
    color: "from-mint/90 to-cyan-glow/70",
    skills: ["Django", "Node.js", "Express.js", "JWT", "API"],
    baseX: 80,
    baseY: 24,
    radius: 100,
    orbitDuration: 22,
  },
  {
    id: "ai",
    title: "AI",
    color: "from-violet-glow/90 to-cyan-glow/70",
    skills: ["ML", "DL", "LLMs", "Agents", "LangChain"],
    baseX: 24,
    baseY: 78,
    radius: 100,
    orbitDuration: 20,
  },
  {
    id: "database",
    title: "Database",
    color: "from-mint/90 to-violet-glow/70",
    skills: ["SQL", "NoSQL", "MySQL", "MongoDB", "PostgreSQL", "Redis"],
    baseX: 74,
    baseY: 78,
    radius: 100,
    orbitDuration: 24,
  },
];

export default function AnimatedBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      })),
    []
  );

  const [systemPositions, setSystemPositions] = useState(() =>
    skillSystems.map((system) => ({
      x: system.baseX + (Math.random() - 0.5) * 6,
      y: system.baseY + (Math.random() - 0.5) * 4,
    }))
  );

  const [systemVelocities, setSystemVelocities] = useState(() =>
    skillSystems.map(() => ({
      vx: (Math.random() > 0.5 ? 1 : -1) * (0.14 + Math.random() * 0.08),
      vy: (Math.random() > 0.5 ? 1 : -1) * (0.12 + Math.random() * 0.06),
    }))
  );

  const positionsRef = useRef(systemPositions);
  const velocitiesRef = useRef(systemVelocities);

  useEffect(() => {
    positionsRef.current = systemPositions;
  }, [systemPositions]);

  useEffect(() => {
    velocitiesRef.current = systemVelocities;
  }, [systemVelocities]);

  useEffect(() => {
    let frameId = 0;
    let lastTime = performance.now();

    const animate = (now) => {
      const delta = Math.min(0.03, (now - lastTime) / 1000);
      lastTime = now;

      const nextPositions = positionsRef.current.map((position) => ({ ...position }));
      const nextVelocities = velocitiesRef.current.map((velocity) => ({ ...velocity }));

      for (let index = 0; index < nextPositions.length; index += 1) {
        let x = nextPositions[index].x + nextVelocities[index].vx * delta * 9;
        let y = nextPositions[index].y + nextVelocities[index].vy * delta * 9;

        if (x < 8 || x > 92) {
          nextVelocities[index].vx *= -1;
          x = Math.min(92, Math.max(8, x));
        }
        if (y < 8 || y > 92) {
          nextVelocities[index].vy *= -1;
          y = Math.min(92, Math.max(8, y));
        }

        nextPositions[index] = { x, y };
      }

      for (let index = 0; index < nextPositions.length; index += 1) {
        for (let otherIndex = index + 1; otherIndex < nextPositions.length; otherIndex += 1) {
          const current = nextPositions[index];
          const other = nextPositions[otherIndex];
          const dx = other.x - current.x;
          const dy = other.y - current.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 18) {
            const nx = dx / (distance || 1);
            const ny = dy / (distance || 1);
            const push = (18 - distance) / 2;

            nextPositions[index] = {
              x: current.x - nx * push,
              y: current.y - ny * push,
            };
            nextPositions[otherIndex] = {
              x: other.x + nx * push,
              y: other.y + ny * push,
            };

            nextVelocities[index].vx *= -1;
            nextVelocities[index].vy *= -1.02;
            nextVelocities[otherIndex].vx *= -1;
            nextVelocities[otherIndex].vy *= -1.02;
          }
        }
      }

      positionsRef.current = nextPositions;
      velocitiesRef.current = nextVelocities;
      setSystemPositions(nextPositions);
      setSystemVelocities(nextVelocities);
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-void" />
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="absolute inset-0 bg-grid-lines bg-[size:48px_48px] opacity-60" />

      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-cyan-glow/60"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.9, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 opacity-70">
        {systemPositions.map((position, index) => {
          const system = skillSystems[index];
          const radius = system.radius;

          return (
            <motion.div
              key={system.id}
              className="absolute"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{ scale: [1, 1.015, 1], opacity: [0.7, 0.95, 0.7] }}
              transition={{ duration: 10 + index, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative h-24 w-24 rounded-full border border-cyan-glow/15 bg-cyan-glow/5 shadow-[0_0_30px_rgba(0,229,255,0.08)] backdrop-blur-sm sm:h-28 sm:w-28">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: system.orbitDuration, repeat: Infinity, ease: "linear" }}
                >
                  {system.skills.map((skill, skillIndex) => {
                    const angle = (skillIndex / system.skills.length) * Math.PI * 2 - Math.PI / 2;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <div
                        key={skill}
                        className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-surface/80 text-[7px] font-semibold uppercase tracking-[0.2em] text-muted shadow-[0_0_10px_rgba(124,92,255,0.15)]"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                        }}
                      >
                        {skill}
                      </div>
                    );
                  })}
                </motion.div>

                <div className={`absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${system.color} shadow-[0_0_16px_rgba(0,229,255,0.25)]`} />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-semibold uppercase tracking-[0.3em] text-ink/80">
                  {system.title}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-violet-glow/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-cyan-glow/10 blur-[120px]" />
    </div>
  );
}
