import { Server } from "http";
import app from "./app";

const PORT = process.env.PORT || 5000;

let server: Server;

// 🔥 Only run locally
if (process.env.NODE_ENV !== "production") {
  server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// ✅ Vercel handler
export default app;