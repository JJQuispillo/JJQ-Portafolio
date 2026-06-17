import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const isDbConfigured = process.env.USE_DATABASE === 'true';

console.log('USE_DATABASE env:', process.env.USE_DATABASE);
console.log('isDbConfigured:', isDbConfigured);

if (isDbConfigured) {
  const profile = await prisma.profile.findFirst();
  console.log('Profile from DB:', profile?.title);
} else {
  console.log('Would use static data');
}
