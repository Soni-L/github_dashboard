import express from 'express';
import { home, getUsers, createUser } from '../controllers/indexController.mjs';

const router = express.Router();

router.get('/', home);
router.get('/users', getUsers);
router.post('/users', createUser);

export default router;