import axios from "axios";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username } = req.body; // Use req.body for POST data

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    try {
      // Now you can handle the POST logic here...
      // Your existing logic to fetch user details goes here.
      const response = await axios.post(
        "https://users.roblox.com/v1/usernames/users",
        {
          usernames: [username],
          excludeBannedUsers: true,
        }
      );

      // Fetch user details from the response...
      return res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // Method not allowed
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
