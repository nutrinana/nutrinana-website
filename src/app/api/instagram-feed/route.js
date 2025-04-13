export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const instagramURL = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=10&access_token=${token}`;

  try {
    const res = await fetch(instagramURL);
    if (!res.ok) {
      throw new Error(`Instagram API responded with ${res.status}`);
    }

    const json = await res.json();
    return new Response(JSON.stringify(json.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Instagram API error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch Instagram posts" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
