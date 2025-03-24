import { useEffect, useState } from "react";
import "./App.css";
import { useLocalStorage } from "usehooks-ts";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import StarredReposCard from "./components/StarredReposCard/StarredReposCard";
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
  const [starredRepoStats, setStarredRepoStats] = useState<RepoStats[] | null>(
    null
  );

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
          setStarredRepoStats(data);
        })
        .catch((error) => {
          console.error("Error fetching repo stats:", error);
        });
    }
  }, [value]);

  console.log(starredRepoStats);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "16px",
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
              borderBottom: "1px solid",
              padding: "8px",
            }}
          >
            <button
              style={{
                backgroundColor: "red",
                padding: "8px",
                borderRadius: "8px",
                cursor: "pointer",
                minWidth: "100px",
              }}
              onClick={() => {
                removeValue();
                window.location.reload();
              }}
            >
              Disconnect from Github
            </button>
          </nav>
          <div style={{ display: "flex", gap: "16px" }}>
            {userData && <ProfileCard userData={userData} />}
            {starredRepos && <StarredReposCard starredRepos={starredRepos} />}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
