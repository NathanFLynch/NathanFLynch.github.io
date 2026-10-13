/* Builds the pages from js/projects.js. You should not need to edit this file. */
(function () {
  "use strict";

  const app = document.getElementById("app");
  const page = document.body.dataset.page;

  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const isUrl = (f) => /^(https?:)?\/\//.test(f);
  const norm = (it) => (typeof it === "string" ? { file: it, caption: "" } : it);
  const src = (p, f) => (isUrl(f) ? f : "projects/" + encodeURI(p.folder || p.id) + "/" + encodeURI(f));
  const thumbOf = (p) => p.thumbnail || p.hero || (p.renders && norm(p.renders[0]).file);

  /* ---------- shared header / footer ---------- */
  function header() {
    const links = (SITE.links || [])
      .map((l) => l.url
    ? `<a href="${esc(l.url)}">${esc(l.label)}</a>`
    : `<span>${esc(l.label)}</span>`)
  .join("");
    return `<header class="site-head">
      <a class="brand" href="index.html">${esc(SITE.name)}</a>
      <nav class="site-nav" aria-label="Contact">${links}</nav>
    </header>`;
  }

  function footer() {
    return `<footer class="site-foot">
      <span>&copy; ${new Date().getFullYear()} ${esc(SITE.name)}</span>
      <span class="print-only">${esc(location.href.split("#")[0])}</span>
    </footer>`;
  }

  /* ---------- home page ---------- */
  function renderHome() {
    document.title = SITE.name + " | CAD Portfolio";
    const cards = PROJECTS.map((p) => `
      <li>
        <a class="card" href="project.html?p=${encodeURIComponent(p.id)}">
          <div class="thumb"><img src="${esc(src(p, thumbOf(p)))}" alt="${esc(p.title)}" loading="lazy"></div>
          <h2>${esc(p.title)}</h2>
          ${p.summary ? `<p>${esc(p.summary)}</p>` : ""}
        </a>
      </li>`).join("");

    app.innerHTML = `${header()}
      <main class="wrap">
        <section class="intro">
          <h1>${esc(SITE.headline)}</h1>
          <p>${esc(SITE.intro)}</p>
        </section>
        <ul class="grid">${cards}</ul>
      </main>${footer()}`;
  }

  /* ---------- project page ---------- */
  function gallery(p, title, items, cls) {
    if (!items || !items.length) return "";
    const figs = items.map(norm).map((it) => {
      const url = src(p, it.file);
      if (/\.pdf$/i.test(it.file)) {
        return `<figure class="pdf"><a href="${esc(url)}" target="_blank" rel="noopener">
          <strong>${esc(it.caption || it.file)}</strong><span>Open PDF</span></a></figure>`;
      }
      return `<figure>
        <a href="${esc(url)}" data-lightbox data-caption="${esc(it.caption)}">
          <img src="${esc(url)}" alt="${esc(it.caption || p.title)}" loading="lazy"></a>
        ${it.caption ? `<figcaption>${esc(it.caption)}</figcaption>` : ""}
      </figure>`;
    }).join("");
    return `<section class="block"><h2>${esc(title)}</h2><div class="gallery ${cls || ""}">${figs}</div></section>`;
  }

  function embedUrl(u) {
    let m = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
    if (m) return "https://www.youtube.com/embed/" + m[1];
    m = u.match(/vimeo\.com\/(\d+)/);
    if (m) return "https://player.vimeo.com/video/" + m[1];
    return u;
  }

  function videos(p) {
    if (!p.videos || !p.videos.length) return "";
    const figs = p.videos.map(norm).map((it) => {
      let media;
      if (/\.(mp4|webm|mov)$/i.test(it.file)) {
        const flags = it.loop ? "autoplay loop muted" : "";
        const poster = it.poster ? `poster="${esc(src(p, it.poster))}"` : "";
        media = `<video controls playsinline preload="metadata" ${flags} ${poster}><source src="${esc(src(p, it.file))}"></video>`;
      } else {
        media = `<iframe src="${esc(embedUrl(it.file))}" loading="lazy" allowfullscreen title="${esc(it.caption || "Video")}"></iframe>`;
      }
      return `<figure class="media">${media}${it.caption ? `<figcaption>${esc(it.caption)}</figcaption>` : ""}</figure>`;
    }).join("");
    return `<section class="block"><h2>Videos and turntables</h2>
      <div class="gallery">${figs}</div>
      <p class="print-only note">Videos and interactive models are available online at ${esc(location.href)}</p>
    </section>`;
  }

  function renderProject() {
    const id = new URLSearchParams(location.search).get("p");
    const i = PROJECTS.findIndex((x) => x.id === id);
    if (i < 0) {
      document.title = "Project not found";
      app.innerHTML = `${header()}<main class="wrap"><section class="intro">
        <h1>Project not found</h1>
        <p>Check that the link matches an <code>id</code> in js/projects.js, or <a href="index.html">go back to all projects</a>.</p>
        </section></main>${footer()}`;
      return;
    }
    const p = PROJECTS[i];
    document.title = p.title + " | " + SITE.name;

    const facts = Object.entries(p.facts || {})
      .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
    const heroFile = p.hero || thumbOf(p);
    const hero = heroFile ? `<figure class="hero">
        <a href="${esc(src(p, heroFile))}" data-lightbox data-caption="${esc(p.title)}">
          <img src="${esc(src(p, heroFile))}" alt="${esc(p.title)}"></a></figure>` : "";
    const sections = (p.sections || []).map((s) =>
      `<div class="write"><h3>${esc(s.heading)}</h3><p>${esc(s.text)}</p></div>`).join("");

    const prev = PROJECTS[i - 1], next = PROJECTS[i + 1];
    const pager = `<nav class="pager" aria-label="More projects">
      ${prev ? `<a href="project.html?p=${encodeURIComponent(prev.id)}">Previous: ${esc(prev.title)}</a>` : "<span></span>"}
      ${next ? `<a href="project.html?p=${encodeURIComponent(next.id)}">Next: ${esc(next.title)}</a>` : "<span></span>"}
    </nav>`;

    app.innerHTML = `${header()}
      <main class="wrap project">
        <a class="back no-print" href="index.html">All projects</a>
        <div class="title-row">
          <div>
            <h1>${esc(p.title)}</h1>
            ${p.summary ? `<p class="lede">${esc(p.summary)}</p>` : ""}
          </div>
          <button class="print-btn no-print" onclick="window.print()">Print this page</button>
        </div>
        ${facts ? `<dl class="facts">${facts}</dl>` : ""}
        ${hero}
        ${sections ? `<section class="writeup">${sections}</section>` : ""}
        ${gallery(p, "Renders", p.renders)}
        ${gallery(p, "Drawings", p.drawings, "one-col")}
        ${videos(p)}
        ${gallery(p, "Photos", p.photos)}
        ${pager}
      </main>${footer()}`;

    setupLightbox();
  }

  /* ---------- lightbox: click an image to enlarge ---------- */
  function setupLightbox() {
    const links = Array.from(document.querySelectorAll("a[data-lightbox]"));
    if (!links.length) return;
    let idx = 0;

    const box = document.createElement("div");
    box.className = "lightbox";
    box.hidden = true;
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Image viewer");
    box.innerHTML = `
      <button class="lb-close" aria-label="Close">&times;</button>
      <button class="lb-prev" aria-label="Previous image">&lsaquo;</button>
      <figure><img alt=""><figcaption></figcaption></figure>
      <button class="lb-next" aria-label="Next image">&rsaquo;</button>`;
    document.body.appendChild(box);

    const img = box.querySelector("img");
    const cap = box.querySelector("figcaption");

    function show(n) {
      idx = (n + links.length) % links.length;
      img.src = links[idx].href;
      cap.textContent = links[idx].dataset.caption || "";
    }
    const open = (n) => { show(n); box.hidden = false; document.body.classList.add("lb-open"); };
    const close = () => { box.hidden = true; document.body.classList.remove("lb-open"); };

    links.forEach((a, n) => a.addEventListener("click", (e) => { e.preventDefault(); open(n); }));
    box.querySelector(".lb-close").onclick = close;
    box.querySelector(".lb-prev").onclick = () => show(idx - 1);
    box.querySelector(".lb-next").onclick = () => show(idx + 1);
    box.addEventListener("click", (e) => { if (e.target === box) close(); });
    document.addEventListener("keydown", (e) => {
      if (box.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  page === "project" ? renderProject() : renderHome();
})();
