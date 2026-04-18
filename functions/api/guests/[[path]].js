const MAX_MSG  = 140;
const MAX_NAME = 16;
const MAX_ROWS = 200;

const WORDLIST = [
  "nigger", "nigga", "faggot", "fag",
  "retard", "tranny", "kike",
  "porn", "onlyfans",
  "viagra", "cialis",
];

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function hashIp(ip, salt) {
  const data = new TextEncoder().encode(salt + "|" + ip);
  const buf  = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("").slice(0, 24);
}

function getIp(request) {
  return request.headers.get("cf-connecting-ip") || "unknown";
}

function getCountry(request) {
  const c = request.headers.get("cf-ipcountry");
  if (!c || c === "XX" || c === "T1") return null;
  return c.toUpperCase().slice(0, 2);
}

function clean(str, max) {
  return String(str ?? "").trim().slice(0, max);
}

function id(prefix) {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function containsBlocked(text) {
  const t = text.toLowerCase();
  return WORDLIST.some(w => t.includes(w));
}

async function isBanned(db, ipHash) {
  const row = await db.prepare("SELECT ip_hash FROM bans WHERE ip_hash = ?").bind(ipHash).first();
  return !!row;
}

async function listGuests(db) {
  const { results } = await db
    .prepare("SELECT id, who, msg, parent_id, country, created_at FROM guests ORDER BY created_at ASC LIMIT ?")
    .bind(MAX_ROWS)
    .all();
  return json({ guests: results });
}

async function createGuest(request, env, ipHash) {
  if (await isBanned(env.DB, ipHash)) return json({ error: "banned" }, 403);

  const body = await request.json().catch(() => ({}));
  const who  = clean(body.who, MAX_NAME) || "anon";
  const msg  = clean(body.msg, MAX_MSG);
  if (!msg) return json({ error: "empty message" }, 400);
  if (containsBlocked(who) || containsBlocked(msg)) return json({ error: "rejected" }, 400);

  const existing = await env.DB
    .prepare("SELECT id FROM guests WHERE ip_hash = ? AND parent_id IS NULL LIMIT 1")
    .bind(ipHash)
    .first();
  if (existing) return json({ error: "already posted" }, 429);

  const country = getCountry(request);
  const entry = { id: id("c"), who, msg, parent_id: null, country, created_at: Date.now() };
  await env.DB
    .prepare("INSERT INTO guests (id, who, msg, parent_id, ip_hash, country, created_at) VALUES (?, ?, ?, NULL, ?, ?, ?)")
    .bind(entry.id, entry.who, entry.msg, ipHash, country, entry.created_at)
    .run();

  return json({ guest: entry });
}

async function createReply(request, env, ipHash, parentId) {
  if (await isBanned(env.DB, ipHash)) return json({ error: "banned" }, 403);

  const body = await request.json().catch(() => ({}));
  const who  = clean(body.who, MAX_NAME) || "anon";
  const msg  = clean(body.msg, MAX_MSG);
  if (!msg) return json({ error: "empty message" }, 400);
  if (containsBlocked(who) || containsBlocked(msg)) return json({ error: "rejected" }, 400);

  const parent = await env.DB
    .prepare("SELECT id FROM guests WHERE id = ? AND parent_id IS NULL")
    .bind(parentId)
    .first();
  if (!parent) return json({ error: "parent not found" }, 404);

  const existing = await env.DB
    .prepare("SELECT id FROM guests WHERE ip_hash = ? AND parent_id = ? LIMIT 1")
    .bind(ipHash, parentId)
    .first();
  if (existing) return json({ error: "already replied" }, 429);

  const country = getCountry(request);
  const entry = { id: id("r"), who, msg, parent_id: parentId, country, created_at: Date.now() };
  await env.DB
    .prepare("INSERT INTO guests (id, who, msg, parent_id, ip_hash, country, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
    .bind(entry.id, entry.who, entry.msg, entry.parent_id, ipHash, country, entry.created_at)
    .run();

  return json({ guest: entry });
}

export async function onRequest(context) {
  const { request, env, params } = context;
  const path   = (params.path || []).join("/");
  const method = request.method;
  const ipHash = await hashIp(getIp(request), env.IP_SALT || "dev-salt");

  try {
    if (method === "GET" && path === "") return await listGuests(env.DB);
    if (method === "POST" && path === "") return await createGuest(request, env, ipHash);
    if (method === "POST" && path.endsWith("/reply")) {
      const parentId = path.split("/")[0];
      return await createReply(request, env, ipHash, parentId);
    }
    return json({ error: "not found" }, 404);
  } catch (err) {
    return json({ error: "server error", detail: String(err) }, 500);
  }
}
