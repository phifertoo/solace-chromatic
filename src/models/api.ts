export interface FetchOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, any>;
}
