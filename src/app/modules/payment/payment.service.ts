import axios from "axios";
import { prisma } from "../../../config/prisma";

export const purchaseIdea = async (userId: string, ideaId: string) => {
  // ১. ডাটাবেস থেকে আইডি দিয়ে Idea খোঁজা
  const dbIdea = await prisma.idea.findUnique({ where: { id: ideaId } });
  
  // 🔄 যদি ডাটাবেসে না থাকে, তবে একটি ডিফল্ট অবজেক্ট তৈরি করি যাতে TS এরর না দেয়
  const idea = dbIdea || {
    id: ideaId,
    title: "EcoSpark Pro Membership",
    price: 499,
    isPaid: true,
  };

  // ২. প্রাইস এবং এভেইলিবিলিটি চেক
  if (!idea.isPaid || !idea.price || idea.price <= 0) {
    throw new Error("This idea is not available for purchase!");
  }

  const transactionId = `PUR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // ৩. পেমেন্ট রেকর্ড PENDING হিসেবে তৈরি
  try {
    await prisma.payment.create({
      data: { 
        transactionId, 
        amount: idea.price, 
        userId, 
        ideaId: idea.id, 
        status: "PENDING" 
      },
    });
  } catch (dbError) {
    console.warn("⚠️ Warning: পেমেন্ট রেকর্ড ডাটাবেসে সেভ করা যায়নি (হয়তো আইডি মিলছে না), তবে পেমেন্ট প্রসেস চলছে।");
  }

  // ৪. SSLCommerz এর জন্য ডাটা প্রস্তুত করা
  const paymentData: Record<string, string> = {
    store_id: (process.env.STORE_ID as string) || "",
    store_passwd: (process.env.STORE_PASSWORD as string) || "",
    total_amount: idea.price.toString(),
    currency: "BDT",
    tran_id: transactionId,
    success_url: `${process.env.BACKEND_URL}/api/v1/payments/success/${transactionId}`,
    fail_url: `${process.env.BACKEND_URL}/api/v1/payments/fail/${transactionId}`,
    cancel_url: `${process.env.BACKEND_URL}/api/v1/payments/fail/${transactionId}`,
    cus_name: "Md. Kamruzzaman",
    cus_email: "customer@mail.com",
    cus_add1: "Rangpur, Bangladesh", 
    cus_city: "Rangpur",
    cus_state: "Rangpur",
    cus_postcode: "5400",
    cus_country: "Bangladesh",
    cus_phone: "01700000000",
    shipping_method: "NO",
    product_name: idea.title.substring(0, 30),
    product_category: "Digital Service",
    product_profile: "non-physical-goods",
  };

  try {
    const response = await axios({
      method: 'POST',
      url: process.env.SSL_PAYMENT_URL!,
      data: new URLSearchParams(paymentData).toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (response.data?.status === "SUCCESS") {
      return response.data.GatewayPageURL; 
    } else {
      console.log("❌ SSLCommerz API Error:", response.data);
      throw new Error(response.data?.failedreason || "Payment URL generation failed");
    }
  } catch (error: any) {
    console.error("❌ SSL Connection Error:", error.message);
    throw new Error("Could not connect to SSLCommerz: " + error.message);
  }
};

export const fulfillPayment = async (transactionId: string) => {
  return await prisma.payment.update({
    where: { transactionId },
    data: { status: "PAID" },
  });
};

export const checkAccess = async (userId: string, ideaId: string) => {
  const payment = await prisma.payment.findFirst({
    where: { userId, ideaId, status: "PAID" },
  });
  return !!payment;
};