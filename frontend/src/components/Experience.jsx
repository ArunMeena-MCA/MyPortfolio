import { motion } from "framer-motion";
import { professional } from "../config/data.js";
import { SectionHeading, Badge } from "./Education.jsx";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-24">
      <SectionHeading eyebrow="Experience" title="Where I've worked" />

      <div className="relative mt-12 space-y-8 border-l border-border pl-8">
        {professional.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass relative rounded-xl p-6"
          >
            <span className="absolute -left-[39.5px] top-8 h-3 w-3 rounded-full bg-violet-glow shadow-glow-violet" />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-lg font-semibold text-ink">{job.role}</h3>
              <span className="font-mono text-xs text-muted">{job.duration}</span>
            </div>
            <p className="mt-1 text-sm text-cyan-glow">
              {job.company} <span className="text-muted">· {job.location}</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{job.description}</p>

            {job.highlights?.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {job.highlights.map((h, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-ink/90">
                    <span className="mt-1 text-cyan-glow">▹</span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {job.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
