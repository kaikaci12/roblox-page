import { NextResponse } from "next/server";
import axios from "axios";

const MAX_RETRIES = 5;
const INITIAL_DELAY = 2000; // 2 seconds initial delay

// Retry function with exponential backoff
const fetchWithRetry = async (
  url: string,
  retries: number = MAX_RETRIES,
  delay: number = INITIAL_DELAY
) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      console.log(`Rate limit reached. Retrying in ${delay / 1000} seconds...`);

      await new Promise((resolve) => setTimeout(resolve, delay));

      return fetchWithRetry(url, retries - 1, delay * 2);
    }

    throw error;
  }
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    console.log(`Fetching data for username: ${username}`);
    const searchResponse = await fetchWithRetry(
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

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching Roblox user data:", error);
    return NextResponse.json(
      { error: "Error fetching user data" },
      { status: 500 }
    );
  }
}
