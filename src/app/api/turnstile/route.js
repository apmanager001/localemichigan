const secretKey = process.env.TURNSTILE_SECRET_KEY;

export async function POST(request) {
  if (!secretKey) {
    return new Response(
      JSON.stringify({ error: "Missing TURNSTILE secret key." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const body = await request.json();
  const token = body?.token;

  if (!token) {
    return new Response(JSON.stringify({ error: "Missing Turnstile token." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const verifyResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    },
  );

  const data = await verifyResponse.json();

  return new Response(JSON.stringify(data), {
    status: verifyResponse.ok ? 200 : 400,
    headers: { "Content-Type": "application/json" },
  });
}
