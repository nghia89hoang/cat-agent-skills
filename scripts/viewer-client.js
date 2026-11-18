(function () {
  const payload = JSON.parse(document.getElementById("content-data").textContent);
  const items = payload.items;
  const bySlug = new Map(items.map((item) => [item.slug, item]));

  const state = {
    slug: items[0] ? items[0].slug : "",
    view: "guide",
    lang: "en",
    raw: false,
    search: "",
    scope: "all",
    platform: "",
    type: "",
  };

  try {
    const savedLang = localStorage.getItem("cat-viewer-lang");
    if (savedLang === "vi" || savedLang === "en") state.lang = savedLang;
  } catch (e) {}

  function applyHash() {
    const rawHash = window.location.hash.replace(/^#/, "");
    if (!rawHash) return;
    const params = new URLSearchParams(rawHash);
    const slug = params.get("slug");
    if (slug && bySlug.has(slug)) state.slug = slug;
    const view = params.get("view");
    if (view === "guide" || view === "skill") state.view = view;
    const lang = params.get("lang");
    if (lang === "en" || lang === "vi") state.lang = lang;
  }

  function writeHash() {
    const params = new URLSearchParams();
    if (state.slug) params.set("slug", state.slug);
    params.set("view", state.view);
    params.set("lang", state.lang);
    history.replaceState(null, "", "#" + params.toString());
  }

  applyHash();

  const el = {
    headerStats: document.getElementById("header-stats"),
    globalLangEn: document.getElementById("global-lang-en"),
    globalLangVi: document.getElementById("global-lang-vi"),
    themeToggle: document.getElementById("theme-toggle"),
    themeLabel: document.getElementById("theme-label"),
    sidebar: document.getElementById("catalog-sidebar"),
    mobileDrawerBtn: document.getElementById("mobile-drawer-btn"),
    search: document.getElementById("catalog-search"),
    scopeBtns: [...document.querySelectorAll("[data-scope]")],
    platformFilter: document.getElementById("platform-filter"),
    typeFilter: document.getElementById("type-filter"),
    visibleCount: document.getElementById("visible-count"),
    resetFilters: document.getElementById("reset-filters"),
    catalogList: document.getElementById("catalog-list"),
    detailEyebrow: document.getElementById("detail-eyebrow"),
    detailTitle: document.getElementById("detail-title"),
    detailDesc: document.getElementById("detail-desc"),
    detailMeta: document.getElementById("detail-meta"),
    agentDescDetails: document.getElementById("agent-desc-details"),
    agentDescText: document.getElementById("agent-desc-text"),
    tabGuide: document.getElementById("tab-guide"),
    tabSkill: document.getElementById("tab-skill"),
    guideLangControls: document.getElementById("guide-lang-controls"),
    btnLangEn: document.getElementById("btn-lang-en"),
    btnLangVi: document.getElementById("btn-lang-vi"),
    btnLangToggle: document.getElementById("btn-lang-toggle"),
    btnRawToggle: document.getElementById("btn-raw-toggle"),
    panelContent: document.getElementById("panel-content"),
    docArticle: document.getElementById("doc-article"),
    announcer: document.getElementById("live-announcer"),
  };

  el.headerStats.textContent =
    payload.stats.skills + " Skills · " + payload.stats.guidesEn + " Guides (EN/VI)";

  function escHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function slugifyHeading(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/<[^>]+>/g, "")
      .replace(/[`*_~()[\]{}.,:;!?'"]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function formatInline(raw) {
    const tokens = [];
    // Inline code spans (supports double or single backticks)
    let str = String(raw).replace(/``([^`]+)``|`([^`]+)`/g, function (_, dbl, sgl) {
      const idx = tokens.length;
      tokens.push("<code>" + escHtml((dbl !== undefined ? dbl : sgl).trim()) + "</code>");
      return "\u0000TOK" + idx + "\u0000";
    });

    // Preserve safe inline <br> / <kbd> tags
    str = str.replace(/<br\s*\/?>/gi, function () {
      const idx = tokens.length;
      tokens.push("<br>");
      return "\u0000TOK" + idx + "\u0000";
    });

    str = escHtml(str);

    // Markdown links [text](url "optional title")
    str = str.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g, function (_, label, url, title) {
      const safeHref = /^(https?:|mailto:|#)/i.test(url) ? url : "#";
      const isExternal = /^https?:/i.test(safeHref);
      const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
      const titleAttr = title ? ' title="' + title + '"' : "";
      return '<a href="' + safeHref + '"' + attrs + titleAttr + ">" + label + "</a>";
    });

    // Bold, italic, strikethrough (avoiding snake_case false positives)
    str = str.replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>");
    str = str.replace(/__([^_]+?)__/g, "<strong>$1</strong>");
    str = str.replace(/(^|[\s(>])\*([^*\n]+?)\*(?=[\s.,;:!?)'"<]|$)/g, "$1<em>$2</em>");
    str = str.replace(/(^|[\s(>])_([^_\n]+?)_(?=[\s.,;:!?)'"<]|$)/g, "$1<em>$2</em>");
    str = str.replace(/~~([^~]+?)~~/g, "<del>$1</del>");

    str = str.replace(/\u0000TOK(\d+)\u0000/g, function (_, idx) {
      return tokens[Number(idx)] || "";
    });
    return str;
  }

  function parseTableRow(line) {
    const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
    const cells = [];
    let cur = "";
    let inCode = false;
    for (let i = 0; i < trimmed.length; i++) {
      const ch = trimmed[i];
      if (ch === "`") inCode = !inCode;
      if (ch === "\\" && i + 1 < trimmed.length) {
        cur += trimmed[i + 1];
        i++;
        continue;
      }
      if (ch === "|" && !inCode) {
        cells.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    cells.push(cur.trim());
    return cells;
  }

  function isTableSeparator(line) {
    const trimmed = line.trim();
    if (!trimmed.includes("|") || !trimmed.includes("-")) return false;
    const cells = parseTableRow(trimmed);
    return cells.length > 0 && cells.every((c) => /^:?-{2,}:?$/.test(c));
  }

  function renderMarkdown(md) {
    if (!md) return "";
    const preservedBlocks = [];
    let src = String(md).replace(/\r\n/g, "\n");

    // Preserve explicit pre-generated step blocks (awaiting-reply.md)
    src = src.replace(/<!-- GENERATED:STEPS -->([\s\S]*?)<!-- \/GENERATED:STEPS -->/g, function (_, inner) {
      const idx = preservedBlocks.length;
      preservedBlocks.push(inner);
      return "\n\n@@PRESERVED_BLOCK_" + idx + "@@\n\n";
    });

    // Preserve safe standalone <img ...> tags (sharepoint-list-insight-report-generator.md)
    src = src.replace(/<img\s+([^>]+)\s*\/?>/gi, function (_, attrs) {
      const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
      if (!srcMatch || !/^https?:\/\//i.test(srcMatch[1])) return "";
      const altMatch = attrs.match(/alt=["']([^"']*)["']/i);
      const wMatch = attrs.match(/width=["'](\d+)["']/i);
      const hMatch = attrs.match(/height=["'](\d+)["']/i);
      const idx = preservedBlocks.length;
      preservedBlocks.push(
        '<img src="' + escHtml(srcMatch[1]) + '"' +
        ' alt="' + escHtml(altMatch ? altMatch[1] : "") + '"' +
        (wMatch ? ' width="' + wMatch[1] + '"' : "") +
        (hMatch ? ' height="' + hMatch[1] + '"' : "") +
        ' loading="lazy">'
      );
      return "\n\n@@PRESERVED_BLOCK_" + idx + "@@\n\n";
    });

    const lines = src.split("\n");
    const out = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      const pMatch = line.trim().match(/^@@PRESERVED_BLOCK_(\d+)@@$/);
      if (pMatch) {
        out.push(preservedBlocks[Number(pMatch[1])]);
        i++;
        continue;
      }

      if (!line.trim()) {
        i++;
        continue;
      }

      // Fenced code block (``` or ~~~)
      const fenceMatch = line.match(/^(\s*)(`{3,}|~{3,})(.*)$/);
      if (fenceMatch) {
        const indentLen = fenceMatch[1].length;
        const fence = fenceMatch[2];
        const lang = fenceMatch[3].trim();
        const codeLines = [];
        i++;
        while (i < lines.length) {
          const closeMatch = lines[i].match(/^\s*(`{3,}|~{3,})\s*$/);
          if (closeMatch && closeMatch[1][0] === fence[0] && closeMatch[1].length >= fence.length) {
            i++;
            break;
          }
          const rawLine = lines[i];
          const stripped = indentLen > 0 && rawLine.startsWith(" ".repeat(indentLen))
            ? rawLine.slice(indentLen)
            : rawLine;
          codeLines.push(stripped);
          i++;
        }
        const codeText = codeLines.join("\n");
        const langLabel = lang ? escHtml(lang) : "text";
        out.push(
          '<figure class="code-figure">' +
            '<div class="code-header"><span>' + langLabel + '</span>' +
            '<button type="button" class="copy-code-btn">Copy</button></div>' +
            '<pre role="region" aria-label="' + langLabel + ' code block" tabindex="0"><code>' +
            escHtml(codeText) +
            "</code></pre></figure>"
        );
        continue;
      }

      // Heading
      const hMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (hMatch) {
        const level = hMatch[1].length;
        const text = hMatch[2].replace(/\s+#+\s*$/, "");
        const id = slugifyHeading(text);
        out.push("<h" + level + (id ? ' id="' + escHtml(id) + '"' : "") + ">" + formatInline(text) + "</h" + level + ">");
        i++;
        continue;
      }

      // Horizontal rule
      if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
        out.push("<hr>");
        i++;
        continue;
      }

      // Blockquote
      if (/^\s*>/.test(line)) {
        const bqLines = [];
        while (i < lines.length && (/^\s*>/.test(lines[i]) || (lines[i].trim() !== "" && bqLines.length > 0 && !/^(#{1,6}|\s*[-*+]|\s*\d+\.|\s*```)/.test(lines[i])))) {
          bqLines.push(lines[i].replace(/^\s*>\s?/, ""));
          i++;
        }
        out.push("<blockquote>" + renderMarkdown(bqLines.join("\n")) + "</blockquote>");
        continue;
      }

      // GFM Table
      if (line.includes("|") && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
        const headers = parseTableRow(line);
        const aligns = parseTableRow(lines[i + 1]).map((sep) => {
          if (sep.startsWith(":") && sep.endsWith(":")) return "center";
          if (sep.endsWith(":")) return "right";
          return "left";
        });
        i += 2;
        const rows = [];
        while (i < lines.length && lines[i].trim() && lines[i].includes("|")) {
          rows.push(parseTableRow(lines[i]));
          i++;
        }
        let tbl = '<div class="table-wrap"><table><thead><tr>';
        headers.forEach((h, colIdx) => {
          const al = aligns[colIdx] || "left";
          tbl += '<th scope="col" style="text-align:' + al + '">' + formatInline(h) + "</th>";
        });
        tbl += "</tr></thead><tbody>";
        rows.forEach((row) => {
          tbl += "<tr>";
          headers.forEach((_, colIdx) => {
            const al = aligns[colIdx] || "left";
            tbl += '<td style="text-align:' + al + '">' + formatInline(row[colIdx] || "") + "</td>";
          });
          tbl += "</tr>";
        });
        tbl += "</tbody></table></div>";
        out.push(tbl);
        continue;
      }

      // Lists (ordered or unordered)
      const listMatch = line.match(/^(\s*)([-*+]|(\d+)\.)\s+(.*)$/);
      if (listMatch) {
        const isOrdered = Boolean(listMatch[3]);
        const startNum = isOrdered ? Number(listMatch[3]) : 1;
        const baseIndent = listMatch[1].length;
        const tag = isOrdered ? "ol" : "ul";
        const itemsHtml = [];

        while (i < lines.length) {
          const cur = lines[i];
          const m = cur.match(/^(\s*)([-*+]|(\d+)\.)\s+(.*)$/);
          if (!m) break;
          if (m[1].length < baseIndent) break;
          const itemIsOrdered = Boolean(m[3]);
          if (m[1].length === baseIndent && itemIsOrdered !== isOrdered) break;

          if (m[1].length > baseIndent) {
            // Nested list lines
            const nestedLines = [];
            const nestedIndent = m[1].length;
            while (i < lines.length) {
              const nl = lines[i];
              if (!nl.trim()) {
                nestedLines.push("");
                i++;
                continue;
              }
              const lead = nl.match(/^(\s*)/)[1].length;
              if (lead < nestedIndent) break;
              nestedLines.push(nl.slice(nestedIndent));
              i++;
            }
            if (itemsHtml.length > 0) {
              itemsHtml[itemsHtml.length - 1] =
                itemsHtml[itemsHtml.length - 1].replace(/<\/li>$/, "") +
                renderMarkdown(nestedLines.join("\n")) +
                "</li>";
            }
            continue;
          }

          let itemText = m[4];
          i++;
          while (
            i < lines.length &&
            lines[i].trim() &&
            !/^(\s*)([-*+]|\d+\.)\s+/.test(lines[i]) &&
            !/^(#{1,6}\s|>|\s*(?:`{3,}|~{3,}))/.test(lines[i])
          ) {
            itemText += " " + lines[i].trim();
            i++;
          }

          const taskMatch = itemText.match(/^\[([ xX])\]\s+(.*)$/);
          if (taskMatch) {
            const checked = taskMatch[1].toLowerCase() === "x";
            itemsHtml.push(
              '<li><input type="checkbox" disabled' + (checked ? " checked" : "") + "> " + formatInline(taskMatch[2]) + "</li>"
            );
          } else {
            itemsHtml.push("<li>" + formatInline(itemText) + "</li>");
          }

          // Allow loose list blank line followed by same-type next item
          if (i < lines.length && !lines[i].trim() && i + 1 < lines.length) {
            const nextM = lines[i + 1].match(/^(\s*)([-*+]|(\d+)\.)\s+/);
            if (nextM && nextM[1].length === baseIndent && Boolean(nextM[3]) === isOrdered) {
              i++;
            }
          }
        }

        const openTag = isOrdered && startNum !== 1 ? '<ol start="' + startNum + '">' : "<" + tag + ">";
        out.push(openTag + itemsHtml.join("") + "</" + tag + ">");
        continue;
      }

      // Paragraph
      const pLines = [line];
      i++;
      while (
        i < lines.length &&
        lines[i].trim() !== "" &&
        !/^(#{1,6}\s|\s*>|\s*[-*+]\s|\s*\d+\.\s|\s*(?:`{3,}|~{3,})|\s*(?:-{3,}|\*{3,}|_{3,})\s*$|@@PRESERVED_BLOCK_)/.test(lines[i])
      ) {
        if (lines[i].includes("|") && i + 1 < lines.length && isTableSeparator(lines[i + 1])) break;
        pLines.push(lines[i]);
        i++;
      }
      out.push("<p>" + formatInline(pLines.join(" ")) + "</p>");
    }

    return out.join("\n");
  }

  function getFilteredItems() {
    const q = state.search.trim().toLowerCase();
    return items.filter((item) => {
      if (state.scope === "guides" && !item.guideEn && !item.guideVi) return false;
      if (state.scope === "skills-only" && (item.guideEn || item.guideVi)) return false;
      if (state.platform && !item.platforms.includes(state.platform)) return false;
      if (state.type && item.type !== state.type) return false;
      if (!q) return true;
      const hay = (
        item.name + " " + item.slug + " " + item.description + " " +
        item.author + " " + item.category + " " + item.tags.join(" ")
      ).toLowerCase();
      return hay.includes(q);
    });
  }

  function renderCatalog() {
    const filtered = getFilteredItems();
    const hasFilters = Boolean(state.search || state.scope !== "all" || state.platform || state.type);
    el.resetFilters.hidden = !hasFilters;
    el.visibleCount.textContent = filtered.length + " of " + items.length + " items";

    const frag = document.createDocumentFragment();
    if (filtered.length === 0) {
      const empty = document.createElement("li");
      empty.className = "empty-panel";
      empty.textContent = "No matching skills or guides.";
      frag.appendChild(empty);
    } else {
      for (const item of filtered) {
        const li = document.createElement("li");
        li.className = "catalog-item-li";

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "catalog-btn";
        btn.dataset.slug = item.slug;
        if (item.slug === state.slug) btn.setAttribute("aria-current", "true");

        const titleRow = document.createElement("div");
        titleRow.className = "item-title-row";
        const titleSpan = document.createElement("span");
        titleSpan.className = "item-title";
        titleSpan.textContent = item.name;
        titleRow.appendChild(titleSpan);

        const slugSpan = document.createElement("span");
        slugSpan.className = "item-slug";
        slugSpan.textContent = item.slug;

        const badges = document.createElement("div");
        badges.className = "item-badges";

        const typeBadge = document.createElement("span");
        typeBadge.className = "badge";
        typeBadge.textContent = item.type;
        badges.appendChild(typeBadge);

        if (item.guideEn || item.guideVi) {
          const guideBadge = document.createElement("span");
          guideBadge.className = "badge badge--guide";
          guideBadge.textContent = item.guideVi ? "Guide EN/VI" : "Guide EN";
          badges.appendChild(guideBadge);
        }

        if (item.builtByMicrosoft) {
          const msBadge = document.createElement("span");
          msBadge.className = "badge badge--ms";
          msBadge.textContent = "Microsoft";
          badges.appendChild(msBadge);
        }

        btn.appendChild(titleRow);
        btn.appendChild(slugSpan);
        btn.appendChild(badges);
        li.appendChild(btn);
        frag.appendChild(li);
      }
    }
    el.catalogList.replaceChildren(frag);
  }

  function renderDetail() {
    const item = bySlug.get(state.slug) || items[0];
    if (!item) return;
    state.slug = item.slug;

    const hasGuide = Boolean(item.guideEn || item.guideVi);
    if (state.view === "guide" && !hasGuide) {
      state.view = "skill";
    }

    el.globalLangEn.setAttribute("aria-pressed", String(state.lang === "en"));
    el.globalLangVi.setAttribute("aria-pressed", String(state.lang === "vi"));

    const eyebrowBadges = [];
    eyebrowBadges.push('<span class="badge">' + escHtml(item.type.toUpperCase()) + "</span>");
    if (item.builtByMicrosoft) {
      eyebrowBadges.push('<span class="badge badge--ms">Built by Microsoft</span>');
    }
    if (hasGuide) {
      eyebrowBadges.push(
        '<span class="badge badge--guide">' +
        (item.guideVi ? "Has Bilingual Guide (EN / VI)" : "Has Guide (EN)") +
        "</span>"
      );
    } else {
      eyebrowBadges.push('<span class="badge">Skill instructions only</span>');
    }
    item.platforms.forEach((p) => {
      eyebrowBadges.push('<span class="badge">' + escHtml(p) + "</span>");
    });

    el.detailEyebrow.innerHTML = eyebrowBadges.join("");
    el.detailTitle.textContent = item.name;
    el.detailDesc.textContent = item.description || "No catalog description provided.";

    const metaParts = [];
    metaParts.push("<span><strong>Slug:</strong> <code>" + escHtml(item.slug) + "</code></span>");
    metaParts.push("<span><strong>Category:</strong> " + escHtml(item.category) + "</span>");
    if (item.author) {
      if (item.authorUrl && /^https?:\/\//i.test(item.authorUrl)) {
        metaParts.push(
          '<span><strong>Author:</strong> <a href="' + escHtml(item.authorUrl) +
          '" target="_blank" rel="noopener noreferrer">' + escHtml(item.author) + "</a></span>"
        );
      } else {
        metaParts.push("<span><strong>Author:</strong> " + escHtml(item.author) + "</span>");
      }
    }
    if (item.version) metaParts.push("<span><strong>Version:</strong> " + escHtml(item.version) + "</span>");
    if (item.licenseName) metaParts.push("<span><strong>License:</strong> " + escHtml(item.licenseName) + "</span>");
    if (item.tags.length) metaParts.push("<span><strong>Tags:</strong> " + escHtml(item.tags.join(", ")) + "</span>");
    el.detailMeta.innerHTML = metaParts.join("");

    if (item.agentDescription) {
      el.agentDescDetails.hidden = false;
      el.agentDescText.textContent = item.agentDescription;
    } else {
      el.agentDescDetails.hidden = true;
    }

    el.tabGuide.disabled = !hasGuide;
    el.tabGuide.setAttribute("aria-selected", String(state.view === "guide"));
    el.tabSkill.setAttribute("aria-selected", String(state.view === "skill"));
    el.panelContent.setAttribute("aria-labelledby", state.view === "guide" ? "tab-guide" : "tab-skill");

    const showLangControls = state.view === "guide" && hasGuide;
    el.guideLangControls.hidden = !showLangControls;
    el.btnLangEn.setAttribute("aria-pressed", String(state.lang === "en"));
    el.btnLangVi.setAttribute("aria-pressed", String(state.lang === "vi"));
    el.btnLangVi.disabled = !item.guideVi;
    el.btnLangEn.disabled = !item.guideEn;
    el.btnLangToggle.textContent =
      state.lang === "en" ? "⇄ Switch to Tiếng Việt" : "⇄ Switch to English";
    el.btnLangToggle.disabled = !(item.guideEn && item.guideVi);

    el.btnRawToggle.setAttribute("aria-pressed", String(state.raw));

    let md = "";
    let docLang = "en";
    if (state.view === "guide" && hasGuide) {
      if (state.lang === "vi" && item.guideVi) {
        md = item.guideVi;
        docLang = "vi";
      } else {
        md = item.guideEn || item.guideVi || "";
        docLang = item.guideEn ? "en" : "vi";
      }
    } else {
      md = item.skillMd || "No SKILL.md body content found.";
      docLang = "en";
    }

    el.docArticle.setAttribute("lang", docLang);
    if (state.raw) {
      el.docArticle.innerHTML = '<pre class="raw-pre"><code>' + escHtml(md) + "</code></pre>";
    } else {
      el.docArticle.innerHTML = renderMarkdown(md);
    }

    document.title = item.name + " · CAT Agent Skills & Guides";
    writeHash();
  }

  el.catalogList.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-slug]");
    if (!btn) return;
    state.slug = btn.dataset.slug;
    const item = bySlug.get(state.slug);
    if (item && (item.guideEn || item.guideVi) && state.scope === "guides") {
      state.view = "guide";
    }
    renderCatalog();
    renderDetail();
    if (window.innerWidth <= 920) {
      el.sidebar.dataset.open = "false";
      el.mobileDrawerBtn.setAttribute("aria-expanded", "false");
    }
  });

  el.search.addEventListener("input", () => {
    state.search = el.search.value;
    renderCatalog();
  });

  el.scopeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.scope = btn.dataset.scope;
      el.scopeBtns.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      if (state.scope === "guides") state.view = "guide";
      if (state.scope === "skills-only") state.view = "skill";
      renderCatalog();
      const filtered = getFilteredItems();
      if (filtered.length > 0 && !filtered.some((x) => x.slug === state.slug)) {
        state.slug = filtered[0].slug;
        renderCatalog();
      }
      renderDetail();
    });
  });

  el.platformFilter.addEventListener("change", () => {
    state.platform = el.platformFilter.value;
    renderCatalog();
  });

  el.typeFilter.addEventListener("change", () => {
    state.type = el.typeFilter.value;
    renderCatalog();
  });

  el.resetFilters.addEventListener("click", () => {
    state.search = "";
    state.scope = "all";
    state.platform = "";
    state.type = "";
    el.search.value = "";
    el.platformFilter.value = "";
    el.typeFilter.value = "";
    el.scopeBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.scope === "all")));
    renderCatalog();
  });

  el.tabGuide.addEventListener("click", () => {
    if (el.tabGuide.disabled) return;
    state.view = "guide";
    renderDetail();
  });

  el.tabSkill.addEventListener("click", () => {
    state.view = "skill";
    renderDetail();
  });

  function setGuideLanguage(lang) {
    state.lang = lang;
    try { localStorage.setItem("cat-viewer-lang", lang); } catch (e) {}
    renderDetail();
    el.announcer.textContent = lang === "vi" ? "Switched guide to Vietnamese" : "Switched guide to English";
  }

  el.btnLangEn.addEventListener("click", () => setGuideLanguage("en"));
  el.btnLangVi.addEventListener("click", () => setGuideLanguage("vi"));
  el.btnLangToggle.addEventListener("click", () => {
    setGuideLanguage(state.lang === "en" ? "vi" : "en");
  });
  el.globalLangEn.addEventListener("click", () => setGuideLanguage("en"));
  el.globalLangVi.addEventListener("click", () => setGuideLanguage("vi"));

  el.btnRawToggle.addEventListener("click", () => {
    state.raw = !state.raw;
    renderDetail();
  });

  el.docArticle.addEventListener("click", async (e) => {
    const copyBtn = e.target.closest(".copy-code-btn");
    if (copyBtn) {
      const code = copyBtn.closest(".code-figure")?.querySelector("code")?.textContent || "";
      try {
        await navigator.clipboard.writeText(code);
        copyBtn.textContent = "Copied";
        setTimeout(() => { copyBtn.textContent = "Copy"; }, 1500);
      } catch {
        copyBtn.textContent = "Failed";
      }
      return;
    }
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
      e.preventDefault();
      const id = decodeURIComponent(anchor.getAttribute("href").slice(1));
      const target = el.docArticle.querySelector('[id="' + CSS.escape(id) + '"]');
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  const themeMeta = document.querySelector('meta[name="color-scheme"]');
  const mqDark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function updateThemeButtonLabel() {
    const current = themeMeta.content === "dark" || (themeMeta.content === "light dark" && mqDark && mqDark.matches) ? "dark" : "light";
    el.themeLabel.textContent = current === "dark" ? "Light mode" : "Dark mode";
  }
  el.themeToggle.addEventListener("click", () => {
    const sysDark = mqDark ? mqDark.matches : false;
    const sysScheme = sysDark ? "dark" : "light";
    const current = (themeMeta.content === "dark" || themeMeta.content === "light") ? themeMeta.content : sysScheme;
    const next = current === "dark" ? "light" : "dark";
    if (next === sysScheme) {
      themeMeta.content = "light dark";
      try { localStorage.removeItem("cat-viewer-theme"); } catch (e) {}
    } else {
      themeMeta.content = next;
      try { localStorage.setItem("cat-viewer-theme", next); } catch (e) {}
    }
    updateThemeButtonLabel();
  });
  if (mqDark && mqDark.addEventListener) {
    mqDark.addEventListener("change", updateThemeButtonLabel);
  }
  updateThemeButtonLabel();

  el.mobileDrawerBtn.addEventListener("click", () => {
    const open = el.sidebar.dataset.open === "true";
    el.sidebar.dataset.open = String(!open);
    el.mobileDrawerBtn.setAttribute("aria-expanded", String(!open));
  });

  window.addEventListener("hashchange", () => {
    applyHash();
    renderCatalog();
    renderDetail();
  });

  renderCatalog();
  renderDetail();
})();
