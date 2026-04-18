export async function onRequestGet({ request, env }) {
  const email = request.headers.get("cf-access-authenticated-user-email");
  const admin = email && env.ADMIN_EMAIL && email.toLowerCase() === env.ADMIN_EMAIL.toLowerCase();
  return new Response(JSON.stringify({ admin: !!admin }), {
    headers: { "content-type": "application/json" },
  });
}
