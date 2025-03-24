import express from 'express';
import { getAccessToken } from '../controllers/githubController.mjs';

const router = express.Router();

router.get('/auth/getAccessToken', getAccessToken);

export default router;