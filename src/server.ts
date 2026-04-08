import { Server } from "http";
import app from "./app";

const PORT = process.env.PORT || 5000;

// 🔥 Local development এর জন্য
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on port ${PORT}`);
  });
}

// ✅ Vercel-এর জন্য এক্সপোর্ট (এটি জরুরি)
export default app;