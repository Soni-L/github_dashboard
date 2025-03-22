import express from "express";
import indexRoutes from "./routes/index.mjs";
import sequelize from "./config/database.mjs";

const app = express();
app.use(express.json());

// Sync database
sequelize.sync().then(() => {
  console.log("✅ Database synced.");
});

app.use("/", indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
