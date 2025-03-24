import GithubToken from "../models/GithubToken.mjs";
import StarredRepository from "../models/StarredRepository.mjs";
import CronJob from "../models/CronJob.mjs";
import fetch from "node-fetch";
import { subYears, formatISO, parseISO, startOfDay } from "date-fns";

const GITHUB_API = "https://api.github.com";

async function fetchStarredRepos(token) {
  const res = await fetch(`${GITHUB_API}/user/starred`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok ? res.json() : [];
}

async function fetchCommitStats(owner, repo, token) {
  const sinceDate = startOfDay(subYears(new Date(), 1)).toISOString(); // 1 year ago at  00:00:00 hours
  const commitsEndpoint = `https://api.github.com/repos/${owner}/${repo}/commits?since=${sinceDate}&per_page=100`;

  let page = 1;
  let allCommits = [];
  let hasNextPage = true;

  // Fetch all pages of commits
  while (hasNextPage) {
    const res = await fetch(`${commitsEndpoint}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch commits: ${res.status}`);
      break;
    }

    const commits = await res.json();
    allCommits = allCommits.concat(commits);

    // If less than 100 commits returned, it's the last page
    hasNextPage = commits.length === 100;
    page += 1;
  }

  // Bin commits by day
  const dailyMap = {};
  allCommits.forEach((commit) => {
    const date = formatISO(parseISO(commit.commit.author.date), {
      representation: "date",
    });
    dailyMap[date] = (dailyMap[date] || 0) + 1;
  });

  // Prepare daily array
  const daily = Object.entries(dailyMap).map(([date, commits]) => ({
    date,
    commits,
  }));
  const total_commits = allCommits.length;
  const max_daily_commits = Math.max(...daily.map((day) => day.commits), 0);

  return {
    total_commits,
    max_daily_commits,
    daily,
    sinceDate: formatISO(parseISO(sinceDate), { representation: "date" }),
    fromDate: formatISO(new Date(), { representation: "date" }),
  };
}

export async function syncStarredRepos() {
  const jobName = "syncStarredRepos";

  // Check if job is already running
  const job = await CronJob.findOne({ where: { job_name: jobName } });

  if (job && job.job_status === "RUNNING") {
    console.log(`🔁 Job ${jobName} is already running`);
    return;
  }

  // Mark job as running
  await CronJob.upsert({ job_name: jobName, job_status: "RUNNING" });

  const users = await GithubToken.findAll();

  for (const user of users) {
    const { username, access_token } = user;
    console.log(`🔄 Syncing starred repos for ${username}`);

    try {
      const starredRepos = await fetchStarredRepos(access_token);
      for (const repo of starredRepos) {
        const commitData = await fetchCommitStats(
          repo.owner.login,
          repo.name,
          access_token
        );

        await StarredRepository.upsert({
          username,
          repo_link: repo.full_name,
          commit_data: commitData,
        });
      }
    } catch (err) {
      console.error(`❌ Error syncing ${username}:`, err.message);
    }
  }

  // ✅ Mark job as complete
  await CronJob.upsert({ job_name: jobName, job_status: "RUN_COMPLETE" });
  console.log(`✅ Synced starred repos`);
}
