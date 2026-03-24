require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'watchstore',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

// Using the 4 user-provided local custom images
const watches = [
  {
    name: "ساعة روز جولد الفاخرة",
    description: "ساعة أنيقة بلون روز جولد المميز، مصممة بعناية فائقة لتتألقي في كل مناسباتك السعيدة واليومية.",
    price: 4500.00,
    image_url: "/assets/images/1efd2061-fdba-4c83-a2c9-0722d66374db.jpg"
  },
  {
    name: "إيليجانس البلاتينية",
    description: "ساعة معدنية بلون فضي وبريق بلاتيني خاطف للأنظار، تعكس الأناقة الكلاسيكية بلمسة حديثة وجريئة.",
    price: 5200.00,
    image_url: "/assets/images/b692f0e1-f338-48aa-9664-e362510ce7a2.jpg"
  },
  {
    name: "الذهبية الإمبراطورية",
    description: "ساعة ذهبية فخمة مرصعة بلمسات كلاسيكية راقية. تمنح معصمك الفخامة المطلقة والثقة الثابتة.",
    price: 6000.00,
    image_url: "/assets/images/c1b5bcf1-afcb-48ec-b881-0b7068cbb06b.jpg"
  },
  {
    name: "بلاك بيرل المميزة",
    description: "تناغم مثالي بين الغموض والجمال في ساعة بتفاصيل داكنة وحزام قوي يعبر عن قوة الشخصية والذوق الرفيع.",
    price: 4900.00,
    image_url: "/assets/images/c6b57ba2-9c95-4a72-b911-9c7fcd1dd762.jpg"
  }
];

async function seedProducts() {
  try {
    console.log('⏳ Connecting to the database...');

    // 1. Create tables if they don't exist (Fix for "relation does not exist")
    console.log('🏗️  Creating tables if missing...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          price DECIMAL(10, 2) NOT NULL,
          image_url TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          full_name VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          wilaya VARCHAR(100) NOT NULL,
          commune VARCHAR(100) NOT NULL,
          product_id INTEGER REFERENCES products(id),
          product_name VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // 2. Clear old products
    await pool.query('TRUNCATE TABLE products CASCADE;');
    console.log('🧹 Cleared existing products.');

    // 3. Insert new local custom imagery watches
    console.log('🌱 Inserting high-quality local watches...');
    for (const watch of watches) {
      await pool.query(
        'INSERT INTO products (name, description, price, image_url) VALUES ($1, $2, $3, $4)',
        [watch.name, watch.description, watch.price, watch.image_url]
      );
    }
    
    console.log('✅ Successfully inserted 4 premium watches from your assets into the database!');
  } catch (error) {
    console.error('❌ Error seeding the database:', error.message);
  } finally {
    pool.end();
  }
}

seedProducts();
