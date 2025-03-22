import express from 'express';
import { home, getUsers } from '../controllers/indexController.mjs';

const router = express.Router();

router.get('/', home);
router.get('/users', getUsers);

export default router;
