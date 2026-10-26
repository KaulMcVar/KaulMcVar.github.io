(function () {
  const LABELS = { plugin: "Plugin", config: "Config", setup: "Server setup", tool: "Tool / mod" };

  // ---- Project cards ----
  const grid = document.getElementById("projects");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const all = window.PROJECTS || [];
  if (!all.length) document.querySelector(".filters").hidden = true;

  function render(filter) {
    const list = all.filter((p) => filter === "all" || p.type === filter);
    if (!list.length) {
      grid.innerHTML = `<div class="empty"><span class="empty-block" aria-hidden="true"></span>
        <h3>${all.length ? "Nothing here yet" : "I haven't added any projects yet"}</h3>
        <p>Projects are coming soon. Check back later!</p></div>`;
      return;
    }
    grid.innerHTML = list.map((p) => `
      <article class="card type-${esc(p.type)}">
        <span class="badge">${esc(LABELS[p.type] || p.type)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.desc)}</p>
        <ul class="tags">${(p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        ${p.link ? `<a class="card-link" href="${esc(p.link)}" target="_blank" rel="noopener">View &rarr;</a>` : ""}
      </article>`).join("");
  }

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      render(chip.dataset.filter);
    });
  });
  render("all");

  // ---- Console animation ----
  const lines = [
    ["info", "Starting minecraft server version 1.21.11"],
    ["info", "Loading properties"],
    ["info", "[LuckPerms] Enabling LuckPerms"],
    ["info", "[PlaceholderAPI] Registered 14 expansions"],
    ["info", "[TAB] Enabled in 41ms"],
    ["warn", "[Grim] 0 false flags in the last hour"],
    ["info", "Preparing spawn area: 100%"],
    ["ok", "Done (1.337s)! For help, type \"help\""],
    ["cmd", "> say Hire KaulMc for your next server :)"]
  ];
  const out = document.getElementById("console");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = ([lvl, msg]) => {
    if (lvl === "cmd") return `<span class="c-cmd">${esc(msg)}</span>`;
    const tag = lvl === "warn" ? "WARN" : "INFO";
    return `<span class="c-time">[12:00:0${Math.floor(Math.random() * 9)}]</span> <span class="c-${lvl}">[Server thread/${tag}]</span>: ${esc(msg)}`;
  };
  if (reduce) {
    out.innerHTML = lines.map(fmt).join("\n");
  } else {
    let i = 0;
    const tick = () => {
      if (i < lines.length) {
        out.innerHTML += (i ? "\n" : "") + fmt(lines[i++]);
        setTimeout(tick, 280 + Math.random() * 320);
      } else {
        out.innerHTML += '<span class="cursor">_</span>';
      }
    };
    setTimeout(tick, 400);
  }

  // ---- Stat counters ----
  const counters = document.querySelectorAll("[data-count]");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, end = +el.dataset.count;
      let n = 0;
      const step = () => { el.textContent = (++n >= end ? end : n) + (n >= end ? "+" : ""); if (n < end) setTimeout(step, 60); };
      reduce ? (el.textContent = end + "+") : step();
      io.unobserve(el);
    });
  });
  counters.forEach((c) => io.observe(c));

  // ---- Mobile nav ----
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));

  // ---- Copy Discord ----
  document.querySelectorAll(".copy").forEach((b) => b.addEventListener("click", async () => {
    const msg = document.getElementById("copied");
    try { await navigator.clipboard.writeText(b.dataset.copy); msg.textContent = "Copied to clipboard!"; }
    catch { msg.textContent = "Discord: " + b.dataset.copy; }
    setTimeout(() => (msg.textContent = ""), 2500);
  }));

  document.getElementById("year").textContent = new Date().getFullYear();
})();
