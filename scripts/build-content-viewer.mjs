/**
 * Build a self-contained static HTML viewer (`content-viewer.html`) for
 * browsing all Skills (`src/content/skills/*.md`) and Guides
 * (`src/content/guides/*.md` + `src/content/guides-vi/*.md`), including an
 * English / Vietnamese switcher for guides.
 *
 * Zero external dependencies — runs with Node.js >= 20.
 *
 * Usage:
 *   node scripts/build-content-viewer.mjs
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const SKILLS_DIR = join(ROOT, "src", "content", "skills");
const GUIDES_EN_DIR = join(ROOT, "src", "content", "guides");
const GUIDES_VI_DIR = join(ROOT, "src", "content", "guides-vi");
const CLIENT_JS_PATH = join(ROOT, "scripts", "viewer-client.js");
const OUT_FILE = join(ROOT, "content-viewer.html");

/**
 * Parse a YAML scalar/inline-array value from skill frontmatter.
 * @param {string} raw
 * @returns {unknown}
 */
function parseYamlValue(raw) {
  const val = raw.trim();
  if (val === "true") return true;
  if (val === "false") return false;
  if (val === "null" || val === "~") return null;

  if (val.startsWith("[") && val.endsWith("]")) {
    const inner = val.slice(1, -1).trim();
    if (!inner) return [];
    const items = [];
    let cur = "";
    let quote = null;
    for (let i = 0; i < inner.length; i++) {
      const ch = inner[i];
      if (quote) {
        if (ch === "\\" && quote === '"' && i + 1 < inner.length) {
          cur += inner[i + 1];
          i++;
        } else if (ch === quote) {
          quote = null;
        } else {
          cur += ch;
        }
      } else if (ch === '"' || ch === "'") {
        quote = ch;
      } else if (ch === ",") {
        if (cur.trim()) items.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    if (cur.trim()) items.push(cur.trim());
    return items;
  }

  if (val.startsWith('"') && val.endsWith('"')) {
    try {
      return JSON.parse(val);
    } catch {
      return val.slice(1, -1);
    }
  }
  if (val.startsWith("'") && val.endsWith("'")) {
    return val.slice(1, -1).replace(/''/g, "'");
  }
  return val;
}

/**
 * Extract frontmatter metadata and Markdown body from a skill `.md` file.
 * @param {string} raw
 */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const [, fmText, body] = match;
  const data = {};
  let currentListKey = null;

  for (const line of fmText.split(/\r?\n/)) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const listMatch = line.match(/^\s+-\s+(.*)$/);
    if (listMatch && currentListKey) {
      if (!Array.isArray(data[currentListKey])) data[currentListKey] = [];
      data[currentListKey].push(parseYamlValue(listMatch[1]));
      continue;
    }
    const kvMatch = line.match(/^([a-zA-Z0-9_-]+):(.*)$/);
    if (kvMatch) {
      const [, key, rest] = kvMatch;
      const trimmed = rest.trim();
      if (trimmed === "") {
        currentListKey = key;
        data[key] = [];
      } else {
        currentListKey = null;
        data[key] = parseYamlValue(trimmed);
      }
    }
  }
  return { data, body: body.trim() };
}

/**
 * Load all `.md` files in a directory keyed by slug (filename without `.md`).
 * @param {string} dir
 * @returns {Map<string, string>}
 */
function loadMarkdownDir(dir) {
  const map = new Map();
  if (!existsSync(dir)) return map;
  for (const name of readdirSync(dir).sort()) {
    if (!name.toLowerCase().endsWith(".md")) continue;
    const slug = basename(name, ".md");
    map.set(slug, readFileSync(join(dir, name), "utf8"));
  }
  return map;
}

const skillFiles = loadMarkdownDir(SKILLS_DIR);
const guidesEn = loadMarkdownDir(GUIDES_EN_DIR);
const guidesVi = loadMarkdownDir(GUIDES_VI_DIR);

const allSlugs = new Set([
  ...skillFiles.keys(),
  ...guidesEn.keys(),
  ...guidesVi.keys(),
]);

