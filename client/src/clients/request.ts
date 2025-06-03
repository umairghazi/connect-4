import { config } from "../config/config";


function getAuthTokenFromCookie(): string | null {
  const cookies = document.cookie.split("; ").reduce((acc: Record<string, string>, curr) => {
    const [key, value] = curr.split("=");
    acc[key] = value;
    return acc;
  }, {});
  return cookies["c4-new-token"] || null;
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthTokenFromCookie();

  const headers: HeadersInit & { Authorization?: string } = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${config.apiBaseUrl}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error ?? "Request failed");
  }

  return response.json();
}