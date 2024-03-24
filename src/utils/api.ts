import { FetchOptions } from "@/models/api";

export const fetchData = async (
  url: string,
  options: FetchOptions
): Promise<any> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
  };

  try {
    const response = await fetch(url, {
      method: options.method,
      headers,
      body: options.body ? JSON.stringify(options.body) : null,
    });
    if (!response.ok) throw new Error(await response.text());
    return await response.json();
  } catch (error) {
    console.error("Fetch request failed:", error);
    throw error;
  }
};

export const getNotes = async (userId: string) => {
  const response = await fetchData(`/api/notes?userId=${userId}`, {
    method: "GET",
  });

  return response;
};