const items = [...allSlugs]
  .sort((a, b) => a.localeCompare(b))
  .map((slug) => {
    const rawSkill = skillFiles.get(slug);
    const parsed = rawSkill ? parseFrontmatter(rawSkill) : { data: {}, body: "" };
    const d = parsed.data;
    const guideEn = guidesEn.get(slug) ?? null;
    const guideVi = guidesVi.get(slug) ?? null;

    return {
      slug,
      name: typeof d.name === "string" ? d.name : slug,
      description: typeof d.description === "string" ? d.description : "",
      agentDescription:
        typeof d.agentDescription === "string" ? d.agentDescription : "",
      platforms: Array.isArray(d.platforms) ? d.platforms : [],
      type: typeof d.type === "string" ? d.type : "skill",
      category: typeof d.category === "string" ? d.category : "productivity",
      builtByMicrosoft: Boolean(d.builtByMicrosoft),
      featured: Boolean(d.featured),
      tags: Array.isArray(d.tags) ? d.tags : [],
      author: typeof d.author === "string" ? d.author : "",
      authorUrl: typeof d.authorUrl === "string" ? d.authorUrl : "",
      authorGithub: typeof d.authorGithub === "string" ? d.authorGithub : "",
      version: typeof d.version === "string" ? d.version : "",
      createdAt: typeof d.createdAt === "string" ? d.createdAt : "",
      updatedAt: typeof d.updatedAt === "string" ? d.updatedAt : "",
      bundle: typeof d.bundle === "string" ? d.bundle : "",
      licenseName: typeof d.licenseName === "string" ? d.licenseName : "",
      skillMd: parsed.body,
      guideEn,
      guideVi,
    };
  });

const missingVi = [...guidesEn.keys()].filter((slug) => !guidesVi.has(slug));
if (missingVi.length > 0) {
  console.warn(
    `Warning: ${missingVi.length} guide(s) missing Vietnamese translation in src/content/guides-vi/: ${missingVi.slice(0, 10).join(", ")}${missingVi.length > 10 ? "..." : ""}`,
  );
}

// Escape `<` and line separators so embedded JSON cannot prematurely close `<script>`.
const payloadJson = JSON.stringify({
  generatedAt: new Date().toISOString(),
  stats: {
    total: items.length,
    skills: skillFiles.size,
    guidesEn: guidesEn.size,
    guidesVi: guidesVi.size,
  },
  items,
})
  .replace(/</g, "\\u003c")
  .replace(/\u2028/g, "\\u2028")
  .replace(/\u2029/g, "\\u2029");

const clientJs = readFileSync(CLIENT_JS_PATH, "utf8").replace(/<\/script/gi, "<\\/script");

