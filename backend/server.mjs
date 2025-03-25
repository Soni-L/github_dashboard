import express from "express";
import indexRoutes from "./routes/index.mjs";
import sequelize from "./config/database.mjs";
import { syncStarredRepos } from "./jobs/syncStarredRepos.mjs";
import cors from "cors";

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 3000;

const app = express();
app.use(express.json());
app.use(cors());

// Retry connection and sync for sequential build fails in docker compose services with depends_on
async function connectAndSync(retries = MAX_RETRIES) {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL with Sequelize");

    await sequelize.sync();
    console.log("✅ Sequelize models synced");
  } catch (err) {
    console.error(`❌ DB connection/sync failed: ${err.message}`);
    if (retries > 0) {
      console.log(
        `🔄 Retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      return connectAndSync(retries - 1);
    } else {
      console.error("❌ Max retries reached. Exiting...");
      process.exit(1);
    }
  }
}

// Sync database
await connectAndSync();

app.use("/", indexRoutes);

const PORT = process.env.PORT || 3000;
await app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);

// Example using setInterval (configurable via .env)
const interval = process.env.SYNC_INTERVAL || 3600000; // 1 hour default

setInterval(syncStarredRepos, interval);
