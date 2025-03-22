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

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
      {!value ? (
        <button
          style={{
            backgroundColor: "green",
            padding: "8px",
            borderRadius: "8px",
            width: "200px",
            cursor: "pointer",
          }}
          onClick={loginWithGithub}
        >
          Login with Github
        </button>
      ) : (
        <div style={{width: '100%'}}>
          <nav style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}} >
            <button
              style={{
                backgroundColor: "red",
                padding: "8px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => {
                removeValue();
                window.location.reload();
              }}
            >
              Logout
            </button>
          </nav>
          You are logged in
        </div>
      )}
    </div>
  );
}

export default App;
