const fetchRobloxUser = async (username: string) => {
  try {
    // Call the API to fetch user data
    const response = await fetch(`/api/getRobloxUser?username=${username}`);

    // Handle non-200 status codes
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Parse the response data
    const data = await response.json();

    if (!data || data.error) {
      return { error: data?.error || "Unknown error" };
    }

    return {
      ...data,
      avatarUrl: data.avatarUrl || null,
    };
  } catch (error) {
    return { data: error };
  }
};

export default fetchRobloxUser;
