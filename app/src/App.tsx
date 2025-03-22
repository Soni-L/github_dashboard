import "./App.css";

const loginWithGithub = () => {
  window.location.assign(
    `https://github.com/login/oauth/authorize?client_id=${
      import.meta.env.VITE_APP_GITHUB_CLIENT_ID
    }&scope=repo`
  );
};

function App() {
  return (
    <div>
      <button onClick={loginWithGithub}>Login with Github</button>
    </div>
  );
}

export default App;
