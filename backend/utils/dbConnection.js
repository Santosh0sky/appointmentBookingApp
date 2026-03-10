import { Sequelize } from 'sequelize';

/**
 * Sequelize instance for the Appointment database.
 *
 * Credentials:
 *  host: 'localhost'
 *  user: 'root'
 *  password: '123456'
 *  database: 'Appointment'
 */

const sequelize = new Sequelize('Appointment', 'root', '123456', {
  host: 'localhost',
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
