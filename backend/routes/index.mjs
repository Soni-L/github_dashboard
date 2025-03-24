import express from 'express';
import { getAccessToken, getStarredRepos } from '../controllers/githubController.mjs';

const router = express.Router();

router.get('/auth/getAccessToken', getAccessToken);

router.get('/getStarredRepos', getStarredRepos);

export default router;