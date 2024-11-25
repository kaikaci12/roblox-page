import { NextResponse } from "next/server";

export async function GET() {
  try {
    const callbackFunction = "handleLeadsCallback"; // Define your callback function name
    const url = `https://dh9e7lxecq73l.cloudfront.net/public/external/check2.php?user_id=623910&api_key=525aedb31fa76c26997f25d2b15e501f&testing=1&callback=1`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonp = await response.text();

    console.log("Raw JSONP response:", jsonp);

    const jsonData = jsonp.slice(callbackFunction.length + 1, -1);

    const data = JSON.parse(jsonData);

    if (data && data.length > 0) {
      const offerIds = data.map((lead) => parseInt(lead.offer_id));
      const totalEarnings = data.reduce(
        (sum, lead) => sum + parseFloat(lead.points),
        0
      );
      console.log(
        `User completed ${data.length} leads for $${(
          totalEarnings / 100
        ).toFixed(2)}, offers: ${offerIds.join(",")}`
      );
    } else {
      console.log("No leads were found.");
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json([]); // Return empty array in case of an error
  }
}
