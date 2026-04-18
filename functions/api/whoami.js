export async function onRequestGet({ request, env }) {
  const email = request.headers.get("cf-access-authenticated-user-email");
  const admin = email && env.ADMIN_EMAIL && email.toLowerCase() === env.ADMIN_EMAIL.toLowerCase();

  const debug = {
    admin: !!admin,
    headerEmail: email,
    envAdminEmail: env.ADMIN_EMAIL,
    envHasAdminEmail: "ADMIN_EMAIL" in env,
    envKeys: Object.keys(env),
    allHeaders: Object.fromEntries([...request.headers.entries()].filter(([k]) => k.startsWith("cf-"))),
  };

  return new Response(JSON.stringify(debug, null, 2), {
    headers: { "content-type": "application/json" },
  });
}
