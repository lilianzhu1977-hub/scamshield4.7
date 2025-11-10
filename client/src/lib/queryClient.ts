import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

const API_BASE = import.meta.env.DEV ? 'http://localhost:5000' : '';

export async function apiRequest(method: string, url: string, body?: any) {
  // Get user data from localStorage
  const userDataStr = localStorage.getItem('scamshield-user');
  const userData = userDataStr ? JSON.parse(userDataStr) : null;

  // Add user data to body for POST requests or URL params for GET requests
  let finalUrl = url;
  let finalBody = body;

  if (userData) {
    if (method === 'GET') {
      const urlObj = new URL(`${API_BASE}${url}`, window.location.origin);
      urlObj.searchParams.set('username', userData.name);
      urlObj.searchParams.set('displayName', userData.name);
      finalUrl = urlObj.pathname + urlObj.search;
    } else if (body) {
      finalBody = {
        ...body,
        username: userData.name,
        displayName: userData.name
      };
    }
  }

  const response = await fetch(`${API_BASE}${finalUrl}`, {
    method,
    headers: finalBody ? { 'Content-Type': 'application/json' } : {},
    body: finalBody ? JSON.stringify(finalBody) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(response);
  return response;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});