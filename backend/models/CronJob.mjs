import { DataTypes } from 'sequelize';
import sequelize from '../config/database.mjs';

const CronJob = sequelize.define('CronJob', {
  job_name: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  job_status: {
    type: DataTypes.ENUM('RUNNING', 'RUN_COMPLETE'),
    allowNull: false,
  },
}, {
  tableName: 'cron_jobs',
  timestamps: true,
});

export default CronJob;
