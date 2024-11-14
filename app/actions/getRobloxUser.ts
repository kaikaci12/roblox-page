const fetchRobloxUser = async (username: string) => {
  try {
    const response = await fetch(`/api/getRobloxUser?username=${username}`);
    const data = await response.json();

    if (data && !data.error) {
      if (!data.avatarUrl) {
        data.avatarUrl = null;
      }
    }

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export default fetchRobloxUser;
