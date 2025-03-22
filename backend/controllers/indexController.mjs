import { User } from '../models/index.mjs';

export const home = (req, res) => {
  res.json({ message: 'Welcome to Express + Sequelize + PostgreSQL' });
};

export const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create user' });
  }
};
