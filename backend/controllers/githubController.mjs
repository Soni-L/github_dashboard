import fetch from "node-fetch";
import GithubToken from "../models/GithubToken.mjs";
import dotenv from "dotenv";

dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

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
