## Running the project

```diff
docker-compose up --build
```
The application will run at: http://localhost:8080

## Necessary improvements:

### Frontend

Improve responsiveness for small and various size large screens as well

Separate CSS in different files from the JSX (avoid inline styles)

Handle expired tokens, write a http request interceptor that triggers a refresh token flow when there is an auth failure due to expiration


### Backend

Provide Migration files instead of relying on sequelize sync for safer schema integrity

Do not save the github access token raw in the database, encrypt it instead with a secret key

Do not store secrets such as the github secret key directly in the repo files, inject them instead from secret vaults in the ENV

Optimize the docker builds (for both FE and BE) for production, do not serve them from preview modes or nodemon

