import { NextResponse } from "next/server";
import axios from "axios";

// Cache and rate limiter
const cache = new Map();
const rateLimiter = new Map();

const getClientIP = (request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor
    ? forwardedFor.split(",")[0]
    : request.headers.get("remote-address") || "127.0.0.1";
};

const getFromCache = (key) => {
  const entry = cache.get(key);
  return entry && entry.expiry > Date.now() ? entry.value : null;
};

const setCache = (key, value, ttl = 300) => {
  cache.set(key, { value, expiry: Date.now() + ttl * 1000 });
};

const isRateLimited = (ip, maxRequests = 10, windowMs = 60000) => {
  const currentTime = Date.now();
  const requests = rateLimiter.get(ip) || [];

  const recentRequests = requests.filter(
    (timestamp) => currentTime - timestamp < windowMs
  );
  rateLimiter.set(ip, [...recentRequests, currentTime]);

  return recentRequests.length >= maxRequests;
};

export async function GET(request) {
  const ip = getClientIP(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  const cachedResponse = getFromCache(username);
  if (cachedResponse) {
    return NextResponse.json(cachedResponse);
  }

  try {
    const searchResponse = await axios.get(
      `https://users.roblox.com/v1/users/search?keyword=${username}`
    );

    const user = searchResponse.data.data[0];
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user.id;

    const [userDetailsResponse, avatarResponse, profilePictureResponse] =
      await Promise.all([
        axios.get(`https://users.roblox.com/v1/users/${userId}`),
        axios.get(
          `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=720x720&format=png&isCircular=false`
        ),
        axios.get(
          `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=720x720&format=png&isCircular=false`
        ),
      ]);

    const responseData = {
      displayName: userDetailsResponse.data.displayName,
      avatarUrl: avatarResponse.data.data[0]?.imageUrl || null,
      profilePictureUrl: profilePictureResponse.data.data[0]?.imageUrl || null,
      username,
    };

    setCache(username, responseData);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching Roblox user data:", error);
    return NextResponse.json(
      { error: "Error fetching user data" },
      { status: 500 }
    );
  }
}
