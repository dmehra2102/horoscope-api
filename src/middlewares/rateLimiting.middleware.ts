import { rateLimit } from "express-rate-limit";

export const ensureRateLimitMiddleware = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 5, // Limit each IP to 5 requests per `window` (here, per 1 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  message: "You have made too many request, please try again after 1 minute",
});
