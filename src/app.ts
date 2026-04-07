import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes'; 

const app: Application = express();

// ✅ CORS কনফিগারেশন - লোকাল এবং অনলাইন দুইটাই সাপোর্ট করবে
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "http://localhost:5173", 
    "https://your-frontend-domain.vercel.app" // আপনার ফ্রন্টএন্ডের ভেরসেল লিংকটি এখানে বসিয়ে দিন
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// API Routes
app.use('/api/v1', router); 

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.send('Eco Spark Hub Server Running 🚀');
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'API Route Not Found',
  });
});

export default app;