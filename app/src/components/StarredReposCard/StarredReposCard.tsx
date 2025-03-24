import React from "react";

interface RepoData {
  id: string;
  full_name: string;
  private: boolean;
}

interface StarredReposCardProps {
  starredRepos: RepoData[] | null;
}

const StarredReposCard: React.FC<StarredReposCardProps> = ({
  starredRepos,
}) => {
  return (
    <section
      style={{
        padding: "8px",
        paddingTop: "2px",
        border: "1px solid",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h4 style={{ margin: 0, color: "gold" }}>Starred repositories</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
        }}
      >
        {starredRepos?.length ? (
          starredRepos?.map((repo: RepoData, index) => {
            return (
              <div
                key={repo.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px",
                  borderBottom:
                    starredRepos.length === index + 1 ? "none" : "1px solid",
                  gap: "8px",
                }}
              >
                <h5 style={{ margin: 0, color: "gold" }}>{repo.full_name}</h5>

                <p style={{ margin: "0" }}>
                  <strong>Owner:</strong> {repo.full_name.split("/")[0]}
                </p>

                <p style={{ margin: "0" }}>
                  <strong>Link:</strong>{" "}
                  <a
                    href={`https://github.com/${repo.full_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.full_name}
                  </a>
                </p>

                <p style={{ margin: "0" }}>
                  <strong>Private:</strong> {repo.private?.toString()}
                </p>
              </div>
            );
          })
        ) : (
          <p>No starred repositories</p>
        )}
      </div>
    </section>
  );
};

export default StarredReposCard;
