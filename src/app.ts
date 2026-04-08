import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";

const app: Application = express();

// ✅ CORS (এখানে আপনার বর্তমান লাইভ ফ্রন্টএন্ড লিঙ্কটি যোগ করা হয়েছে)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://eco-spark-hub.vercel.app",
      "https://ecospark-frontend-iota.vercel.app", // 👈 এই লাইনটিই আপনার সমস্যার সমাধান!
    ],
    credentials: true,
  })
);

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Prefix
app.use("/api/v1", router);

// ✅ Health check
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "🚀 Backend running",
  });
});

// ✅ 404
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route Not Found: ${req.originalUrl}`,
  });
});

// ✅ Global Error
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

export default app;