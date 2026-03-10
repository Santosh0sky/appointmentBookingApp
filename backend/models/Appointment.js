import { DataTypes } from 'sequelize';
import sequelize from '../utils/dbConnection.js';

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
}, {
  tableName: 'appointments',
  timestamps: true,
});

export default Appointment;
