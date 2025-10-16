import rateLimit from "express-rate-limit";

function rateLimitting({
  windowMs,
  maxRequests,
  message,
}: {
  windowMs?: number;
  maxRequests?: number;
  message?: string;
} = {}) {
  return rateLimit({
    windowMs: windowMs ?? 15 * 60 * 1000, // 15 minutes
    max: maxRequests ?? 100,
    message: message ?? "Too many requests, please try again after some time.",
  });
}

export { rateLimitting };
