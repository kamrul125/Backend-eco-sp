import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './routes'; 

const app: Application = express();

// ✅ CORS আপডেট: আপনার লগের ডোমেইনটি সরাসরি যুক্ত করা হয়েছে
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "http://localhost:5173",
    "https://ecospark-frontend-f5vj44lhg-md-kamruzzamans-projects-8608facf.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// API Routes
app.use('/api/v1', router); 

app.get('/', (req: Request, res: Response) => {
  res.send('Eco Spark Hub Server Running 🚀');
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route Not Found: ${req.originalUrl}`,
  });
});

export default app;