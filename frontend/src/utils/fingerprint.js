// Lightweight, dependency-free browser fingerprint.
// Combines canvas rendering, WebGL renderer info, and a handful of stable
// navigator/screen properties into a single hash. This is intentionally
// "good enough" for portfolio analytics — not a fraud-grade fingerprint.

function djb2Hash(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

function getCanvasFingerprint() {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 220;
    canvas.height = 30;
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.fillStyle = "#f60";
    ctx.fillRect(0, 0, 100, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("portfolio-fp-" + navigator.userAgent, 2, 2);
    return canvas.toDataURL();
  } catch {
    return "canvas-unavailable";
  }
}

function getWebGLRenderer() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return "no-webgl";
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return "no-debug-info";
    return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "unknown-renderer";
  } catch {
    return "webgl-error";
  }
}

export function getVisitorKey() {
  const parts = [
    navigator.userAgent,
    navigator.language,
    navigator.platform,
    String(screen.width) + "x" + String(screen.height),
    String(screen.colorDepth),
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    String(navigator.hardwareConcurrency || ""),
    getWebGLRenderer(),
    getCanvasFingerprint(),
  ].join("||");

  const fingerprint = djb2Hash(parts);

  // Persist alongside the fingerprint so the *same* browser profile keeps
  // the same key even if some navigator properties shift slightly (e.g.
  // after a browser update). If storage is unavailable, fall back to the
  // freshly computed fingerprint.
  try {
    const stored = localStorage.getItem("pf_visitor_key");
    if (stored) return stored;
    localStorage.setItem("pf_visitor_key", fingerprint);
    return fingerprint;
  } catch {
    return fingerprint;
  }
}

export function hasIntroduced() {
  try {
    return localStorage.getItem("pf_introduced") === "1";
  } catch {
    return false;
  }
}

export function markIntroduced() {
  try {
    localStorage.setItem("pf_introduced", "1");
  } catch {
    /* no-op */
  }
}

export function dismissedIntroPopup() {
  try {
    return sessionStorage.getItem("pf_intro_dismissed") === "1";
  } catch {
    return false;
  }
}

export function dismissIntroPopup() {
  try {
    sessionStorage.setItem("pf_intro_dismissed", "1");
  } catch {
    /* no-op */
  }
}
