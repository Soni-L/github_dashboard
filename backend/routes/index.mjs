import express from 'express';
import { home, getUsers, createUser } from '../controllers/indexController.mjs';
import { getAccessToken } from '../controllers/githubController.mjs';

const router = express.Router();

router.get('/', home);
router.get('/users', getUsers);
router.post('/users', createUser);

router.post('/auth/github', getAccessToken);

export default router;