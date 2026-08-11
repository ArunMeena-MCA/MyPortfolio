import { motion } from "framer-motion";
import { FiX, FiGithub, FiExternalLink } from "react-icons/fi";
import { Badge } from "./Education.jsx";

export default function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="glass max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl"
      >
        <div className="relative h-72 w-full bg-panel">
          <img
            src={project.thumbnail}
            alt={project.title}
            onError={(e) => (e.target.style.display = "none")}
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-void/70 text-ink hover:text-cyan-glow"
          >
            <FiX size={18} />
          </button>
          <h3 className="absolute bottom-4 left-6 font-display text-2xl font-bold text-ink">{project.title}</h3>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-4 font-mono text-xs text-muted">
            {project.role && <span>👤 {project.role}</span>}
            {project.duration && <span>⏱ {project.duration}</span>}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink/90">{project.fullDescription}</p>

          <div className="mt-5">
            <p className="section-label font-mono text-xs uppercase tracking-widest text-violet-glow">Tech Stack</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-cyan-glow/60 hover:text-cyan-glow"
              >
                <FiGithub /> View Code
              </a>
            )}
            {/* Live Demo button only renders when a live link exists in the config */}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-glow to-violet-glow px-5 py-2.5 text-sm font-semibold text-void shadow-glow transition-transform hover:scale-105"
              >
                <FiExternalLink /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
