#!/usr/bin/env ts-node

import dotenv from 'dotenv';
import path from 'path';
import prisma from '../lib/db/prisma';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

async function main() {
  console.log('Testing database connection with Prisma...');
  console.log('Database URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':***@'));

  try {
    await prisma.$connect();
    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log('\n✓ Success! Prisma database connection is working.');
    console.log('Current time:', result);
  } catch (error) {
    console.log('\n✗ Failed to connect to database with Prisma.');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }

  process.exit(0);
}

main();
