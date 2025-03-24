import { DataTypes } from 'sequelize';
import sequelize from '../config/database.mjs';

const GithubToken = sequelize.define('GithubToken', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  access_token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'github_tokens',
  timestamps: true,
});

export default GithubToken;
