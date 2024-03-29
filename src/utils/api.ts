import { FetchOptions } from "@/models/api";

export const fetchData = async (
  url: string,
  options: FetchOptions
): Promise<any> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("userToken") || ""}`,
    "Cache-Control": "no-cache",
  };

  try {
    const response = await fetch(url, {
      method: options.method,
      headers,
      body: options.body ? JSON.stringify(options.body) : null,
      cache: "no-cache",
    });
    if (!response.ok) throw new Error(await response.text());
    return await response.json();
  } catch (error) {
    console.error("Fetch request failed:", error);
    throw error;
  }
};

export const getNotes = async (userId: string) => {
  const response = await fetchData(`/api/users/${userId}/notes`, {
    method: "GET",
  });

  return response;
};
