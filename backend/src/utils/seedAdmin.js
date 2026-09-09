/**
 * One-time / occasional-use script to create the first admin account.
 *
 * There is deliberately NO public API endpoint that lets anyone become
 * an admin — this script must be run directly on the server/machine
 * that has access to the database.
 *
 * Usage:
 *   1. Set ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD in your .env file.
 *   2. Run: npm run seed:admin
 *
 * If a user with ADMIN_EMAIL already exists, this script promotes that
 * existing user to admin (and verifies them) instead of creating a
 * duplicate account.
 */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');

const run = async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error(
      'Please set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in your .env file before running this script.'
    );
    process.exit(1);
  }

  await connectDB();

  const existingUser = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });

  if (existingUser) {
    existingUser.role = 'admin';
    existingUser.isVerified = true;
    await existingUser.save();
    console.log(`Existing user "${existingUser.email}" has been promoted to admin.`);
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    const admin = await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
    });
    console.log(`Admin account created: ${admin.email}`);
  }

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error('Failed to seed admin:', err);
  process.exit(1);
});
