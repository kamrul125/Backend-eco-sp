import dotenv from 'dotenv';
import path from 'path';

// .env ফাইল লোড করা হচ্ছে
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  
  // JWT কনফিগারেশন
  jwt_access_secret: process.env.JWT_ACCESS_SECRET || 'very-secret-fallback-key',
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '7d',
  
  // রিফ্রেশ টোকেন (যদি ভবিষ্যতে ব্যবহার করেন)
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '30d',

  // SSLCommerz বা অন্যান্য পেমেন্ট গেটওয়ে ডিটেইলস
  store_id: process.env.STORE_ID,
  store_password: process.env.STORE_PASSWORD,
  ssl_payment_url: process.env.SSL_PAYMENT_URL,

  // সল্ট রাউন্ড (bcrypt এর জন্য)
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || 12,
};