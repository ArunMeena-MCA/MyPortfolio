import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiWifi, FiWifiOff, FiClock, FiAward } from "react-icons/fi";
import { gfg_profile_url, gfg_manual_stats } from "../config/data.js";
import { fetchGfgStats } from "../utils/api.js";
import { SectionHeading } from "./Education.jsx";

const STATUS_META = {
  loading: { label: "Loading…", color: "text-muted", icon: FiClock },
  live: { label: "Live data", color: "text-mint", icon: FiWifi },
  cache: { label: "Cached (refreshes hourly)", color: "text-cyan-glow", icon: FiWifi },
  "stale-cache": { label: "Last known data (live fetch failed)", color: "text-yellow-400", icon: FiWifi },
  manual: { label: "Manually updated", color: "text-yellow-400", icon: FiWifiOff },
};

export default function GfgProfile() {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchGfgStats()
      .then((data) => {
        setStats(data);
        setStatus(data.source || "live");
      })
      .catch(() => {
        setStats(gfg_manual_stats);
        setStatus("manual");
      });
  }, []);

  if (!gfg_profile_url) return null;

  const display = stats || gfg_manual_stats;
  const meta = STATUS_META[status] || STATUS_META.manual;
  const StatusIcon = meta.icon;

  const bars = [
    { label: "Total", value: display.totalSolved, color: "bg-violet-glow" },
    { label: "School", value: display.school, color: "bg-violet-glow" },
    { label: "Basic", value: display.basic, color: "bg-cyan-glow" },
    { label: "Easy", value: display.easy, color: "bg-mint" },
    { label: "Medium", value: display.medium, color: "bg-yellow-400" },
    { label: "Hard", value: display.hard, color: "bg-red-400" },
  ];
  const maxValue = Math.max(1, ...bars.map((b) => b.value || 0));

  return (
    <section id="gfg" className="mx-auto max-w-4xl px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-semibold ">GeeksforGeeks Stats</h1>
        <a
          href={gfg_profile_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-cyan-glow/60 hover:text-cyan-glow"
        >
          <FiExternalLink size={14} /> View profile
        </a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="glass mt-8 rounded-2xl p-6"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <div className={`flex items-center gap-1.5 text-xs ${meta.color}`}>
            <StatusIcon size={12} />
            {meta.label}
          </div>
          {!!display.totalSolved && (
            <span className="font-mono text-xs text-muted">{display.totalSolved} total problems solved</span>
          )}
        </div>

        <div className="space-y-3">
          {bars.map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <span className="w-16 shrink-0 font-mono text-xs uppercase tracking-widest text-muted">{b.label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${((b.value || 0) / maxValue) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full rounded-full ${b.color}`}
                />
              </div>
              <span className="w-8 shrink-0 text-right text-sm text-ink">{b.value || 0}</span>
            </div>
          ))}
        </div>

        {(display.codingScore || display.instituteRank) && (
          <div className="mt-6 flex flex-wrap gap-6 font-mono text-xs text-muted">
            {display.codingScore ? (
              <span className="flex items-center gap-2">
                <FiAward className="text-cyan-glow" /> Coding score: {display.codingScore}
              </span>
            ) : null}
            {display.instituteRank ? (
              <span className="flex items-center gap-2">
                <FiAward className="text-cyan-glow" /> Institute rank #{display.instituteRank}
              </span>
            ) : null}
          </div>
        )}
      </motion.div>
    </section>
  );
}