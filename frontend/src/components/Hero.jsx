import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiFileText, FiArrowDown } from "react-icons/fi";
import { personal_details } from "../config/data.js";
import SocialLinks from "./SocialLinks.jsx";

function useTypewriter(text, speed = 45) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput("");
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return output;
}

export default function Hero() {
  const typed = useTypewriter(personal_details.title, 40);

  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-mint" />
        <span className="font-mono text-xs text-muted">open for opportunities</span>
      </motion.div>

      {personal_details.avatar && (
        <motion.img
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          src={personal_details.avatar}
          alt={personal_details.name}
          onError={(e) => (e.target.style.display = "none")}
          className="mb-6 h-28 w-28 animate-float rounded-full border-2 border-cyan-glow/40 object-cover shadow-glow"
        />
      )}

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="text-center font-display text-4xl font-bold tracking-tight sm:text-6xl"
      >
        Hi, I'm <span className="text-gradient">{personal_details.name}</span>
      </motion.h1>

      <div className="mt-4 h-7 font-mono text-sm text-cyan-glow sm:text-base">
        <span className="text-muted">$ whoami →</span> {typed}
        <span className="ml-0.5 animate-pulse">▌</span>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-6 max-w-xl text-center text-muted"
      >
        {personal_details.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        {personal_details.resumeAvailable && (
          <button
            onClick={() => document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-glow to-violet-glow px-6 py-3 font-semibold text-void shadow-glow transition-transform hover:scale-105"
          >
            <FiFileText className="transition-transform group-hover:-translate-y-0.5" />
            View Resume
          </button>
        )}
        <button
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          className="rounded-lg border border-border px-6 py-3 font-semibold text-ink bg-gray-900 transition-colors hover:border-cyan-glow/60 hover:text-cyan-glow"
        >
          View Projects
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <SocialLinks className="mt-8" />
      </motion.div>

      <motion.button
        onClick={() => document.getElementById("education")?.scrollIntoView({ behavior: "smooth" })}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-8 text-muted"
        aria-label="Scroll down"
      >
        <FiArrowDown size={22} />
      </motion.button>
    </section>
  );
}
