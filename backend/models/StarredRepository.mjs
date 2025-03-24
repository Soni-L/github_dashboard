import { DataTypes } from 'sequelize';
import sequelize from '../config/database.mjs';

const StarredRepository = sequelize.define('StarredRepository', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  repo_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  commit_data: {
    type: DataTypes.JSONB,  // PostgreSQL JSONB for flexibility
    allowNull: false,
  }
}, {
  tableName: 'starred_repositories',
  timestamps: true,
  indexes: [{ unique: true, fields: ['username', 'repo_link'] }]
});

export default StarredRepository;
