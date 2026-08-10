import { motion } from "framer-motion";
import { useMemo } from "react";

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

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-violet-glow/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-cyan-glow/10 blur-[120px]" />
    </div>
  );
}
