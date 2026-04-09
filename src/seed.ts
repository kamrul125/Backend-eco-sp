import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // ১. এডমিন ইউজার তৈরি বা আপডেট
  const hashedPassword = await bcrypt.hash('admin123456', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN', 
    },
  });

  console.log('✅ Admin user created/verified:', admin.email);

 
  const categories = [
    { name: 'Waste' },
    { name: 'Energy' },
    { name: 'Transportation' },
    { name: 'Sustainability' },
    { name: 'Others' }
  ];

  console.log('⏳ Seeding categories...');

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  console.log('✅ All 5 categories seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });