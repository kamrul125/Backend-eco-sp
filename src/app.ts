import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes'; 

const app: Application = express();

// ✅ CORS কনফিগারেশন আপডেট করা হয়েছে
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"], // সব পোর্ট সাপোর্ট করবে
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
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
    message: 'API Route Not Found',
  });
});

export default app;