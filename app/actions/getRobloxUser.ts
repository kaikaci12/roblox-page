const fetchRobloxUser = async (username: string) => {
  try {
    const response = await fetch(`/api/getRobloxUser?username=${username}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || data.error) {
      return { error: data?.error || "Could not find user" };
    }

    return {
      ...data,
      avatarUrl: data.avatarUrl || null,
    };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export default fetchRobloxUser;
