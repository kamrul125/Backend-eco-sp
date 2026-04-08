import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes";

const app: Application = express();

// ✅ ১. CORS Configuration
// আলাদা করে app.options() দরকার নেই, cors() মিডলওয়্যার নিজেই OPTIONS রিকোয়েস্ট হ্যান্ডেল করে
app.use(
  cors({
    origin: true, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ ২. Body parser
app.use(express.json());

// ✅ ৩. API Routes
app.use("/api/v1", router);

// ✅ ৪. Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("🚀 Eco Spark Hub Backend Running");
});

// ✅ ৫. 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route Not Found: ${req.originalUrl}`,
  });
});

// ✅ ৬. Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

export default app;