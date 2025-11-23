import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { db } from "./db";

const app = express();

/**
 * ESSENCIAL PARA FUNCIONAR EM PRODUÇÃO NO RENDER
 * Permite que cookies "secure" sejam enviados mesmo atrás do proxy HTTPS do Render.
 */
app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PgStore = connectPgSimple(session);

app.use(
  session({
    store: new PgStore({
      conObject: {
        connectionString: process.env.DATABASE_URL,
      },
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "sus-para-todos-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // necessário para produção
      sameSite: "lax", // recomendado para cookies em backends com SPA
    },
  })
);

/**
 * Middleware para log de requisições API com captura de JSON.
 */
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Vite só em desenvolvimento (hot reload)
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);

  server.listen(
    {
      port,
      host: process.platform === "win32" ? "127.0.0.1" : "0.0.0.0",
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
