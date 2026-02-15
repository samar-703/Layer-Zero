interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;

const ipMap = new Map<string, RateLimitEntry>();

function cleanupExpired(): void {
  const now = Date.now();
  for (const [ip, entry] of ipMap) {
    if (now > entry.resetTime) {
      ipMap.delete(ip);
    }
  }
}

export function rateLimit(ip: string): { success: boolean } {
  cleanupExpired();

  const now = Date.now();
  const entry = ipMap.get(ip);

  if (!entry || now > entry.resetTime) {
    ipMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return { success: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { success: false };
  }

  entry.count++;
  return { success: true };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}
