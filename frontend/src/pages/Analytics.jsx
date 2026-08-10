import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { FiLock, FiLogOut, FiUsers, FiEye, FiMail, FiRefreshCw, FiKey, FiInbox, FiX, FiArrowLeft } from "react-icons/fi";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import {
  analyticsLogin,
  analyticsLogout,
  analyticsMe,
  analyticsSummary,
  changeAnalyticsPassword,
} from "../utils/api.js";

export default function Analytics() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    analyticsMe()
      .then(() => setAuthed(true))
      .catch(() => setAuthed(false))
      .finally(() => setChecking(false));
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      {checking ? (
        <div className="grid min-h-screen place-items-center text-muted">Loading…</div>
      ) : authed ? (
        <Dashboard onLogout={() => setAuthed(false)} />
      ) : (
        <LoginGate onSuccess={() => setAuthed(true)} />
      )}
    </div>
  );
}

function LoginGate({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await analyticsLogin(password);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={submit}
        className="glass w-full max-w-sm rounded-2xl p-8"
      >
        <div className="mb-4 grid h-12 w-12 place-items-center rounded-full border border-cyan-glow/40 text-cyan-glow">
          <FiLock size={20} />
        </div>
        <h1 className="font-display text-xl font-bold text-ink">Analytics access</h1>
        <p className="mt-1 text-sm text-muted">Enter the admin password to view visitor data.</p>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-6 w-full rounded-lg border border-border bg-surface/60 px-4 py-2.5 text-sm text-ink outline-none focus:border-cyan-glow/60"
        />
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-lg bg-gradient-to-r from-cyan-glow to-violet-glow px-4 py-2.5 text-sm font-semibold text-void disabled:opacity-60"
        >
          {loading ? "Checking..." : "Unlock"}
        </button>
      </motion.form>
    </div>
  );
}

