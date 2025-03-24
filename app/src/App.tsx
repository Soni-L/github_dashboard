import { useEffect, useState } from "react";
import "./App.css";
import { useLocalStorage } from "usehooks-ts";

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
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [starredRepos, setStarredRepos] = useState<object | null>(null);

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
          // Do something with the user profile data
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
          // Do something with the user profile data
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [value]);

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
          <div style={{ display: "flex", gap: "8px" }}>
            {userData && (
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px",
                  border: "1px solid",
                  borderRadius: "8px",
                  gap: "8px",
                  width: "fit-content",
                  position: "relative",
                  paddingTop: "28px",
                }}
              >
                <h4
                  style={{
                    top: 0,
                    position: "absolute",
                    margin: "0",
                    whiteSpace: "nowrap",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    color: "gold",
                  }}
                >
                  Github user data
                </h4>
                <img
                  src={userData?.avatar_url || ""}
                  style={{ height: "200px", width: "200px" }}
                ></img>
                <p style={{ margin: "0" }}>
                  <strong>Name:</strong> {userData?.name}
                </p>
                <p style={{ margin: "0" }}>
                  <strong>Username:</strong> {userData?.login}
                </p>
                <p style={{ margin: "0" }}>
                  <strong>Email:</strong> {userData?.email}
                </p>
                <p style={{ margin: "0" }}>
                  <strong>Location:</strong> {userData?.location}
                </p>
              </section>
            )}

            {starredRepos && (
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "8px",
                  paddingTop: "2px",
                  border: "1px solid",
                  borderRadius: "8px",
                  gap: "8px",
                  width: "fit-content",
                }}
              >
                <h4 style={{ margin: 0, color: "gold" }}>
                  Starred repositories
                </h4>
              </section>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
