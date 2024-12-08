import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Extract IP address from headers with enhanced security
    const rawIp =
      req.headers.get("x-forwarded-for") || req.socket.remoteAddress;

    // Validate and sanitize IP address (optional, but recommended)
    // You can use a library like 'ip' for robust validation:
    // const isValid = require('ip').isIPv4(rawIp) || require('ip').isIPv6(rawIp);
    // if (!isValid) {
    //   throw new Error('Invalid IP address');
    // }

    // Extract the first IP from the comma-separated list (if present)
    const ip = rawIp?.split(",")[0]?.trim();
    console.log(ip);
    // Fetch location data, handling potential errors gracefully
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!response.ok) {
      console.error("bruh");
      return NextResponse.json({ error: "Location data unavailable" });
    }

    const locationData = await response.json();

    // Return the location data or an appropriate response
    return NextResponse.json(locationData);
  } catch (error) {
    console.error("Error fetching location data:", error);
    // Handle errors appropriately, e.g., return a generic error response
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
