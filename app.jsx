/* global React */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

const SITE = {
  name:     "literallylukas.dev",
  owner:    "Lukas",
  email:    "contact@literallylukas.dev",
  github:   "LiterallyLukas123",
  githubUrl: "https://github.com/LiterallyLukas123",
};

const PROJECTS = [
  {
    id: "desktop",
    name: "Remote Desktop",
    url: "desktop.literallylukas.dev",
    href: "https://desktop.literallylukas.dev",
    tag: "infra",
    accent: true,
  },
  {
    id: "hub",
    name: "This Hub",
    url: "github.com/LiterallyLukas123/literallylukas-hub",
    href: "https://github.com/LiterallyLukas123/literallylukas-hub",
    tag: "web",
  },
];

const API = "/api/guests";

const Icon = {
  desktop: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>),
  search: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>),
  arrow: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  home: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10l8-6 8 6v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z"/></svg>),
  grid: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>),
  book: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h10a4 4 0 014 4v12H8a4 4 0 01-4-4V4zM4 16a4 4 0 014-4h10"/></svg>),
  mail: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>),
  github: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.51 2.87 8.33 6.84 9.68.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1.01.07 1.54 1.06 1.54 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.13-4.55-5.03 0-1.11.39-2.02 1.02-2.73-.1-.26-.44-1.3.1-2.71 0 0 .84-.27 2.75 1.04A9.33 9.33 0 0112 6.84c.85 0 1.71.12 2.51.34 1.91-1.31 2.75-1.04 2.75-1.04.54 1.41.2 2.45.1 2.71.64.71 1.02 1.62 1.02 2.73 0 3.91-2.34 4.77-4.57 5.02.36.31.68.93.68 1.88v2.79c0 .27.18.59.69.49A10.03 10.03 0 0022 12.22C22 6.58 17.52 2 12 2z"/></svg>),
  globe: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></svg>),
  sun: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>),
  moon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z"/></svg>),
  dice: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="16" cy="16" r="1" fill="currentColor"/><circle cx="16" cy="8" r="1" fill="currentColor"/><circle cx="8" cy="16" r="1" fill="currentColor"/></svg>),
  link: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14a5 5 0 007.07 0l3-3a5 5 0 00-7.07-7.07l-1 1M14 10a5 5 0 00-7.07 0l-3 3a5 5 0 007.07 7.07l1-1"/></svg>),
  trash: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"/></svg>),
  shield: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/></svg>),
};

function countryFlag(cc) {
  if (!cc || cc.length !== 2) return "";
  const A = 0x1F1E6;
  return String.fromCodePoint(A + cc.charCodeAt(0) - 65, A + cc.charCodeAt(1) - 65);
}

function timeAgo(ms) {
  const diff = Date.now() - ms;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return Math.floor(diff / 60_000) + "m";
  if (diff < 86_400_000) return Math.floor(diff / 3_600_000) + "h";
  return Math.floor(diff / 86_400_000) + "d";
}

function avatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return `oklch(0.55 0.08 ${h})`;
}

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function useTick(ms) {
  const [, setT] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setT(x => x + 1), ms);
    return () => clearInterval(t);
  }, [ms]);
}

function useAdmin() {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/whoami");
        const j = await r.json();
        setAdmin(!!j.admin);
      } catch { setAdmin(false); }
    })();
  }, []);
  return admin;
}

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

