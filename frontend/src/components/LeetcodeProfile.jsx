import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiCode, FiExternalLink, FiWifi, FiWifiOff, FiClock } from "react-icons/fi";
import { social_accounts, leetcode_manual_stats } from "../config/data.js";
import { fetchLeetCodeStats } from "../utils/api.js";
import { SectionHeading } from "./Education.jsx";

const leetcodeAccount = social_accounts.find((a) => a.id === "leetcode");

const STATUS_META = {
  loading: { label: "Loading…", color: "text-muted", icon: FiClock },
  live: { label: "Live data", color: "text-mint", icon: FiWifi },
  cache: { label: "Cached (refreshes hourly)", color: "text-cyan-glow", icon: FiWifi },
  "stale-cache": { label: "Last known data (live fetch failed)", color: "text-yellow-400", icon: FiWifi },
  manual: { label: "Manually updated", color: "text-yellow-400", icon: FiWifiOff },
};

export default function LeetcodeProfile() {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchLeetCodeStats()
      .then((data) => {
        setStats(data);
        setStatus(data.source || "live");
      })
      .catch(() => {
        setStats(leetcode_manual_stats);
        setStatus("manual");
      });
  }, []);

  if (!leetcodeAccount) return null;

  const display = stats || leetcode_manual_stats;
  const meta = STATUS_META[status] || STATUS_META.manual;
  const StatusIcon = meta.icon;

  return (
    <section id="coding" className="mx-auto max-w-4xl px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-semibold">LeetCode Stats</h1>
        <a
          href={leetcodeAccount.url}
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
        <div className={`flex items-center gap-1.5 text-xs ${meta.color}`}>
        <StatusIcon size={12} />
        {meta.label}
        </div>
        <div className="my-6">
          {!!display.totalQuestions && (
            <DifficultyBar label="Total" barColor="bg-red-400" solved={display.totalSolved} total={display.totalQuestions} />
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <DifficultyBar label="Easy" barColor="bg-mint" solved={display.easy?.solved} total={display.easy?.total} />
          <DifficultyBar
            label="Medium"
            barColor="bg-yellow-400"
            solved={display.medium?.solved}
            total={display.medium?.total}
          />
          <DifficultyBar label="Hard" barColor="bg-red-400" solved={display.hard?.solved} total={display.hard?.total} />
        </div>

        {display.ranking && (
          <p className="mt-6 flex items-center gap-2 font-mono text-xs text-muted">
            <FiCode className="text-cyan-glow" /> Global rank #{Number(display.ranking).toLocaleString()}
          </p>
        )}
      </motion.div>
    </section>
  );
}

function DifficultyBar({ label, barColor, solved = 0, total = 0 }) {
  const pct = total ? Math.min(100, Math.round((solved / total) * 100)) : 0;
  return (
    <div className="rounded-xl border border-border bg-surface/40 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">{label}</span>
        <span className="text-sm text-ink">
          {solved}
          {total ? ` / ${total}` : ""}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-border">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${barColor}`}
        />
      </div>
    </div>
  );
}