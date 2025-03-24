import express from "express";
import indexRoutes from "./routes/index.mjs";
import sequelize from "./config/database.mjs";
import { syncStarredRepos } from './jobs/syncStarredRepos.mjs';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Sync database
await sequelize.sync().then(() => {
  console.log("✅ Database synced.");
});

app.use("/", indexRoutes);

const PORT = process.env.PORT || 3000;
await app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);

// Example using setInterval (configurable via .env)
const interval = process.env.SYNC_INTERVAL || 3600000; // 1 hour default

setImmediate(syncStarredRepos);
setInterval(syncStarredRepos, interval);
