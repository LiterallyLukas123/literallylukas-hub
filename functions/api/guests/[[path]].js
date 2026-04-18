// Pages Function — handles /api/guests and /api/guests/:id/reply
// Deployed automatically when this file exists in the functions/ dir.
//
// Bindings (set in Cloudflare Pages dashboard → Settings → Functions):
//   DB        — D1 database binding named "DB"
//   IP_SALT   — environment variable, any long random string (keeps IPs unhashable)

const MAX_MSG  = 140;
const MAX_NAME = 16;
const MAX_ROWS = 200;

// --- helpers -----------------------------------------------------------------

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

function clean(str, max) {
  return String(str ?? "").trim().slice(0, max);
}

function id(prefix) {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// --- route handlers ----------------------------------------------------------

async function listGuests(db) {
  const { results } = await db
    .prepare("SELECT id, who, msg, parent_id, created_at FROM guests ORDER BY created_at ASC LIMIT ?")
    .bind(MAX_ROWS)
    .all();
  return json({ guests: results });
}

async function createGuest(request, env, ipHash) {
  const body = await request.json().catch(() => ({}));
  const who  = clean(body.who, MAX_NAME) || "anon";
  const msg  = clean(body.msg, MAX_MSG);
  if (!msg) return json({ error: "empty message" }, 400);

  // one root post per ip_hash (server-enforced, unlike the old localStorage version)
  const existing = await env.DB
    .prepare("SELECT id FROM guests WHERE ip_hash = ? AND parent_id IS NULL LIMIT 1")
    .bind(ipHash)
    .first();
  if (existing) return json({ error: "already posted" }, 429);

  const entry = { id: id("c"), who, msg, parent_id: null, created_at: Date.now() };
  await env.DB
    .prepare("INSERT INTO guests (id, who, msg, parent_id, ip_hash, created_at) VALUES (?, ?, ?, NULL, ?, ?)")
    .bind(entry.id, entry.who, entry.msg, ipHash, entry.created_at)
    .run();

  return json({ guest: entry });
}

async function createReply(request, env, ipHash, parentId) {
  const body = await request.json().catch(() => ({}));
  const who  = clean(body.who, MAX_NAME) || "anon";
  const msg  = clean(body.msg, MAX_MSG);
  if (!msg) return json({ error: "empty message" }, 400);

  // parent must exist
  const parent = await env.DB
    .prepare("SELECT id FROM guests WHERE id = ? AND parent_id IS NULL")
    .bind(parentId)
    .first();
  if (!parent) return json({ error: "parent not found" }, 404);

  // one reply per ip_hash per parent
  const existing = await env.DB
    .prepare("SELECT id FROM guests WHERE ip_hash = ? AND parent_id = ? LIMIT 1")
    .bind(ipHash, parentId)
    .first();
  if (existing) return json({ error: "already replied" }, 429);

  const entry = { id: id("r"), who, msg, parent_id: parentId, created_at: Date.now() };
  await env.DB
    .prepare("INSERT INTO guests (id, who, msg, parent_id, ip_hash, created_at) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(entry.id, entry.who, entry.msg, entry.parent_id, ipHash, entry.created_at)
    .run();

  return json({ guest: entry });
}

// --- main entrypoint ---------------------------------------------------------

export async function onRequest(context) {
  const { request, env, params } = context;
  const path    = (params.path || []).join("/");  // e.g. ""  or  "c123/reply"
  const method  = request.method;
  const ipHash  = await hashIp(getIp(request), env.IP_SALT || "dev-salt");

  try {
    // GET /api/guests
    if (method === "GET" && path === "") {
      return await listGuests(env.DB);
    }

    // POST /api/guests
    if (method === "POST" && path === "") {
      return await createGuest(request, env, ipHash);
    }

    // POST /api/guests/:id/reply
    if (method === "POST" && path.endsWith("/reply")) {
      const parentId = path.split("/")[0];
      return await createReply(request, env, ipHash, parentId);
    }

    return json({ error: "not found" }, 404);
  } catch (err) {
    return json({ error: "server error", detail: String(err) }, 500);
  }
}
