import React from "react";
import ContributionHeatmap from "./ContributionHeatmap/ContributionHeatmap";

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
        paddingTop: "2px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <h4 style={{ margin: "0", color: "gold" }}>
        Starred repos commit charts
      </h4>

      {starredReposStats && starredReposStats?.length > 0 ? (
        starredReposStats.map((repoStats: RepoStats) => (
          <div>
            <h5 style={{ margin: 0, padding: "8px 0" }}>
              {repoStats.repo_link}
            </h5>
            <ContributionHeatmap data={repoStats.commit_data.daily} />
          </div>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "8px",
            gap: "8px",
          }}
        >
          <h4 style={{ margin: 0, color: "red" }}>
            No starred repo stats available
          </h4>
          <h5 style={{ margin: 0 }}>Wait a bit and refresh the page!</h5>
        </div>
      )}
    </div>
  );
};

export default RepoStatsCard;