function Sidebar({ setActive, setTheme, theme, onOpenCmdK, onRandomGuest, admin }) {
  const now = useClock();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const nav = [
    { id: "overview",  label: "Overview",  icon: Icon.home, onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { id: "projects",  label: "Projects",  icon: Icon.grid, onClick: () => scrollTo("projects") },
    { id: "guestbook", label: "Guestbook", icon: Icon.book, onClick: () => scrollTo("guestbook") },
  ];

  const fun = [
    { label: "Search",     icon: Icon.search, onClick: onOpenCmdK },
    { label: "Random note", icon: Icon.dice,   onClick: onRandomGuest },
    { label: "Copy site URL", icon: Icon.link, onClick: () => navigator.clipboard?.writeText("https://" + SITE.name) },
    { label: theme === "dark" ? "Light mode" : "Dark mode", icon: theme === "dark" ? Icon.sun : Icon.moon, onClick: () => setTheme(theme === "dark" ? "light" : "dark") },
  ];

  return (
    <aside className="sidebar glass">
      <nav className="nav">
        <div className="nav-label">Hub</div>
        {nav.map(it => (
          <a key={it.id} className="nav-item" onClick={it.onClick}>
            {it.icon}<span>{it.label}</span>
          </a>
        ))}
        <div className="nav-label" style={{ marginTop: 14 }}>Actions</div>
        {fun.map(it => (
          <a key={it.label} className="nav-item" onClick={it.onClick}>
            {it.icon}<span>{it.label}</span>
          </a>
        ))}
        {admin && (
          <>
            <div className="nav-label" style={{ marginTop: 14 }}>Admin</div>
            <a className="nav-item" onClick={() => scrollTo("guestbook")}>
              {Icon.shield}<span>Moderate</span>
            </a>
          </>
        )}
      </nav>

      <div className="sidebar-spacer" />

      <div className="status-card">
        <div className="row"><span>time</span><b>{time}</b></div>
      </div>
    </aside>
  );
}

function Hero() {
  return (
    <div className="hero glass fade-in">
      <div className="hero-body">
        <h2>Remote Desktop</h2>
        <div className="hero-actions">
          <a className="btn btn-primary" href="https://desktop.literallylukas.dev" target="_blank" rel="noreferrer">
            Open {Icon.arrow}
          </a>
        </div>
      </div>
      <div className="hero-viz">
        <div className="mini-window">
          <div className="titlebar">
            <i/><i/><i/>
            <span className="url">desktop.literallylukas.dev</span>
          </div>
          <div className="content content-empty" />
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <div>
      <div className="section-head">
        <h3>Projects</h3>
        <span className="count">{PROJECTS.length}</span>
      </div>
      <div className="grid">
        {PROJECTS.map(p => <ProjectCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <a className={"card glass" + (p.accent ? " accent" : "")} href={p.href} target="_blank" rel="noreferrer">
      <div className="card-head">
        <div>
          <div className="name">{p.name}</div>
          <div className="url">{p.url}</div>
        </div>
      </div>
      <div className="card-foot">
        <span>{p.tag}</span>
        <span className="go">open {Icon.arrow}</span>
      </div>
    </a>
  );
}

function Guestbook({ scrollToRandomRef, admin }) {
  const [guests, setGuests]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [posting, setPosting] = useState(false);
  const [name, setName]       = useState("");
  const [msg, setMsg]         = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const [localPosted, setLocalPosted] = useState(() => !!localStorage.getItem("hub.posted"));
  const [localReplied, setLocalReplied] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem("hub.replied") || "[]")); }
    catch { return new Set(); }
  });

  useTick(60_000);

  const load = useCallback(async () => {
    try {
      const r = await fetch(API);
      if (!r.ok) throw new Error("fetch failed");
      const j = await r.json();
      setGuests(j.guests || []);
      setError(null);
    } catch {
      setError("couldn't load notes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const t = setInterval(load, 30_000);
    return () => clearInterval(t);
  }, [load]);

  useEffect(() => {
    scrollToRandomRef.current = () => {
      const roots = guests.filter(g => !g.parent_id);
      if (roots.length === 0) return;
      const pick = roots[Math.floor(Math.random() * roots.length)];
      document.getElementById("guest-" + pick.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
  }, [guests, scrollToRandomRef]);

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

  const adminDelete = async (id) => {
    if (!confirm("Delete this entry?")) return;
    const r = await fetch("/api/admin/guests/" + id, { method: "DELETE" });
    if (r.ok) setGuests(gs => gs.filter(g => g.id !== id && g.parent_id !== id));
  };

  const adminBan = async (id) => {
    if (!confirm("Ban this user and delete their post?")) return;
    const r = await fetch("/api/admin/guests/" + id + "/ban", { method: "POST" });
    if (r.ok) setGuests(gs => gs.filter(g => g.id !== id && g.parent_id !== id));
  };

  const hasPosted  = localPosted;
  const hasReplied = (pid) => localReplied.has(pid);
  const roots      = guests.filter(g => !g.parent_id);
  const repliesOf  = (pid) => guests.filter(g => g.parent_id === pid);

  return (
    <div className="guestbook glass">
      <div className="section-head" style={{ padding: 0 }}>
        <h3>guestbook</h3>
        <span className="count">{roots.length}</span>
        <span className="spacer" />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-faint)", letterSpacing: "0.04em" }}>
          {admin ? "admin mode" : "one per visitor"}
        </span>
      </div>
      <div className="guest-list">
        {loading && <div className="guest-empty">loading…</div>}
        {!loading && error && roots.length === 0 && <div className="guest-empty">{error}</div>}
        {!loading && !error && roots.length === 0 && (
          <div className="guest-empty">nobody yet. feel free to be the first.</div>
        )}
        {roots.map((g) => (
          <div className="guest-thread" key={g.id} id={"guest-" + g.id}>
            <div className="guest">
              <div className="avatar" style={{ background: avatarColor(g.who) }}>{g.who.slice(0, 1).toUpperCase()}</div>
              <div>
                <div className="who">
                  {g.who}
                  {g.country && <span className="country-tag" title={g.country}>{countryFlag(g.country)} {g.country}</span>}
                </div>
                <div className="msg">{g.msg}</div>
                <div className="guest-actions">
                  <button
                    className="guest-reply-btn"
                    onClick={() => { setReplyTo(replyTo === g.id ? null : g.id); setReplyText(""); }}
                    disabled={hasReplied(g.id)}
                  >
                    {hasReplied(g.id) ? "replied" : "reply"}
                  </button>
                  {admin && (
                    <>
                      <button className="guest-admin-btn" onClick={() => adminDelete(g.id)} title="Delete">
                        {Icon.trash}
                      </button>
                      <button className="guest-admin-btn" onClick={() => adminBan(g.id)} title="Ban + delete">
                        {Icon.shield}
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="when">{timeAgo(g.created_at)}</div>
            </div>

            {repliesOf(g.id).map(r => (
              <div className="guest guest-sub" key={r.id}>
                <div className="avatar small" style={{ background: avatarColor(r.who) }}>{r.who.slice(0, 1).toUpperCase()}</div>
                <div>
                  <div className="who">
                    {r.who} <span className="re">re</span>
                    {r.country && <span className="country-tag" title={r.country}>{countryFlag(r.country)} {r.country}</span>}
                  </div>
                  <div className="msg">{r.msg}</div>
                  {admin && (
                    <div className="guest-actions">
                      <button className="guest-admin-btn" onClick={() => adminDelete(r.id)} title="Delete">
                        {Icon.trash}
                      </button>
                      <button className="guest-admin-btn" onClick={() => adminBan(r.id)} title="Ban + delete">
                        {Icon.shield}
                      </button>
                    </div>
                  )}
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
        <div className="guest-limit">you already left a note. thanks for that.</div>
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
          <a className="contact-row" href={"mailto:" + SITE.email}>
            <span className="lbl">mail</span>
            <span className="val">{SITE.email}</span>
            <span className="arr">{Icon.arrow}</span>
          </a>
          <a className="contact-row" href={SITE.githubUrl} target="_blank" rel="noreferrer">
            <span className="lbl" style={{ display: "flex", alignItems: "center", gap: 4 }}>{Icon.github}</span>
            <span className="val">@{SITE.github}</span>
            <span className="arr">{Icon.arrow}</span>
          </a>
          <a className="contact-row" href={"https://" + SITE.name} target="_blank" rel="noreferrer">
            <span className="lbl" style={{ display: "flex", alignItems: "center", gap: 4 }}>{Icon.globe}</span>
            <span className="val">{SITE.name}</span>
            <span className="arr">{Icon.arrow}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function StrangerNote() {
  return (
    <div className="stranger-note">
      <p>personal hub. the tools here aren't for public use, but feel free to look around.</p>
    </div>
  );
}

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

function CmdK({ open, setOpen, onRandomGuest }) {
  const [q, setQ]     = useState("");
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
      { group: "Navigate", label: "Overview",  action: () => window.scrollTo({ top: 0, behavior: "smooth" }), ic: Icon.home },
      { group: "Navigate", label: "Projects",  action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" }), ic: Icon.grid },
      { group: "Navigate", label: "Guestbook", action: () => document.getElementById("guestbook")?.scrollIntoView({ behavior: "smooth", block: "start" }), ic: Icon.book },
      { group: "Actions", label: "Email",          action: () => location.href = "mailto:" + SITE.email, ic: Icon.mail },
      { group: "Actions", label: "Random note",    action: onRandomGuest, ic: Icon.dice },
      { group: "Actions", label: "Toggle theme",   action: () => document.documentElement.setAttribute("data-theme", document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"), ic: Icon.sun },
      { group: "Actions", label: "Copy site URL",  action: () => navigator.clipboard?.writeText("https://" + SITE.name), ic: Icon.link },
    ];
    if (!q) return all;
    const qq = q.toLowerCase();
    return all.filter(i => i.label.toLowerCase().includes(qq) || (i.hint || "").toLowerCase().includes(qq));
  }, [q, onRandomGuest]);

  useEffect(() => {
    const onKey = (e) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowDown") { e.preventDefault(); setSel(s => Math.min(items.length - 1, s + 1)); }
      else if (e.key === "ArrowUp")   { e.preventDefault(); setSel(s => Math.max(0, s - 1)); }
      else if (e.key === "Enter")     { e.preventDefault(); items[sel]?.action(); setOpen(false); }
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
            <div style={{ padding: 20, textAlign: "center", color: "var(--fg-faint)", fontSize: 12 }}>no match</div>
          )}
        </div>
      </div>
    </div>
  );
}

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
          <button className={config.theme === "dark"  ? "on" : ""} onClick={() => set("theme", "dark")}>dark</button>
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

const DEFAULTS = {
  accentHue: 262,
  theme:     "light",
  layout:    "sidebar",
  density:   1,
};

function App() {
  const [config, setConfig] = useState(() => {
    try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem("hub.config") || "{}") }; }
    catch { return DEFAULTS; }
  });
  const [cmdk, setCmdk]   = useState(false);
  const [tweaks, setTweaks] = useState(false);
  const [active, setActive] = useState("overview");
  const [disclaimer, setDisclaimer] = useState(() => !localStorage.getItem("hub.seen"));
  const admin = useAdmin();

  const scrollToRandomRef = useRef(() => {});
  const onRandomGuest = useCallback(() => scrollToRandomRef.current(), []);

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

  return (
    <>
      <div className="ambient" />
      <div className="app" data-layout={config.layout}>
        {config.layout === "sidebar" && (
          <Sidebar
            setActive={setActive}
            setTheme={(t) => setConfig(c => ({ ...c, theme: t }))}
            theme={config.theme}
            onOpenCmdK={() => setCmdk(true)}
            onRandomGuest={onRandomGuest}
            admin={admin}
          />
        )}
        <main className="panel">
          <TopBar
            onOpenCmdK={() => setCmdk(true)}
            theme={config.theme}
            setTheme={(t) => setConfig(c => ({ ...c, theme: t }))}
          />
          <Hero />
          <div id="projects"><ProjectsSection /></div>
          <div className="two-col">
            <div id="guestbook"><Guestbook scrollToRandomRef={scrollToRandomRef} admin={admin} /></div>
            <VisitorsAndContact />
          </div>
          <StrangerNote />
          <div style={{ height: 12 }} />
        </main>
      </div>
      <CmdK open={cmdk} setOpen={setCmdk} onRandomGuest={onRandomGuest} />
      <Tweaks open={tweaks} config={config} setConfig={setConfig} />
      <Disclaimer open={disclaimer} onClose={dismissDisclaimer} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
