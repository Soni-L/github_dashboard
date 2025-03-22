import express from "express";
import indexRoutes from "./routes/index.mjs";
import sequelize from "./config/database.mjs";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Sync database
sequelize.sync().then(() => {
  console.log("✅ Database synced.");
});

app.use("/", indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
