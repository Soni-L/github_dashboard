import { useEffect, useState } from "react";
import "./App.css";
import { useLocalStorage } from "usehooks-ts";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import StarredReposCard from "./components/StarredReposCard/StarredReposCard";
import RepoStatsCard from "./components/RepoStats/RepoStatsCard";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const loginWithGithub = () => {
  window.location.assign(
    `https://github.com/login/oauth/authorize?client_id=${
      import.meta.env.VITE_APP_GITHUB_CLIENT_ID
    }&scope=repo`
  );
};

function App() {
  const [value, , removeValue] = useLocalStorage("github_access_token", 0);
  interface UserData {
    avatar_url: string;
    name: string;
    login: string;
    email: string;
    location: string;
  }

  interface RepoData {
    id: string;
    full_name: string;
    private: boolean;
  }

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

  const [userData, setUserData] = useState<UserData | null>(null);
  const [starredRepos, setStarredRepos] = useState<RepoData[] | null>(null);
  const [starredReposStats, setStarredReposStats] = useState<
    RepoStats[] | null
  >(null);

  useEffect(() => {
    if (!value) {
      setUserData(null);
      setStarredRepos(null);
    } else {
      fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });

      fetch(`https://api.github.com/user/starred`, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setStarredRepos(data);
        })
        .catch((error) => {
          console.error("Error fetching starred repos:", error);
        });

      fetch(`${BACKEND_URL}/getStarredRepos?access_token=${value}`, {})
        .then((response) => response.json())
        .then((data) => {
          setStarredReposStats(data);
        })
        .catch((error) => {
          console.error("Error fetching repo stats:", error);
        });
    }
  }, [value]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "24px",
        padding: "16px",
      }}
    >
      {!value ? (
        <button
          style={{
            backgroundColor: "green",
            padding: "8px",
            borderRadius: "8px",
            width: "200px",
            height: "40px",
            cursor: "pointer",
            margin: "auto",
          }}
          onClick={loginWithGithub}
        >
          Login with Github
        </button>
      ) : (
        <>
          <nav
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
              width: "100%",
              margin: 0,
            }}
          >
            <button
              style={{
                backgroundColor: "red",
                padding: "8px",
                borderRadius: "8px",
                cursor: "pointer",
                width: "150px",
              }}
              onClick={() => {
                removeValue();
                window.location.reload();
              }}
            >
              Disconnect Github
            </button>
          </nav>
          <div className="card-container">
            {userData && <ProfileCard userData={userData} />}
            {starredRepos && <StarredReposCard starredRepos={starredRepos} />}
            {starredReposStats && (
              <RepoStatsCard starredReposStats={starredReposStats} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