function Dashboard({ onLogout }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("visitors");
  const [showPwForm, setShowPwForm] = useState(false);
  const [showInbox, setShowInbox] = useState(false);

  const load = () => {
    analyticsSummary()
      .then(setData)
      .catch((err) => setError(err.message));
  };

  useEffect(load, []);

  const logout = async () => {
    await analyticsLogout();
    onLogout();
  };

  if (error) return <div className="grid min-h-screen place-items-center text-red-400">{error}</div>;
  if (!data) return <div className="grid min-h-screen place-items-center text-muted">Loading data…</div>;

  const { totals, visitors, visits, messages, dailyVisits } = data;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-label font-mono text-xs uppercase tracking-widest text-violet-glow">Admin</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-ink">Visitor Analytics</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowInbox(true)}
            className="relative flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted hover:text-cyan-glow"
          >
            <FiInbox size={14} /> Inbox
            {messages.length > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-gradient-to-r from-cyan-glow to-violet-glow text-[10px] font-bold text-void">
                {messages.length}
              </span>
            )}
          </button>
          <button
            onClick={load}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted hover:text-cyan-glow"
          >
            <FiRefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={() => setShowPwForm((s) => !s)}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted hover:text-cyan-glow"
          >
            <FiKey size={14} /> Password
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted hover:text-red-400"
          >
            <FiLogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {showPwForm && <ChangePasswordForm onDone={() => setShowPwForm(false)} />}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={<FiUsers />} label="Unique visitors" value={totals.unique_visitors} />
        <StatCard icon={<FiEye />} label="Total visits" value={totals.total_visits} />
        <StatCard icon={<FiMail />} label="Messages" value={totals.total_messages} />
        <StatCard icon={<FiUsers />} label="Introduced" value={totals.introduced_visitors} />
      </div>

      {dailyVisits?.length > 0 && (
        <div className="glass mt-6 rounded-xl p-5">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Visits per day (recent)</p>
          <div className="flex items-end gap-1.5" style={{ height: 90 }}>
            {[...dailyVisits].reverse().map((d) => {
              const max = Math.max(...dailyVisits.map((x) => x.count), 1);
              return (
                <div key={d.day} title={`${d.day}: ${d.count}`} className="flex-1">
                  <div
                    className="rounded-t bg-gradient-to-t from-cyan-glow/60 to-violet-glow/60"
                    style={{ height: `${(d.count / max) * 80 + 4}px` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 flex gap-2 border-b border-border">
        {["visitors", "visits", "messages"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 font-mono text-xs uppercase tracking-widest ${
              tab === t ? "border-b-2 border-cyan-glow text-cyan-glow" : "text-muted"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto">
        {tab === "visitors" && <VisitorsTable visitors={visitors} />}
        {tab === "visits" && <VisitsTable visits={visits} />}
        {tab === "messages" && <MessagesTable messages={messages} />}
      </div>

      <AnimatePresence>
        {showInbox && <InboxModal messages={messages} onClose={() => setShowInbox(false)} />}
      </AnimatePresence>
    </div>
  );
}

function InboxModal({ messages, onClose }) {
  const [selected, setSelected] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="glass flex h-[75vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            {selected && (
              <button
                onClick={() => setSelected(null)}
                className="mr-1 text-muted hover:text-cyan-glow"
                aria-label="Back to inbox"
              >
                <FiArrowLeft size={16} />
              </button>
            )}
            <FiInbox className="text-cyan-glow" />
            <h3 className="font-display text-sm font-semibold text-ink">
              {selected ? "Message" : `Inbox (${messages.length})`}
            </h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-muted hover:text-ink">
            <FiX size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {selected ? (
            <div className="p-6">
              <p className="font-display text-lg font-semibold text-ink">{selected.name}</p>
              {selected.email && <p className="text-sm text-cyan-glow">{selected.email}</p>}
              <p className="mt-1 font-mono text-[11px] text-muted">{fmt(selected.created_at)}</p>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-ink/90">{selected.message}</p>
            </div>
          ) : messages.length === 0 ? (
            <p className="py-16 text-center text-muted">No messages yet.</p>
          ) : (
            <ul className="divide-y divide-border/60">
              {messages.map((m) => (
                <li key={m.id}>
                  <button
                    onClick={() => setSelected(m)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-panel/60"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink">{m.name}</p>
                      <p className="truncate text-sm text-muted">{m.message}</p>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-muted">{fmt(m.created_at)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="glass rounded-xl p-5">
      <div className="mb-2 text-cyan-glow">{icon}</div>
      <p className="font-display text-2xl font-bold text-ink">{value}</p>
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{label}</p>
    </div>
  );
}

function fmt(dt) {
  if (!dt) return "—";
  return new Date(dt).toLocaleString();
}

function VisitorsTable({ visitors }) {
  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="font-mono text-[11px] uppercase tracking-widest text-muted">
          <th className="py-2 pr-4">Visitor</th>
          <th className="py-2 pr-4">Name / Email</th>
          <th className="py-2 pr-4">IP</th>
          <th className="py-2 pr-4">First seen</th>
          <th className="py-2 pr-4">Last seen</th>
          <th className="py-2 pr-4">Visits</th>
        </tr>
      </thead>
      <tbody>
        {visitors.map((v) => (
          <tr key={v.id} className="border-t border-border/60">
            <td className="py-2 pr-4 font-mono text-xs text-muted">{v.visitor_key.slice(0, 10)}…</td>
            <td className="py-2 pr-4">
              {v.introduced ? (
                <span className="text-ink">
                  {v.name || "—"} <span className="text-muted">{v.email ? `· ${v.email}` : ""}</span>
                </span>
              ) : (
                <span className="text-muted">anonymous</span>
              )}
            </td>
            <td className="py-2 pr-4 font-mono text-xs text-muted">{v.ip_address}</td>
            <td className="py-2 pr-4 text-muted">{fmt(v.first_seen)}</td>
            <td className="py-2 pr-4 text-muted">{fmt(v.last_seen)}</td>
            <td className="py-2 pr-4 text-cyan-glow">{v.visit_count}</td>
          </tr>
        ))}
        {visitors.length === 0 && (
          <tr>
            <td colSpan={6} className="py-6 text-center text-muted">
              No visitors yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function VisitsTable({ visits }) {
  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="font-mono text-[11px] uppercase tracking-widest text-muted">
          <th className="py-2 pr-4">Visitor</th>
          <th className="py-2 pr-4">Page</th>
          <th className="py-2 pr-4">IP</th>
          <th className="py-2 pr-4">Date & time</th>
        </tr>
      </thead>
      <tbody>
        {visits.map((v) => (
          <tr key={v.id} className="border-t border-border/60">
            <td className="py-2 pr-4">{v.name || <span className="text-muted">anonymous</span>}</td>
            <td className="py-2 pr-4 text-muted">{v.page}</td>
            <td className="py-2 pr-4 font-mono text-xs text-muted">{v.ip_address}</td>
            <td className="py-2 pr-4 text-muted">{fmt(v.visited_at)}</td>
          </tr>
        ))}
        {visits.length === 0 && (
          <tr>
            <td colSpan={4} className="py-6 text-center text-muted">
              No visits logged yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function MessagesTable({ messages }) {
  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <div key={m.id} className="glass rounded-xl p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold text-ink">
              {m.name} {m.email && <span className="text-muted">· {m.email}</span>}
            </p>
            <span className="font-mono text-[11px] text-muted">{fmt(m.created_at)}</span>
          </div>
          <p className="mt-2 text-sm text-muted">{m.message}</p>
        </div>
      ))}
      {messages.length === 0 && <p className="py-6 text-center text-muted">No messages yet.</p>}
    </div>
  );
}

function ChangePasswordForm({ onDone }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await changeAnalyticsPassword(current, next);
      setMsg("Password updated.");
      setTimeout(onDone, 1000);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <form onSubmit={submit} className="glass mb-6 flex flex-wrap items-end gap-3 rounded-xl p-4">
      <div>
        <label className="mb-1 block font-mono text-[11px] text-muted">Current password</label>
        <input
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          className="rounded-lg border border-border bg-surface/60 px-3 py-2 text-sm text-ink outline-none focus:border-cyan-glow/60"
        />
      </div>
      <div>
        <label className="mb-1 block font-mono text-[11px] text-muted">New password</label>
        <input
          type="password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          className="rounded-lg border border-border bg-surface/60 px-3 py-2 text-sm text-ink outline-none focus:border-cyan-glow/60"
        />
      </div>
      <button className="rounded-lg bg-gradient-to-r from-cyan-glow to-violet-glow px-4 py-2 text-sm font-semibold text-void">
        Update
      </button>
      {msg && <span className="text-xs text-muted">{msg}</span>}
    </form>
  );
}
