import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const GithubAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    const getAccessToken = async () => {
      try {
        await fetch(
          `${BACKEND_URL}/auth/getAccessToken?code=${codeParam}`,
          {
            method: "GET",
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.access_token) {
              window.localStorage.setItem(
                'github_access_token',
                data.access_token
              );
              navigate("/", { replace: true });
            }
          });
      } catch (error) {
        console.error(error);
      }
    };
    getAccessToken();
  }, []);

  return <></>;
};

export default GithubAuth;
