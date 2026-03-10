import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

const DB_NAME = 'Appointment';
const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '123456',
};

async function ensureDatabase() {
  const conn = await mysql.createConnection({
    ...DB_CONFIG,
    multipleStatements: true,
  });

  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  await conn.end();
}

// Ensure the database exists before instantiating Sequelize
await ensureDatabase();

const sequelize = new Sequelize(DB_NAME, DB_CONFIG.user, DB_CONFIG.password, {
  host: DB_CONFIG.host,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
