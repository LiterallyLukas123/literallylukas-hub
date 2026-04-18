/* global React */
const { useState, useEffect, useRef, useMemo } = React;

// ============= Icons =============
const Icon = {
  desktop: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>),
  terminal: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 7l4 4-4 4M11 15h6"/><rect x="2" y="3" width="20" height="18" rx="2"/></svg>),
  lock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>),
  search: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>),
  arrow: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  home: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10l8-6 8 6v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z"/></svg>),
  grid: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>),
  book: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h10a4 4 0 014 4v12H8a4 4 0 01-4-4V4zM4 16a4 4 0 014-4h10"/></svg>),
  mail: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>),
  github: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.51 2.87 8.33 6.84 9.68.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1.01.07 1.54 1.06 1.54 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.13-4.55-5.03 0-1.11.39-2.02 1.02-2.73-.1-.26-.44-1.3.1-2.71 0 0 .84-.27 2.75 1.04A9.33 9.33 0 0112 6.84c.85 0 1.71.12 2.51.34 1.91-1.31 2.75-1.04 2.75-1.04.54 1.41.2 2.45.1 2.71.64.71 1.02 1.62 1.02 2.73 0 3.91-2.34 4.77-4.57 5.02.36.31.68.93.68 1.88v2.79c0 .27.18.59.69.49A10.03 10.03 0 0022 12.22C22 6.58 17.52 2 12 2z"/></svg>),
  globe: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></svg>),
  sparkles: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></svg>),
  sun: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>),
  moon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z"/></svg>),
};

// ============= Data =============
const PROJECTS = [
  {
    id: "desktop",
    name: "Remote Desktop",
    url: "desktop.literallylukas.dev",
    href: "https://desktop.literallylukas.dev",
    status: "offline",
    tag: "infra",
    accent: true,
  },
  {
    id: "soon-1",
    name: "not yet",
    url: "tbd.literallylukas.dev",
    status: "soon",
    tag: "experiment",
  },
  {
    id: "soon-2",
    name: "not yet",
    url: "open.literallylukas.dev",
    status: "soon",
    tag: "shared",
  },
];

const SPARK = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

// ============= Top Bar =============
function TopBar({ onOpenCmdK, theme, setTheme }) {
  return (
    <div className="topbar">
      <span className="spacer" />
      <button className="cmdk-btn" onClick={onOpenCmdK}>
        {Icon.search}
        <span>Search</span>
        <span className="kbd">⌘K</span>
      </button>
      <button
        className="iconbtn"
        title="Toggle theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? Icon.sun : Icon.moon}
      </button>
    </div>
  );
}

// ============= Sidebar =============
function Sidebar({ desktopOnline, active, setActive }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

  const items = [
    { id: "overview", label: "Overview", icon: Icon.home },
    { id: "projects", label: "Projects", icon: Icon.grid },
    { id: "guestbook", label: "Guestbook", icon: Icon.book },
  ];
  const direct = [
    { id: "desktop", label: "Remote Desktop", icon: Icon.desktop, dot: "off", href: "https://desktop.literallylukas.dev" },
    { id: "admin", label: "Admin", icon: Icon.lock },
  ];

  return (
    <aside className="sidebar glass">
      <nav className="nav">
        <div className="nav-label">Hub</div>
        {items.map(it => (
          <a
            key={it.id}
            className={"nav-item" + (active === it.id ? " active" : "")}
            onClick={() => setActive(it.id)}
          >
            {it.icon}<span>{it.label}</span>
            {it.dot && <span className={"dot " + it.dot} />}
          </a>
        ))}
        <div className="nav-label" style={{ marginTop: 14 }}>Direct</div>
        {direct.map(it => (
          <a
            key={it.id}
            className="nav-item"
            href={it.href}
            target={it.href ? "_blank" : undefined}
            rel="noreferrer"
          >
            {it.icon}<span>{it.label}</span>
            {it.dot && <span className={"dot " + it.dot} />}
          </a>
        ))}
      </nav>

      <div className="sidebar-spacer" />

      <div className="status-card">
        <div className="row"><span>time</span><b>{time}</b></div>
        <div className="row"><span>status</span><b style={{ color: "var(--fg-dim)" }}>● offline</b></div>
      </div>
    </aside>
  );
}

