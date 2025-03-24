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

interface CommitsVizProps {
  repoStats: RepoStats;
}

const CommitsViz: React.FC<CommitsVizProps> = ({ repoStats }) => {
  // Implement your component logic here
  console.log(repoStats);
  return <div>{/* Render your component UI here */}</div>;
};

export default CommitsViz;
