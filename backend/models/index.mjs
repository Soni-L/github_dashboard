import sequelize from '../config/database.mjs';
import User from './user.mjs';

// Initialize models
await sequelize.sync(); // Auto creates tables if they don't exist

export { sequelize, User };
