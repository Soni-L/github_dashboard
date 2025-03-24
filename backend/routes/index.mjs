import express from "express";
import {
  getAccessToken,
  getStarredRepos,
} from "../controllers/githubController.mjs";
import { getCronJobStatus } from "../controllers/cronJobController.mjs";

const router = express.Router();

router.get("/auth/getAccessToken", getAccessToken);

router.get("/getStarredRepos", getStarredRepos);

router.get("/getCronJobStatus", getCronJobStatus);

export default router;
