export type ApiErrorBody = {
  message?: string;
  errors?: {
    details?: { message: string }[];
  };
};

export class ApiError extends Error {
  status: number;
  data: ApiErrorBody;

  constructor(status: number, data: ApiErrorBody, message?: string) {
    super(message ?? data.message ?? "Request failed");
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function request<T>(
  path: string,
  init?: RequestInit & { timeout?: number }
): Promise<T> {
  const { timeout = 3 * 60 * 1000, ...rest } = init ?? {};
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(path, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...rest.headers,
      },
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => ({}))) as ApiErrorBody & T;
    if (!response.ok) {
      throw new ApiError(response.status, data, data.message);
    }
    return data as T;
  } finally {
    clearTimeout(timer);
  }
}

export function joinWaitlist(credentials: { email: string; name: string }) {
  return request("/api/waitlist", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function getWaitlistCount() {
  return request<{ count: number }>("/api/waitlist/count", {
    timeout: 15000,
  });
}

export function newsletterSignup(credentials: { email: string }) {
  return request("/api/services/newsletter", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}
