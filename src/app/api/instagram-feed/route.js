import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const instagramURL = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=10&access_token=${token}`;

  try {
    const res = await fetch(instagramURL);
    const data = await res.json();

    if (!res.ok || data.error) {
      return NextResponse.json(
        { error: true, message: `Instagram API responded with ${res.status}` },
        { status: res.status }
      );
    }

    return NextResponse.json(data.data);
  } catch (error) {
    console.error("Instagram API error:", error);

    return NextResponse.json(
      { error: true, message: error.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
