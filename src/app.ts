import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes'; // আপনার index.ts ফাইলটি ইমপোর্ট করুন

const app: Application = express();

app.use(cors());
app.use(express.json());

// ✅ এটি নিশ্চিত করুন: মেইন রাউটার রেজিস্টার করা
app.use('/api/v1', router); 

// টেস্ট রুট (এটি কাজ করছে কি না দেখুন)
app.get('/', (req: Request, res: Response) => {
  res.send('Eco Spark Hub Server Running 🚀');
});

// ৪-৪ হ্যান্ডলার (সব রাউটের নিচে থাকবে)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'API Route Not Found',
  });
});

export default app;