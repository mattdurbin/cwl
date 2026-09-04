export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/logo") {
      const obj = await env.cwl.get("Christopher Wren 4855.jpeg");
      if (!obj) return new Response("Not found", { status: 404 });
      const headers = new Headers();
      obj.writeHttpMetadata(headers);
      headers.set("Cache-Control", "public, max-age=86400");
      headers.set("Content-Type", "image/jpeg");
      return new Response(obj.body, { headers });
    }
    if (url.hostname === "christopherwrenlodge.co.uk") {
      url.hostname = "www.christopherwrenlodge.co.uk";
      return Response.redirect(url.toString(), 301);
    }
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Christopher Wren Lodge</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #0f172a; color: #e2e8f0; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem; }
    .logo { max-width: 180px; width: 100%; height: auto; margin-bottom: 2rem; border-radius: 12px; }
    h1 { font-size: 2.5rem; font-weight: 300; letter-spacing: 0.05em; margin-bottom: 1rem; }
    p { font-size: 1.1rem; color: #94a3b8; max-width: 480px; line-height: 1.6; }
  </style>
</head>
<body>
  <img src="/logo" alt="Christopher Wren Lodge" class="logo" />
  <h1>Christopher Wren Lodge</h1>
  <p>Our website is on its way. Please check back soon.</p>
</body>
</html>`;
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
};