// ============= Hero =============
function Hero({ desktopOnline }) {
  return (
    <div className="hero glass fade-in">
      <div className="hero-body">
        <span className="eyebrow eyebrow-off">
          <span className="livedot off" />
          offline
        </span>
        <h2>Remote Desktop</h2>
        <div className="hero-actions">
          <a className="btn btn-primary" href="https://desktop.literallylukas.dev" target="_blank" rel="noreferrer">
            Open {Icon.arrow}
          </a>
          <button
            className="btn"
            onClick={() => navigator.clipboard?.writeText("https://desktop.literallylukas.dev")}
          >
            Copy URL
          </button>
        </div>
      </div>
      <div className="hero-viz">
        <div className="mini-window">
          <div className="titlebar">
            <i/><i/><i/>
            <span className="url">desktop.literallylukas.dev</span>
          </div>
          <div className="content content-empty">
            <div className="start-box">start</div>
          </div>
        </div>
      </div>

      <div className="hero-metrics">
        <div className="m">
          <div className="k">status</div>
          <div className="v" style={{ color: "var(--fg-dim)" }}>●<small style={{ color: "var(--fg)" }}>&nbsp;offline</small></div>
        </div>
        <div className="m">
          <div className="k">uptime</div>
          <div className="v">..</div>
        </div>
        <div className="m">
          <div className="k">deploy</div>
          <div className="v">..</div>
        </div>
        <div className="m">
          <div className="k">session</div>
          <div className="v">..</div>
        </div>
      </div>
    </div>
  );
}

