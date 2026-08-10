import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { educational_details } from "../config/data.js";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-4xl px-6 py-24">
      <SectionHeading eyebrow="Education" title="Where it started" />

      <div className="relative mt-12 space-y-8 border-l border-border pl-8">
        {educational_details.map((edu, i) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass relative rounded-xl p-6"
          >
            <span className="absolute -left-[41px] top-8 h-3 w-3 rounded-full bg-cyan-glow shadow-glow" />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-lg font-semibold text-ink">{edu.degree}</h3>
              <span className="font-mono text-xs text-muted">{edu.duration}</span>
            </div>
            <p className="mt-1 text-sm text-cyan-glow">{edu.institution}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{edu.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {edu.score && <Badge>{edu.score}</Badge>}
              {edu.highlight && (
                <Badge accent>
                  <FiAward className="mr-1 inline" size={12} />
                  {edu.highlight}
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title }) {
  return (
    <div>
      <p className="section-label font-mono text-xs uppercase tracking-widest text-violet-glow">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
    </div>
  );
}

export function Badge({ children, accent }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 font-mono text-[11px] ${
        accent
          ? "border-mint/40 bg-mint/10 text-mint"
          : "border-border bg-panel/60 text-muted"
      }`}
    >
      {children}
    </span>
  );
}
