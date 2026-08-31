const mysql = require('mysql2/promise');

async function createDatabase() {
  console.log("Connecting to TiDB Cloud gateway...");
  try {
    const connection = await mysql.createConnection({
      host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
      port: 4000,
      user: 'U8XmddPrYax4YJR.root',
      password: 'y0qTNQmOgaz5D3SH',
      ssl: {
        rejectUnauthorized: false
      }
    });

    console.log("Connected successfully! Creating database `cpb_bank`...");
    await connection.query('CREATE DATABASE IF NOT EXISTS cpb_bank CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;');
    console.log("Database `cpb_bank` created or already exists successfully!");
    
    const [rows] = await connection.query('SHOW DATABASES;');
    console.log("Available databases:", rows.map(r => r.Database));
    
    await connection.end();
  } catch (err) {
    console.error("Error creating database:", err);
    process.exit(1);
  }
}

createDatabase();
