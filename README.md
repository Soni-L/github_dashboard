## Running the project

```diff
docker-compose up --build
```
The application will run at: http://localhost:8080

## Necessary improvements:

### Frontend

- Improve responsiveness for small and various size large screens as well

- Separate CSS in different files from the JSX (avoid inline styles)

- Handle expired tokens, write a http request interceptor that triggers a refresh token flow when there is an auth failure due to expiration

- Create a folder for Shared typescript types & interfaces and one for constants as well, do not redefine interfaces in several files and do the same thing for constants

- Add global error handler (error boundary) fallback page


### Backend

- Add global error hanlder middleware in order for the server not to crash during unhanlded errors escaped from one of the endpoints

- Create an additional timer job to handle refreshing of the tokens that are expired in the db

- Be mindful of hitting the github rate limits when scanning through many repos, do not run jobs too frequently, improve cron job to be more selective in reaping data

- Provide Migration files instead of relying on sequelize sync, for a safer DB schema integrity and to avoid data loss

- Do not save the github access token raw in the database, encrypt it instead with a secret key

- Do not store secrets such as the github secret key directly in the repo files, inject them instead from secret vaults in the ENV

- Optimize the docker builds (for both FE and BE) for production, do not serve them from preview modes or nodemon


