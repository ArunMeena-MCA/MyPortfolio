const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* no body */
  }

  if (!res.ok) {
    throw new Error((data && data.error) || `Request failed (${res.status})`);
  }
  return data;
}

export const trackVisit = (visitorKey, page) =>
  request("/track", { method: "POST", body: JSON.stringify({ visitorKey, page }) });

export const introduceVisitor = (visitorKey, payload) =>
  request("/introduce", { method: "POST", body: JSON.stringify({ visitorKey, ...payload }) });

export const sendMessage = (visitorKey, payload) =>
  request("/message", { method: "POST", body: JSON.stringify({ visitorKey, ...payload }) });

export const analyticsLogin = (password) =>
  request("/analytics/login", { method: "POST", body: JSON.stringify({ password }) });

export const analyticsLogout = () => request("/analytics/logout", { method: "POST" });

export const analyticsMe = () => request("/analytics/me");

export const analyticsSummary = () => request("/analytics/summary");

export const changeAnalyticsPassword = (currentPassword, newPassword) =>
  request("/analytics/change-password", {
    method: "POST",
    body: JSON.stringify({ currentPassword, newPassword }),
  });

export const resumeUrl = () => `${API_BASE}/resume`;

export const fetchLeetCodeStats = () => request("/leetcode");
export const fetchGfgStats = () => request("/gfg");
