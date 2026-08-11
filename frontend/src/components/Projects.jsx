import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import { projects } from "../config/data.js";
import { SectionHeading } from "./Education.jsx";
import ProjectModal from "./ProjectModal.jsx";

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading eyebrow="Projects" title="Things I've built" />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            onClick={() => setActive(p)}
            className="glass group flex flex-col overflow-hidden rounded-xl text-left transition-shadow hover:shadow-glow"
          >
            <div className="relative h-52 w-full p-1 bg-panel">
              <img
                src={p.thumbnail}
                alt={p.title}
                onError={(e) => (e.target.style.display = "none")}
                className="h-full w-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
              <div className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-void/70 text-cyan-glow opacity-0 transition-opacity group-hover:opacity-100">
                <FiArrowUpRight size={16} />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-base font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{p.shortDescription}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted">
                    {t}
                  </span>
                ))}
                {p.tech.length > 3 && (
                  <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted">
                    +{p.tech.length - 3}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                {p.github && (
                  <span className="flex items-center gap-1">
                    <FiGithub size={13} /> Code
                  </span>
                )}
                {p.liveLink && (
                  <span className="flex items-center gap-1 text-mint">
                    <FiExternalLink size={13} /> Live
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
