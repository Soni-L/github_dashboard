import fetch from "node-fetch";
import GithubToken from "../models/GithubToken.mjs";
import StarredRepository from "../models/StarredRepository.mjs";
import { syncStarredRepos } from "../jobs/syncStarredRepos.mjs";
import dotenv from "dotenv";

dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const runJobsForFirstTimeUser = async (username) => {
  try {
    const repoWithStats = await StarredRepository.findAll({
      where: { username: username },
    });
    if (repoWithStats.length === 0) {
      console.log("Run jobs for first time user");
      setImmediate(syncStarredRepos);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAccessToken = async (req, res) => {
  const { code } = req.query;
  const params = `?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}&scope=repo`;

  try {
    const response = await fetch(
      `https://github.com/login/oauth/access_token${params}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();
    const access_token = data.access_token;

    // Get the username
    const userResp = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });
    const userData = await userResp.json();
    const username = userData.login;

    // This is for simplicity of the demo, I run the jobs here if there is no data in the database for this user
    // this way you dont have to wait for the interval to run
    runJobsForFirstTimeUser(username);

    // Save or update the token
    await GithubToken.upsert({
      username,
      access_token,
    });

    res.json(data);
  } catch (err) {
    res.json(err);
  }
};

export const getStarredRepos = async (req, res) => {
  const { access_token } = req.query;

  try {
    // Verify the access token
    const verifyResp = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    if (verifyResp.status !== 200) {
      throw new Error("Invalid access token");
    }

    const data = await verifyResp.json();

    let repoWithStats = await StarredRepository.findAll({
      where: { username: data.login },
    });
    res.json(repoWithStats);
  } catch (err) {
    res.json({ error: err.message });
  }
};
