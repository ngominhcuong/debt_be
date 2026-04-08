import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { authRouter } from "./routes/auth.routes";
import { masterRouter } from "./routes/master.routes";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler";

const app = express();

function normalizeOrigin(value: string): string {
  return value.trim().replace(/\/+$/, "");
}

function wildcardToRegExp(pattern: string): RegExp {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
  const withWildcard = escaped.replace(/\*/g, ".*");
  return new RegExp(`^${withWildcard}$`);
}

const configuredOrigins = env.ALLOWED_ORIGINS
  ? env.ALLOWED_ORIGINS.split(",")
  : [env.FRONTEND_URL];

const allowedOriginPatterns = configuredOrigins
  .map((origin) => normalizeOrigin(origin))
  .filter(Boolean)
  .map((origin) => wildcardToRegExp(origin));

app.use(
  cors({
    origin: (origin, callback) => {
      // Requests without Origin header (health checks, server-to-server)
      // should not be blocked by CORS.
      if (!origin) {
        callback(null, true);
        return;
      }

      const normalizedOrigin = normalizeOrigin(origin);
      const isAllowed = allowedOriginPatterns.some((pattern) =>
        pattern.test(normalizedOrigin),
      );

      callback(null, isAllowed);
    },
    credentials: true,
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/master", masterRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server is listening on port ${env.PORT}`);
});