const template = String.raw`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <script>
    try {
      var storedTheme = localStorage.getItem("cat-viewer-theme");
      if (storedTheme === "light" || storedTheme === "dark") {
        document.querySelector('meta[name="color-scheme"]').content = storedTheme;
      }
    } catch (e) {}
  </script>
  <title>CAT Agent Skills &amp; Guides Viewer</title>
  <style>
    :root {
      --bg-light: #fafafa;
      --surface-light: #ffffff;
      --surface-2-light: #f3f5f8;
      --fg-light: #1f2328;
      --muted-light: #57606a;
      --subtle-light: #6e7781;
      --border-light: #dfe3e8;
      --accent-light: #0078d4;
      --accent-fg-light: #ffffff;
      --accent-soft-light: #e7f2fc;
      --accent-text-light: #005a9e;
      --code-bg-light: #f6f8fa;

      --bg-dark: #15171c;
      --surface-dark: #1d2027;
      --surface-2-dark: #252932;
      --fg-dark: #eef1f6;
      --muted-dark: #adb5c2;
      --subtle-dark: #8b94a3;
      --border-dark: #323743;
      --accent-dark: #3aa0ff;
      --accent-fg-dark: #071322;
      --accent-soft-dark: #15314d;
      --accent-text-dark: #7cc2ff;
      --code-bg-dark: #121419;

      --bg: var(--bg-light);
      --surface: var(--surface-light);
      --surface-2: var(--surface-2-light);
      --fg: var(--fg-light);
      --muted: var(--muted-light);
      --subtle: var(--subtle-light);
      --border: var(--border-light);
      --accent: var(--accent-light);
      --accent-fg: var(--accent-fg-light);
      --accent-soft: var(--accent-soft-light);
      --accent-text: var(--accent-text-light);
      --code-bg: var(--code-bg-light);

      --cat-gradient: linear-gradient(90deg, #0078d4 0%, #5b8def 24%, #7f39fb 48%, #d83b73 75%, #ff8c00 100%);
      --font-sans: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --font-mono: ui-monospace, "Cascadia Code", "JetBrains Mono", Consolas, monospace;

      color-scheme: light dark;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --bg: var(--bg-dark);
        --surface: var(--surface-dark);
        --surface-2: var(--surface-2-dark);
        --fg: var(--fg-dark);
        --muted: var(--muted-dark);
        --subtle: var(--subtle-dark);
        --border: var(--border-dark);
        --accent: var(--accent-dark);
        --accent-fg: var(--accent-fg-dark);
        --accent-soft: var(--accent-soft-dark);
        --accent-text: var(--accent-text-dark);
        --code-bg: var(--code-bg-dark);
      }
    }

    @supports (color: light-dark(white, black)) {
      :root {
        --bg: light-dark(var(--bg-light), var(--bg-dark));
        --surface: light-dark(var(--surface-light), var(--surface-dark));
        --surface-2: light-dark(var(--surface-2-light), var(--surface-2-dark));
        --fg: light-dark(var(--fg-light), var(--fg-dark));
        --muted: light-dark(var(--muted-light), var(--muted-dark));
        --subtle: light-dark(var(--subtle-light), var(--subtle-dark));
        --border: light-dark(var(--border-light), var(--border-dark));
        --accent: light-dark(var(--accent-light), var(--accent-dark));
        --accent-fg: light-dark(var(--accent-fg-light), var(--accent-fg-dark));
        --accent-soft: light-dark(var(--accent-soft-light), var(--accent-soft-dark));
        --accent-text: light-dark(var(--accent-text-light), var(--accent-text-dark));
        --code-bg: light-dark(var(--code-bg-light), var(--code-bg-dark));
      }
    }

    :root:has(> head > meta[name="color-scheme"][content="dark"]) {
      color-scheme: dark;
      --bg: var(--bg-dark);
      --surface: var(--surface-dark);
      --surface-2: var(--surface-2-dark);
      --fg: var(--fg-dark);
      --muted: var(--muted-dark);
      --subtle: var(--subtle-dark);
      --border: var(--border-dark);
      --accent: var(--accent-dark);
      --accent-fg: var(--accent-fg-dark);
      --accent-soft: var(--accent-soft-dark);
      --accent-text: var(--accent-text-dark);
      --code-bg: var(--code-bg-dark);
    }

    :root:has(> head > meta[name="color-scheme"][content="light"]) {
      color-scheme: light;
      --bg: var(--bg-light);
      --surface: var(--surface-light);
      --surface-2: var(--surface-2-light);
      --fg: var(--fg-light);
      --muted: var(--muted-light);
      --subtle: var(--subtle-light);
      --border: var(--border-light);
      --accent: var(--accent-light);
      --accent-fg: var(--accent-fg-light);
      --accent-soft: var(--accent-soft-light);
      --accent-text: var(--accent-text-light);
      --code-bg: var(--code-bg-light);
    }

    *, *::before, *::after { box-sizing: border-box; }

    html, body {
      margin: 0;
      padding: 0;
      background-color: var(--bg);
      color: var(--fg);
      font-family: var(--font-sans);
      line-height: 1.5;
    }

    .visually-hidden:where(:not(:focus-within, :active)) {
      position: absolute !important;
      clip-path: inset(50%) !important;
      overflow: hidden !important;
      width: 1px !important;
      height: 1px !important;
      margin: -1px !important;
      padding: 0 !important;
      border: 0 !important;
      white-space: nowrap !important;
    }

    .skip-link:focus {
      position: fixed;
      top: 0.75rem;
      left: 0.75rem;
      z-index: 100;
      padding: 0.5rem 0.9rem;
      background: var(--accent);
      color: var(--accent-fg);
      border-radius: 0.5rem;
      font-weight: 600;
      text-decoration: none;
    }

    :where(a, button, input, select, summary, [tabindex]):focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    .site-header {
      position: sticky;
      top: 0;
      z-index: 30;
      border-bottom: 1px solid var(--border);
      background: color-mix(in srgb, var(--surface) 88%, transparent);
      backdrop-filter: blur(10px);
    }

    .header-inner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem 1.25rem;
      max-width: 100rem;
      margin-inline: auto;
      padding: 0.7rem 1.25rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      min-width: 0;
    }

    .brand-mark {
      width: 2rem;
      height: 2rem;
      display: grid;
      place-items: center;
      border-radius: 0.55rem;
      background: var(--cat-gradient);
      color: #fff;
      font-weight: 800;
      font-size: 0.85rem;
      letter-spacing: 0.02em;
      flex-shrink: 0;
    }

    .brand-title {
      font-weight: 700;
      font-size: 1.05rem;
      letter-spacing: -0.01em;
      background: var(--cat-gradient);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }

    .brand-subtitle {
      font-size: 0.78rem;
      color: var(--muted);
    }

    .header-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.65rem;
    }

    .stats-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.3rem 0.7rem;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--surface-2);
      font-size: 0.78rem;
      color: var(--muted);
    }

    .segmented {
      display: inline-flex;
      align-items: center;
      border: 1px solid var(--border);
      border-radius: 0.6rem;
      background: var(--surface-2);
      padding: 0.18rem;
      gap: 0.15rem;
    }

    .segmented button {
      border: 1px solid transparent;
      background: transparent;
      color: var(--muted);
      font: inherit;
      font-size: 0.82rem;
      font-weight: 600;
      padding: 0.34rem 0.72rem;
      min-height: 2rem;
      border-radius: 0.45rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      position: relative;
      transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    }

    .segmented button:hover:not(:disabled):not([aria-pressed="true"]):not([aria-selected="true"]) {
      color: var(--fg);
      background: color-mix(in srgb, var(--surface) 60%, transparent);
    }

    .segmented button[aria-pressed="true"],
    .segmented button[aria-selected="true"] {
      background: var(--surface);
      color: var(--accent-text);
      border-color: var(--accent);
    }

    .segmented button[aria-pressed="true"]::before,
    .segmented button[aria-selected="true"]::before {
      content: "✓";
      font-size: 0.75rem;
      font-weight: 700;
    }

    .segmented button:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      min-width: 2.25rem;
      min-height: 2.25rem;
      padding: 0.35rem 0.7rem;
      border-radius: 0.55rem;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--fg);
      font: inherit;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
    }

    .icon-btn:hover {
      border-color: var(--accent);
    }

    .icon-btn[aria-pressed="true"] {
      background: var(--accent-soft);
      border-color: var(--accent);
      color: var(--accent-text);
    }

    .workspace {
      display: grid;
      grid-template-columns: 22rem minmax(0, 1fr);
      max-width: 100rem;
      margin-inline: auto;
      min-height: calc(100vh - 3.9rem);
    }

    .sidebar {
      border-right: 1px solid var(--border);
      background: var(--surface);
      display: flex;
      flex-direction: column;
      height: calc(100vh - 3.9rem);
      position: sticky;
      top: 3.9rem;
    }

    .sidebar-controls {
      padding: 0.9rem;
      border-bottom: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      background: var(--surface);
    }

    .search-box {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-box svg {
      position: absolute;
      left: 0.7rem;
      width: 1rem;
      height: 1rem;
      color: var(--subtle);
      pointer-events: none;
    }

    .search-input {
      width: 100%;
      padding: 0.52rem 0.75rem 0.52rem 2.15rem;
      border-radius: 0.6rem;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--fg);
      font: inherit;
      font-size: 0.88rem;
    }

    .filter-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
    }

    .chip-btn {
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--muted);
      border-radius: 999px;
      padding: 0.25rem 0.62rem;
      min-height: 1.75rem;
      font: inherit;
      font-size: 0.76rem;
      font-weight: 600;
      cursor: pointer;
    }

    .chip-btn[aria-pressed="true"] {
      background: var(--accent-soft);
      color: var(--accent-text);
      border-color: var(--accent);
    }

    .filter-selects {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.45rem;
    }

    .filter-select {
      width: 100%;
      padding: 0.38rem 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border);
      background: var(--surface-2);
      color: var(--fg);
      font: inherit;
      font-size: 0.78rem;
    }

    .list-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.76rem;
      color: var(--muted);
    }

    .catalog-list {
      list-style: none;
      margin: 0;
      padding: 0.5rem;
      overflow-y: auto;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .catalog-item-li {
      content-visibility: auto;
      contain-intrinsic-size: auto 72px;
    }

    .catalog-btn {
      width: 100%;
      text-align: left;
      padding: 0.65rem 0.75rem;
      border-radius: 0.65rem;
      border: 1px solid transparent;
      border-left: 3px solid transparent;
      background: transparent;
      color: var(--fg);
      font: inherit;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      transition: background-color 0.12s ease, border-color 0.12s ease;
    }

    .catalog-btn:hover {
      background: var(--surface-2);
    }

    .catalog-btn[aria-current="true"] {
      background: var(--accent-soft);
      border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
      border-left-color: var(--accent);
    }

    .item-title-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .item-title {
      font-weight: 600;
      font-size: 0.88rem;
      line-height: 1.3;
    }

    .item-slug {
      font-family: var(--font-mono);
      font-size: 0.71rem;
      color: var(--subtle);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .item-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3rem;
      align-items: center;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.1rem 0.45rem;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--surface);
      font-size: 0.69rem;
      font-weight: 600;
      color: var(--muted);
    }

    .badge--guide {
      background: var(--accent-soft);
      border-color: color-mix(in srgb, var(--accent) 45%, var(--border));
      color: var(--accent-text);
    }

    .badge--ms {
      border-color: color-mix(in srgb, #7f39fb 40%, var(--border));
      color: var(--fg);
    }

    .reader {
      padding: 1.5rem 2rem 3.5rem;
      min-width: 0;
      max-width: 64rem;
    }

    .mobile-drawer-btn {
      display: none;
      margin-bottom: 1rem;
    }

    .detail-hero {
      border: 1px solid var(--border);
      border-radius: 0.95rem;
      background: var(--surface);
      padding: 1.25rem 1.4rem;
      margin-bottom: 1.15rem;
    }

    .detail-eyebrow {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      align-items: center;
      margin-bottom: 0.55rem;
    }

    .detail-title {
      margin: 0;
      font-size: clamp(1.45rem, 2.5vw, 2rem);
      line-height: 1.2;
      letter-spacing: -0.02em;
    }

    .detail-desc {
      margin: 0.55rem 0 0;
      color: var(--muted);
      font-size: 1rem;
    }

    .detail-meta-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem 1.25rem;
      margin-top: 0.9rem;
      padding-top: 0.85rem;
      border-top: 1px solid var(--border);
      font-size: 0.82rem;
      color: var(--muted);
    }

    .detail-meta-grid strong {
      color: var(--fg);
      font-weight: 600;
    }

    .detail-meta-grid a {
      color: var(--accent-text);
    }

    .agent-desc-details {
      margin-top: 0.85rem;
      border: 1px solid var(--border);
      border-radius: 0.6rem;
      background: var(--surface-2);
      padding: 0.55rem 0.85rem;
      font-size: 0.85rem;
    }

    .agent-desc-details summary {
      cursor: pointer;
      font-weight: 600;
      color: var(--fg);
    }

    .agent-desc-details p {
      margin: 0.55rem 0 0.15rem;
      color: var(--muted);
    }

    .view-toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.7rem 0.95rem;
      border: 1px solid var(--border);
      border-radius: 0.85rem;
      background: var(--surface);
      margin-bottom: 1.25rem;
    }

    .tablist {
      display: inline-flex;
      gap: 0.25rem;
    }

    .tab-btn {
      position: relative;
      border: 1px solid transparent;
      background: transparent;
      color: var(--muted);
      font: inherit;
      font-size: 0.9rem;
      font-weight: 600;
      padding: 0.45rem 0.85rem;
      min-height: 2.3rem;
      border-radius: 0.5rem;
      cursor: pointer;
    }

    .tab-btn:hover:not(:disabled) {
      color: var(--fg);
      background: var(--surface-2);
    }

    .tab-btn[aria-selected="true"] {
      color: var(--accent-text);
      background: var(--accent-soft);
    }

    .tab-btn[aria-selected="true"]::after {
      content: "";
      position: absolute;
      inset: auto 0.45rem 0;
      border-bottom: 3px solid var(--accent);
      border-radius: 2px;
    }

    .tab-btn:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .toolbar-right {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.6rem;
    }

    .lang-switcher {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
    }

    .lang-switcher[hidden] {
      display: none;
    }

    .lang-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--muted);
    }

    .lang-toggle-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.42rem 0.9rem;
      min-height: 2.3rem;
      border-radius: 0.6rem;
      border: 1px solid var(--accent);
      background: var(--accent);
      color: var(--accent-fg);
      font: inherit;
      font-size: 0.84rem;
      font-weight: 600;
      cursor: pointer;
    }

    .lang-toggle-btn:hover:not(:disabled) {
      opacity: 0.92;
    }

    .lang-toggle-btn:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .article-shell {
      border: 1px solid var(--border);
      border-radius: 0.95rem;
      background: var(--surface);
      padding: 1.6rem 1.85rem;
    }

    .prose {
      max-width: 74ch;
      font-size: 1rem;
      line-height: 1.7;
      color: var(--fg);
    }

    .prose > *:first-child { margin-top: 0; }
    .prose > *:last-child { margin-bottom: 0; }

    .prose h1, .prose h2, .prose h3, .prose h4 {
      line-height: 1.25;
      letter-spacing: -0.015em;
      margin-top: 1.75em;
      margin-bottom: 0.6em;
      color: var(--fg);
      scroll-margin-top: 5rem;
    }

    .prose h1 { font-size: 1.7rem; border-bottom: 1px solid var(--border); padding-bottom: 0.35rem; }
    .prose h2 { font-size: 1.35rem; border-bottom: 1px solid var(--border); padding-bottom: 0.25rem; }
    .prose h3 { font-size: 1.12rem; }
    .prose h4 { font-size: 1rem; }

    .prose p, .prose ul, .prose ol, .prose blockquote, .prose pre, .prose .table-wrap {
      margin-block: 0.9rem;
    }

    .prose ul, .prose ol {
      padding-left: 1.5rem;
    }

    .prose li + li {
      margin-top: 0.35rem;
    }

    .prose a {
      color: var(--accent-text);
      text-decoration: underline;
      text-underline-offset: 0.18em;
    }

    .prose blockquote {
      margin-inline: 0;
      padding: 0.65rem 1rem;
      border-left: 4px solid var(--accent);
      background: var(--surface-2);
      border-radius: 0 0.5rem 0.5rem 0;
      color: var(--muted);
    }

    .prose blockquote p {
      margin-block: 0.25rem;
    }

    .prose code {
      font-family: var(--font-mono);
      font-size: 0.86em;
      padding: 0.14em 0.38em;
      border-radius: 0.32rem;
      background: var(--surface-2);
      color: var(--accent-text);
      overflow-wrap: break-word;
    }

    .prose pre {
      position: relative;
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 0.65rem;
      padding: 0.95rem 1.05rem;
      overflow-x: auto;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      line-height: 1.55;
      color: var(--fg);
    }

    .prose pre code {
      padding: 0;
      background: transparent;
      color: inherit;
      font-size: inherit;
    }

    .code-figure {
      margin: 1rem 0;
    }

    .code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 0.74rem;
      color: var(--muted);
      padding: 0.3rem 0.75rem;
      border: 1px solid var(--border);
      border-bottom: 0;
      border-radius: 0.65rem 0.65rem 0 0;
      background: var(--surface-2);
    }

    .code-header + pre {
      margin-top: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    .copy-code-btn {
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--fg);
      border-radius: 0.4rem;
      padding: 0.15rem 0.55rem;
      font: inherit;
      font-size: 0.72rem;
      cursor: pointer;
    }

    .table-wrap {
      overflow-x: auto;
      border: 1px solid var(--border);
      border-radius: 0.65rem;
    }

    .prose table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }

    .prose th, .prose td {
      padding: 0.55rem 0.8rem;
      border-bottom: 1px solid var(--border);
      text-align: left;
      vertical-align: top;
    }

    .prose thead th {
      background: var(--surface-2);
      font-weight: 600;
      color: var(--fg);
    }

    .prose tbody tr:last-child td {
      border-bottom: 0;
    }

    .prose hr {
      border: 0;
      border-top: 1px solid var(--border);
      margin: 1.5rem 0;
    }

    .prose img {
      max-width: 100%;
      height: auto;
      border-radius: 0.65rem;
      border: 1px solid var(--border);
    }

    /* Compatibility styles for pre-generated Tailwind blocks inside awaiting-reply.md */
    .not-prose { margin-block: 1.25rem; }
    .not-prose .mb-2 { margin-bottom: 0.5rem; }
    .not-prose .mb-3 { margin-bottom: 0.75rem; }
    .not-prose .mb-6 { margin-bottom: 1.5rem; }
    .not-prose .flex { display: flex; }
    .not-prose .items-center { align-items: center; }
    .not-prose .items-baseline { align-items: baseline; }
    .not-prose .justify-center { justify-content: center; }
    .not-prose .gap-2 { gap: 0.5rem; }
    .not-prose .gap-2\.5 { gap: 0.625rem; }
    .not-prose .shrink-0 { flex-shrink: 0; }
    .not-prose .h-4 { height: 1rem; }
    .not-prose .w-4 { width: 1rem; }
    .not-prose .h-6 { height: 1.5rem; }
    .not-prose .w-6 { width: 1.5rem; }
    .not-prose .rounded-full { border-radius: 9999px; }
    .not-prose .rounded-lg { border-radius: 0.5rem; }
    .not-prose .bg-accent { background-color: var(--accent); }
    .not-prose .text-white { color: var(--accent-fg); }
    .not-prose .text-accent-text { color: var(--accent-text); }
    .not-prose .text-fg { color: var(--fg); }
    .not-prose .text-muted { color: var(--muted); }
    .not-prose .text-subtle { color: var(--subtle); }
    .not-prose .text-xs { font-size: 0.75rem; }
    .not-prose .text-sm { font-size: 0.875rem; }
    .not-prose .font-bold { font-weight: 700; }
    .not-prose .font-semibold { font-weight: 600; }
    .not-prose .font-medium { font-weight: 500; }
    .not-prose .uppercase { text-transform: uppercase; }
    .not-prose .tracking-wider { letter-spacing: 0.05em; }
    .not-prose h2, .not-prose h3, .not-prose p { margin: 0; border: 0; padding: 0; font-size: inherit; }
    .not-prose ol { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1.25rem; }
    .not-prose pre { margin: 0; padding: 0.85rem 1rem; background: var(--surface-2); border: 1px solid var(--border); color: var(--muted); white-space: pre-wrap; word-break: break-word; max-height: 28rem; overflow: auto; }

    .raw-pre {
      margin: 0;
      padding: 1.1rem;
      border-radius: 0.65rem;
      border: 1px solid var(--border);
      background: var(--code-bg);
      font-family: var(--font-mono);
      font-size: 0.84rem;
      line-height: 1.55;
      white-space: pre-wrap;
      word-break: break-word;
      overflow-x: auto;
    }

    .empty-panel {
      padding: 2rem;
      text-align: center;
      color: var(--muted);
    }

    @media (max-width: 920px) {
      .workspace {
        grid-template-columns: 1fr;
      }
      .sidebar {
        position: fixed;
        inset: 3.85rem auto 0 0;
        width: min(22rem, 88vw);
        height: calc(100vh - 3.85rem);
        z-index: 40;
        transform: translateX(-105%);
        transition: transform 0.2s ease;
        box-shadow: 0 12px 32px rgb(0 0 0 / 0.28);
      }
      .sidebar[data-open="true"] {
        transform: translateX(0);
      }
      .mobile-drawer-btn {
        display: inline-flex;
      }
      .reader {
        padding: 1rem 1rem 2.5rem;
      }
      .article-shell {
        padding: 1.1rem 1rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      * { transition: none !important; scroll-behavior: auto !important; }
    }
  </style>
</head>
<body>
  <a href="#main-reader" class="skip-link visually-hidden">Skip to content</a>

  <header class="site-header">
    <div class="header-inner">
      <div class="brand">
        <span class="brand-mark" aria-hidden="true">CAT</span>
        <div>
          <div class="brand-title">CAT Agent Skills &amp; Guides</div>
          <div class="brand-subtitle">Local viewer for <code>src/content/skills</code>, <code>guides</code> &amp; <code>guides-vi</code></div>
        </div>
      </div>

      <div class="header-actions">
        <span class="stats-pill" id="header-stats">Loading…</span>

        <div class="segmented" role="group" aria-label="Default guide language">
          <button type="button" id="global-lang-en" data-global-lang="en" aria-pressed="true">EN · English</button>
          <button type="button" id="global-lang-vi" data-global-lang="vi" aria-pressed="false">VI · Tiếng Việt</button>
        </div>

        <button type="button" id="theme-toggle" class="icon-btn" aria-label="Toggle color theme">
          <span id="theme-icon" aria-hidden="true">◐</span>
          <span id="theme-label">Theme</span>
        </button>
      </div>
    </div>
  </header>

  <div class="workspace">
    <aside class="sidebar" id="catalog-sidebar" aria-label="Skills and guides catalog">
      <div class="sidebar-controls">
        <search>
          <label for="catalog-search" class="visually-hidden">Search skills and guides</label>
          <div class="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7"></circle>
              <path d="m21 21-4.3-4.3" stroke-linecap="round"></path>
            </svg>
            <input id="catalog-search" class="search-input" type="search" placeholder="Search name, slug, tag, author…" autocomplete="off">
          </div>
        </search>

        <div class="filter-row" role="group" aria-label="Collection filter">
          <button type="button" class="chip-btn" data-scope="all" aria-pressed="true">All</button>
          <button type="button" class="chip-btn" data-scope="guides" aria-pressed="false">Guides</button>
          <button type="button" class="chip-btn" data-scope="skills-only" aria-pressed="false">Skill only</button>
        </div>

        <div class="filter-selects">
          <label class="visually-hidden" for="platform-filter">Filter by platform</label>
          <select id="platform-filter" class="filter-select" aria-label="Filter by platform">
            <option value="">All platforms</option>
            <option value="Cowork">Cowork</option>
            <option value="Copilot Studio">Copilot Studio</option>
            <option value="Scout">Scout</option>
          </select>

          <label class="visually-hidden" for="type-filter">Filter by type</label>
          <select id="type-filter" class="filter-select" aria-label="Filter by type">
            <option value="">All types</option>
            <option value="skill">Skill</option>
            <option value="plugin">Plugin</option>
            <option value="automation">Automation</option>
          </select>
        </div>

        <div class="list-meta">
          <span id="visible-count" role="status" aria-live="polite">0 items</span>
          <button type="button" id="reset-filters" class="chip-btn" hidden>Reset</button>
        </div>
      </div>

      <ul id="catalog-list" class="catalog-list"></ul>
    </aside>

    <main id="main-reader" class="reader" tabindex="-1">
      <button type="button" id="mobile-drawer-btn" class="icon-btn mobile-drawer-btn" aria-expanded="false" aria-controls="catalog-sidebar">
        ☰ Browse Skills &amp; Guides
      </button>

      <section class="detail-hero" aria-labelledby="detail-title">
        <div class="detail-eyebrow" id="detail-eyebrow"></div>
        <h1 id="detail-title" class="detail-title">Select an item</h1>
        <p id="detail-desc" class="detail-desc"></p>
        <div id="detail-meta" class="detail-meta-grid"></div>
        <details id="agent-desc-details" class="agent-desc-details" hidden>
          <summary>Agent trigger description (<code>agentDescription</code>)</summary>
          <p id="agent-desc-text"></p>
        </details>
      </section>

      <div class="view-toolbar">
        <div class="tablist" role="tablist" aria-label="Content view">
          <button type="button" role="tab" id="tab-guide" aria-selected="true" aria-controls="panel-content">Guide</button>
          <button type="button" role="tab" id="tab-skill" aria-selected="false" aria-controls="panel-content">Skill (SKILL.md)</button>
        </div>

        <div class="toolbar-right">
          <div id="guide-lang-controls" class="lang-switcher" role="group" aria-label="Guide language switch">
            <span class="lang-label" id="guide-lang-status">Guide language:</span>
            <div class="segmented">
              <button type="button" id="btn-lang-en" data-guide-lang="en" aria-pressed="true">English</button>
              <button type="button" id="btn-lang-vi" data-guide-lang="vi" aria-pressed="false">Tiếng Việt</button>
            </div>
            <button type="button" id="btn-lang-toggle" class="lang-toggle-btn">⇄ Switch to Tiếng Việt</button>
          </div>

          <button type="button" id="btn-raw-toggle" class="icon-btn" aria-pressed="false">Raw .md</button>
        </div>
      </div>

      <div id="panel-content" class="article-shell" role="tabpanel" aria-labelledby="tab-guide" tabindex="0">
        <article id="doc-article" class="prose" lang="en"></article>
      </div>
      <p id="live-announcer" class="visually-hidden" role="status" aria-live="polite"></p>
    </main>
  </div>

  <script id="content-data" type="application/json">__CONTENT_PAYLOAD__</script>
  <script>__CLIENT_JS__</script>
</body>
</html>
`;

const html = template
  .replace("__CONTENT_PAYLOAD__", () => payloadJson)
  .replace("__CLIENT_JS__", () => clientJs);

writeFileSync(OUT_FILE, html, "utf8");
console.log(
  `Generated ${OUT_FILE} (${items.length} items: ${skillFiles.size} skills, ${guidesEn.size} EN guides, ${guidesVi.size} VI guides)`,
);
