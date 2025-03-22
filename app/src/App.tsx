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

  console.log(value);
  return (
    <div>
      <button onClick={loginWithGithub}>Login with Github</button>
    </div>
  );
}

export default App;
