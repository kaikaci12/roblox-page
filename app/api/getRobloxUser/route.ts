import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
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

    const userDetailsResponse = await axios.get(
      `https://users.roblox.com/v1/users/${userId}`
    );
    const displayName = userDetailsResponse.data.displayName;

    const avatarResponse = await axios.get(
      `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=720x720&format=png&isCircular=false`
    );
    const avatarUrl = avatarResponse.data.data[0]?.imageUrl;

    const profilePictureResponse = await axios.get(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=720x720&format=png&isCircular=false`
    );
    const profilePictureUrl = profilePictureResponse.data.data[0]?.imageUrl;

    return NextResponse.json({
      displayName,
      avatarUrl,
      profilePictureUrl,
      username,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching user data" },
      { status: 500 }
    );
  }
}
