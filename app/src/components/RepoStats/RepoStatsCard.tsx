import React from "react";
import CommitsViz from "./CommitsViz";

interface RepoStats {
  id: string;
  username: string;
  repo_link: string;
  commit_data: {
    daily: { date: string; commits: number }[];
    max_daily_commits: number;
    total_commits: number;
  };
}

interface RepoStatsCardProps {
  starredReposStats: RepoStats[] | null;
}

const RepoStatsCard: React.FC<RepoStatsCardProps> = ({ starredReposStats }) => {
  return (
    <div
      style={{
        border: "1px solid",
        borderRadius: "10px",
        padding: "8px",
      }}
    >
      <h4 style={{ margin: 0, color: "gold" }}>Starred repos commit charts</h4>
      {starredReposStats?.length &&
        starredReposStats.map((repoStats: RepoStats) => (
          <CommitsViz repoStats={repoStats} />
        ))}
    </div>
  );
};

export default RepoStatsCard;