// ============= Projects =============
function ProjectsSection() {
  const [filter, setFilter] = useState("all");
  const list = PROJECTS.filter(p =>
    filter === "all" ? true :
    filter === "live" ? p.status === "online" :
    p.status === "soon"
  );
  return (
    <div>
      <div className="section-head">
        <h3>Projects</h3>
        <span className="count">{PROJECTS.length}</span>
        <span className="spacer" />
        <div className="filter">
          <button className={filter === "all" ? "on" : ""} onClick={() => setFilter("all")}>all</button>
          <button className={filter === "live" ? "on" : ""} onClick={() => setFilter("live")}>live</button>
          <button className={filter === "soon" ? "on" : ""} onClick={() => setFilter("soon")}>soon</button>
        </div>
      </div>
      <div className="grid">
        {list.map(p => <ProjectCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}

function ProjectCard({ p }) {
  const isSoon = p.status === "soon";
  const cls = [
    "card",
    isSoon ? "coming" : "glass",
    p.accent ? "accent" : "",
  ].join(" ");
  const pillClass = isSoon ? "soon" : p.status === "offline" ? "off" : "";
  const body = (
    <>
      <div className="card-head">
        <div>
          <div className="name">{p.name}</div>
          <div className="url">{p.url}</div>
        </div>
        <div className={"statuspill " + pillClass}>
          {p.status}
        </div>
      </div>
      <div className="card-foot">
        <span>{p.tag}</span>
        {!isSoon && <span className="go">open {Icon.arrow}</span>}
      </div>
    </>
  );
  if (isSoon) return <div className={cls}>{body}</div>;
  return (
    <a className={cls} href={p.href} target="_blank" rel="noreferrer">
      {body}
    </a>
  );
}

// ============= Guestbook =============
// Backend-connected: reads/writes via /api/guests (Pages Function + D1).
// Rate limiting (one post per IP) is enforced server-side by ip_hash.
// localStorage is used ONLY as a UI hint so a user who just posted doesn't
// see the input box bounce back after an optimistic refresh — it's cosmetic.

const API = "/api/guests";

function timeAgo(ms) {
  const diff = Date.now() - ms;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return Math.floor(diff / 60_000) + "m";
  if (diff < 86_400_000) return Math.floor(diff / 3_600_000) + "h";
  return Math.floor(diff / 86_400_000) + "d";
}

function Guestbook() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posting, setPosting] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Local hint — set when this browser successfully posts. Server is still
  // the real gate; this just avoids a flash of "you already posted" UX.
  const [localPosted, setLocalPosted] = useState(() => !!localStorage.getItem("hub.posted"));
  const [localReplied, setLocalReplied] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("hub.replied") || "[]")); }
    catch { return new Set(); }
  });

  // Load guests on mount
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(API);
        if (!r.ok) throw new Error("fetch failed");
        const j = await r.json();
        setGuests(j.guests || []);
      } catch {
        setError("couldn't load notes");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const submit = async () => {
    if (posting || localPosted) return;
    const n = name.trim() || "anon";
    const m = msg.trim();
    if (!m) return;

    setPosting(true);
    try {
      const r = await fetch(API, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ who: n, msg: m }),
      });
      const j = await r.json();
      if (!r.ok) {
        if (r.status === 429) {
          localStorage.setItem("hub.posted", "1");
          setLocalPosted(true);
        }
        setError(j.error || "post failed");
        return;
      }
      setGuests(gs => [...gs, j.guest]);
      localStorage.setItem("hub.posted", "1");
      setLocalPosted(true);
      setName(""); setMsg(""); setError(null);
    } catch {
      setError("network error");
    } finally {
      setPosting(false);
    }
  };

  const submitReply = async (parentId) => {
    if (posting || localReplied.has(parentId)) return;
    const t = replyText.trim();
    if (!t) return;

    setPosting(true);
    try {
      const r = await fetch(`${API}/${parentId}/reply`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ who: name.trim() || "anon", msg: t }),
      });
      const j = await r.json();
      if (!r.ok) {
        if (r.status === 429) {
          const next = new Set(localReplied); next.add(parentId);
          localStorage.setItem("hub.replied", JSON.stringify([...next]));
          setLocalReplied(next);
        }
        setError(j.error || "reply failed");
        return;
      }
      setGuests(gs => [...gs, j.guest]);
      const next = new Set(localReplied); next.add(parentId);
      localStorage.setItem("hub.replied", JSON.stringify([...next]));
      setLocalReplied(next);
      setReplyText(""); setReplyTo(null); setError(null);
    } catch {
      setError("network error");
    } finally {
      setPosting(false);
    }
  };

  const hasPosted   = localPosted;
  const hasReplied  = (pid) => localReplied.has(pid);
  const roots       = guests.filter(g => !g.parent_id);
  const repliesOf   = (pid) => guests.filter(g => g.parent_id === pid);

  return (
    <div className="guestbook glass">
      <div className="section-head" style={{ padding: 0 }}>
        <h3>guestbook</h3>
        <span className="count">{roots.length}</span>
        <span className="spacer" />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.04em" }}>
          one per visitor
        </span>
      </div>
      <div className="guest-list">
        {loading && (
          <div className="guest-empty">loading…</div>
        )}
        {!loading && error && roots.length === 0 && (
          <div className="guest-empty">{error}</div>
        )}
        {!loading && !error && roots.length === 0 && (
          <div className="guest-empty">
            nobody yet. feel free to be the first.
          </div>
        )}
        {roots.map((g) => (
          <div className="guest-thread" key={g.id}>
            <div className="guest">
              <div className="avatar" style={{ background: avatarColor(g.who) }}>{g.who.slice(0, 1).toUpperCase()}</div>
              <div>
                <div className="who">{g.who}</div>
                <div className="msg">{g.msg}</div>
                <div className="guest-actions">
                  <button
                    className="guest-reply-btn"
                    onClick={() => { setReplyTo(replyTo === g.id ? null : g.id); setReplyText(""); }}
                    disabled={hasReplied(g.id)}
                  >
                    {hasReplied(g.id) ? "replied" : "reply"}
                  </button>
                </div>
              </div>
              <div className="when">{timeAgo(g.created_at)}</div>
            </div>

            {repliesOf(g.id).map(r => (
              <div className="guest guest-sub" key={r.id}>
                <div className="avatar small" style={{ background: avatarColor(r.who) }}>{r.who.slice(0, 1).toUpperCase()}</div>
                <div>
                  <div className="who">{r.who} <span className="re">re</span></div>
                  <div className="msg">{r.msg}</div>
                </div>
                <div className="when">{timeAgo(r.created_at)}</div>
              </div>
            ))}

            {replyTo === g.id && !hasReplied(g.id) && (
              <div className="reply-input">
                <input
                  placeholder={"reply to " + g.who}
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && submitReply(g.id)}
                  maxLength={140}
                  autoFocus
                />
                <button className="btn btn-primary" onClick={() => submitReply(g.id)} style={{ padding: "5px 10px" }} disabled={posting}>send</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {hasPosted ? (
        <div className="guest-limit">
          you already left a note. thanks for that.
        </div>
      ) : (
        <div className="guest-input">
          <input
            placeholder="name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: 80 }}
            maxLength={16}
          />
          <input
            placeholder="say something"
            value={msg}
            onChange={e => setMsg(e.target.value)}
            onKeyDown={e => e.key === "Enter" && submit()}
            maxLength={140}
          />
          <button className="btn btn-primary" onClick={submit} style={{ padding: "6px 12px" }} disabled={posting || loading}>post</button>
        </div>
      )}
      {error && roots.length > 0 && (
        <div style={{ marginTop: 8, fontSize: 11, color: "var(--fg-faint)" }}>{error}</div>
      )}
    </div>
  );
}

function avatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return `oklch(0.55 0.08 ${h})`;
}

// ============= Visitors + Contact =============
function VisitorsAndContact() {
  const [count] = useState(() => {
    const base = parseInt(localStorage.getItem("hub.visits") || "0", 10);
    const next = base + 1;
    localStorage.setItem("hub.visits", String(next));
    return next;
  });
  return (
    <div className="visitors glass">
      <div>
        <div className="visitor-label">Visitors</div>
        <div className="visitor-count">
          <span className="num">{count.toLocaleString()}</span>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
        <div className="visitor-label" style={{ marginBottom: 10 }}>Contact</div>
        <div className="contact-list">
          <a className="contact-row" href="mailto:contact@literallylukas.dev">
            <span className="lbl">mail</span>
            <span className="val">contact@literallylukas.dev</span>
            <span className="arr">{Icon.arrow}</span>
          </a>
          <a className="contact-row" href="https://github.com/literallylukas" target="_blank" rel="noreferrer">
            <span className="lbl" style={{ display: "flex", alignItems: "center", gap: 4 }}>{Icon.github}</span>
            <span className="val">@literallylukas</span>
            <span className="arr">{Icon.arrow}</span>
          </a>
          <a className="contact-row" href="#">
            <span className="lbl" style={{ display: "flex", alignItems: "center", gap: 4 }}>{Icon.globe}</span>
            <span className="val">literallylukas.dev</span>
            <span className="arr">{Icon.arrow}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ============= Stranger note =============
function StrangerNote() {
  return (
    <div className="stranger-note">
      <p>personal hub. the tools here aren't for public use, but feel free to look around.</p>
    </div>
  );
}

// ============= Disclaimer Modal =============
function Disclaimer({ open, onClose }) {
  return (
    <div className={"disclaimer-overlay " + (open ? "open" : "")}>
      <div className="disclaimer glass" onClick={e => e.stopPropagation()}>
        <div className="disclaimer-eyebrow">heads up</div>
        <h3>if you came here by accident</h3>
        <p>you can just click off, nothing here is really meant for you. if you want to leave a comment though, go ahead.</p>
        <div className="disclaimer-actions">
          <button className="btn" onClick={onClose}>close</button>
          <button className="btn btn-primary" onClick={onClose}>got it</button>
        </div>
      </div>
    </div>
  );
}

// ============= Command Palette =============
function CmdK({ open, setOpen }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQ(""); setSel(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const items = useMemo(() => {
    const all = [
      { group: "Projects", label: "Remote Desktop", hint: "desktop.literallylukas.dev", action: () => window.open("https://desktop.literallylukas.dev"), ic: Icon.desktop },
      { group: "Navigate", label: "Overview", action: () => window.scrollTo({ top: 0, behavior: "smooth" }), ic: Icon.home },
      { group: "Navigate", label: "Projects", action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" }), ic: Icon.grid },
      { group: "Navigate", label: "Guestbook", action: () => document.getElementById("guestbook")?.scrollIntoView({ behavior: "smooth", block: "start" }), ic: Icon.book },
      { group: "Actions", label: "Email", action: () => location.href = "mailto:contact@literallylukas.dev", ic: Icon.mail },
      { group: "Actions", label: "Toggle theme", action: () => document.documentElement.setAttribute("data-theme", document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"), ic: Icon.sun },
      { group: "Actions", label: "Copy desktop URL", action: () => navigator.clipboard?.writeText("https://desktop.literallylukas.dev"), ic: Icon.globe },
    ];
    if (!q) return all;
    const qq = q.toLowerCase();
    return all.filter(i => i.label.toLowerCase().includes(qq) || (i.hint || "").toLowerCase().includes(qq));
  }, [q]);

  useEffect(() => {
    const onKey = (e) => {
      if (!open) return;
      if (e.key === "Escape") { setOpen(false); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setSel(s => Math.min(items.length - 1, s + 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSel(s => Math.max(0, s - 1)); }
      else if (e.key === "Enter") { e.preventDefault(); items[sel]?.action(); setOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items, sel, setOpen]);

  const grouped = useMemo(() => {
    const g = {};
    items.forEach((it, i) => { (g[it.group] = g[it.group] || []).push({ ...it, _i: i }); });
    return g;
  }, [items]);

  return (
    <div className={"cmdk-overlay " + (open ? "open" : "")} onClick={() => setOpen(false)}>
      <div className="cmdk glass" onClick={e => e.stopPropagation()}>
        <div className="cmdk-input">
          {Icon.search}
          <input
            ref={inputRef}
            placeholder="Search…"
            value={q}
            onChange={e => { setQ(e.target.value); setSel(0); }}
          />
          <span className="esc">esc</span>
        </div>
        <div className="cmdk-results">
          {Object.entries(grouped).map(([group, its]) => (
            <div key={group}>
              <div className="cmdk-group">{group}</div>
              {its.map(it => (
                <div
                  key={it.label}
                  className={"cmdk-item " + (it._i === sel ? "sel" : "")}
                  onMouseEnter={() => setSel(it._i)}
                  onClick={() => { it.action(); setOpen(false); }}
                >
                  <span className="ic">{it.ic}</span>
                  <span>{it.label}</span>
                  {it.hint && <span className="kbd">{it.hint}</span>}
                </div>
              ))}
            </div>
          ))}
          {items.length === 0 && (
            <div style={{ padding: 20, textAlign: "center", color: "var(--fg-faint)", fontSize: 12 }}>
              no match
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============= Tweaks =============
const ACCENT_PRESETS = [
  { name: "indigo", hue: 262 },
  { name: "slate",  hue: 240 },
  { name: "sea",    hue: 210 },
  { name: "moss",   hue: 150 },
  { name: "sand",   hue: 75  },
  { name: "clay",   hue: 30  },
];

function Tweaks({ open, config, setConfig }) {
  const set = (k, v) => setConfig(c => ({ ...c, [k]: v }));
  return (
    <div className={"tweaks glass " + (open ? "open" : "")}>
      <h5>Tweaks</h5>

      <div className="tweak">
        <label>accent<b>{ACCENT_PRESETS.find(a => a.hue === config.accentHue)?.name || "custom"}</b></label>
        <div className="swatches">
          {ACCENT_PRESETS.map(a => (
            <div
              key={a.name}
              className={"swatch " + (config.accentHue === a.hue ? "sel" : "")}
              style={{ background: `oklch(0.6 0.14 ${a.hue})` }}
              onClick={() => set("accentHue", a.hue)}
              title={a.name}
            />
          ))}
        </div>
      </div>

      <div className="tweak">
        <label>theme<b>{config.theme}</b></label>
        <div className="seg">
          <button className={config.theme === "light" ? "on" : ""} onClick={() => set("theme", "light")}>light</button>
          <button className={config.theme === "dark" ? "on" : ""} onClick={() => set("theme", "dark")}>dark</button>
        </div>
      </div>

      <div className="tweak">
        <label>layout<b>{config.layout}</b></label>
        <div className="seg">
          <button className={config.layout === "sidebar" ? "on" : ""} onClick={() => set("layout", "sidebar")}>sidebar</button>
          <button className={config.layout === "stacked" ? "on" : ""} onClick={() => set("layout", "stacked")}>stacked</button>
        </div>
      </div>

      <div className="tweak">
        <label>density<b>{config.density.toFixed(2)}</b></label>
        <input
          type="range" min="0.8" max="1.2" step="0.05"
          value={config.density}
          onChange={e => set("density", parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}

// ============= App =============
const DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 262,
  "theme": "light",
  "layout": "sidebar",
  "density": 1
}/*EDITMODE-END*/;

function App() {
  const [config, setConfig] = useState(() => {
    try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem("hub.config") || "{}") }; }
    catch { return DEFAULTS; }
  });
  const [cmdk, setCmdk] = useState(false);
  const [tweaks, setTweaks] = useState(false);
  const [active, setActive] = useState("overview");
  const [disclaimer, setDisclaimer] = useState(() => !localStorage.getItem("hub.seen"));
  const desktopOnline = false;

  const dismissDisclaimer = () => {
    localStorage.setItem("hub.seen", "1");
    setDisclaimer(false);
  };

  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-theme", config.theme);
    r.style.setProperty("--accent-hue", config.accentHue);
    r.style.setProperty("--density", config.density);
    localStorage.setItem("hub.config", JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setCmdk(c => !c);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setTweaks(true);
      if (d.type === "__deactivate_edit_mode") setTweaks(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: config }, "*");
  }, [config]);

  return (
    <>
      <div className="ambient" />
      <div className="app" data-layout={config.layout}>
        {config.layout === "sidebar" && <Sidebar desktopOnline={desktopOnline} active={active} setActive={setActive} />}
        <main className="panel">
          <TopBar
            onOpenCmdK={() => setCmdk(true)}
            theme={config.theme}
            setTheme={(t) => setConfig(c => ({ ...c, theme: t }))}
          />
          <Hero desktopOnline={desktopOnline} />
          <div id="projects"><ProjectsSection /></div>
          <div className="two-col">
            <div id="guestbook"><Guestbook /></div>
            <VisitorsAndContact />
          </div>
          <StrangerNote />
          <div style={{ height: 12 }} />
        </main>
      </div>
      <CmdK open={cmdk} setOpen={setCmdk} />
      <Tweaks open={tweaks} config={config} setConfig={setConfig} />
      <Disclaimer open={disclaimer} onClose={dismissDisclaimer} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
