// pages/api/getRobloxUser.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    try {
      // Make a request to Roblox's API to fetch user data
      const response = await axios.post(
        "https://users.roblox.com/v1/usernames/users",
        {
          usernames: [username],
          excludeBannedUsers: true,
        }
      );

      // Check if we got the user data
      if (response.data.data && response.data.data.length > 0) {
        const user = response.data.data[0]; // Get the user data
        return res.status(200).json({
          displayName: user.displayName,
          avatarUrl: user.avatarUrl,
        });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return res
        .status(500)
        .json({ error: "Failed to fetch user from Roblox API" });
    }
  } else {
    // Method not allowed for non-POST requests
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
