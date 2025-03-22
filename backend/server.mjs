import express from 'express';
import indexRoutes from './routes/index.mjs';

const app = express();
app.use(express.json());

app.use('/', indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
