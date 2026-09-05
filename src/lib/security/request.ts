import "server-only";

const DEFAULT_JSON_LIMIT = 32 * 1024;

export class RequestBodyLimitError extends Error {
  constructor() {
    super("Request body is too large.");
    this.name = "RequestBodyLimitError";
  }
}

export class InvalidRequestBodyError extends Error {
  constructor() {
    super("Request body is invalid.");
    this.name = "InvalidRequestBodyError";
  }
}

/** Read JSON without allowing an unbounded request body to be buffered. */
export async function readJsonBody<T = unknown>(
  request: Request,
  maxBytes = DEFAULT_JSON_LIMIT
): Promise<T> {
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    throw new RequestBodyLimitError();
  }

  let text: string;
  if (!request.body) {
    text = await request.text();
    if (new TextEncoder().encode(text).byteLength > maxBytes) {
      throw new RequestBodyLimitError();
    }
  } else {
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (!value) continue;
        total += value.byteLength;
        if (total > maxBytes) {
          await reader.cancel();
          throw new RequestBodyLimitError();
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }

    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    text = new TextDecoder().decode(bytes);
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new InvalidRequestBodyError();
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const candidate =
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-vercel-forwarded-for")?.trim() ||
    forwarded ||
    "unknown";
  return candidate.slice(0, 128);
}

/**
 * Reject browser cross-site (and merely same-site) state-changing requests.
 * Same-site is not the same as same-origin: a compromised sibling subdomain
 * must not be able to submit admin mutations with the user's cookies.
 * Requests without browser fetch metadata remain available to trusted
 * server-to-server callers; authenticated routes still require the admin
 * session and role check.
 */
export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin")?.trim();
  if (origin) {
    if (origin.toLowerCase() === "null") return false;
    try {
      return allowedOrigins().has(new URL(origin).origin);
    } catch {
      return false;
    }
  }

  const referer = request.headers.get("referer")?.trim();
  if (referer) {
    try {
      return allowedOrigins().has(new URL(referer).origin);
    } catch {
      return false;
    }
  }

  const fetchSite = request.headers.get("sec-fetch-site")?.toLowerCase();
  return !fetchSite || fetchSite === "same-origin" || fetchSite === "none";
}

function allowedOrigins(): Set<string> {
  const origins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    "https://kihocamera.com",
    "https://www.kihocamera.com",
    ...(process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production"
      ? []
      : ["http://localhost:3000", "http://127.0.0.1:3000"]),
  ];

  return new Set(
    origins.flatMap((value) => {
      if (!value) return [];
      try {
        return [new URL(value).origin];
      } catch {
        return [];
      }
    })
  );
}
