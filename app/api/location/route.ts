import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Extract IP address from headers
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.connection.remoteAddress ||
      "127.0.0.1";

    // Fetch location data
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }

    const locationData = await response.json();

    // Return the location data as JSON
    return NextResponse.json(locationData);
  } catch (error) {
    // Handle errors and return an appropriate response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
