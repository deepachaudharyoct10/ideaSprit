import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db";
import developerRoutes from "./routes/developers";
import projectRoutes from "./routes/projects";
import testimonialRoutes from "./routes/testimonials";
import contactRoutes from "./routes/contact";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: "Too many requests, please try again later." },
});
app.use("/api", limiter);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/developers", developerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contact", contactRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`\n🚀 IdeaSprit API running on http://localhost:${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || "development"}\n`);
  });
};

start();

export default app;
