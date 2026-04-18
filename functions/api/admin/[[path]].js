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

function isAdmin(request, env) {
  const email = request.headers.get("cf-access-authenticated-user-email");
  return email && env.ADMIN_EMAIL && email.toLowerCase() === env.ADMIN_EMAIL.toLowerCase();
}

async function deleteGuest(env, guestId) {
  await env.DB.prepare("DELETE FROM guests WHERE id = ? OR parent_id = ?").bind(guestId, guestId).run();
  return json({ ok: true });
}

async function banGuest(env, guestId) {
  const row = await env.DB.prepare("SELECT ip_hash FROM guests WHERE id = ?").bind(guestId).first();
  if (!row) return json({ error: "not found" }, 404);

  await env.DB
    .prepare("INSERT OR REPLACE INTO bans (ip_hash, reason, banned_at) VALUES (?, ?, ?)")
    .bind(row.ip_hash, "admin ban", Date.now())
    .run();
  await env.DB.prepare("DELETE FROM guests WHERE id = ? OR parent_id = ?").bind(guestId, guestId).run();
  return json({ ok: true });
}

async function listBans(env) {
  const { results } = await env.DB
    .prepare("SELECT ip_hash, reason, banned_at FROM bans ORDER BY banned_at DESC LIMIT 100")
    .all();
  return json({ bans: results });
}

async function unban(env, ipHash) {
  await env.DB.prepare("DELETE FROM bans WHERE ip_hash = ?").bind(ipHash).run();
  return json({ ok: true });
}

export async function onRequest(context) {
  const { request, env, params } = context;

  if (!isAdmin(request, env)) return json({ error: "unauthorized" }, 401);

  const path   = (params.path || []).join("/");
  const method = request.method;

  try {
    if (method === "GET" && path === "bans") return await listBans(env);

    if (method === "DELETE" && path.startsWith("guests/")) {
      const guestId = path.slice("guests/".length);
      return await deleteGuest(env, guestId);
    }

    if (method === "POST" && path.startsWith("guests/") && path.endsWith("/ban")) {
      const guestId = path.slice("guests/".length, -"/ban".length);
      return await banGuest(env, guestId);
    }

    if (method === "DELETE" && path.startsWith("bans/")) {
      const ipHash = path.slice("bans/".length);
      return await unban(env, ipHash);
    }

    return json({ error: "not found" }, 404);
  } catch (err) {
    return json({ error: "server error", detail: String(err) }, 500);
  }
}
