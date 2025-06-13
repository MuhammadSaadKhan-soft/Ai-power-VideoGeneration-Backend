import express from 'express';
import generateRoutes from './routes/generate.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: "✅ AI Video Generation Backend is Running",
    author: "Muhammad Saad Khan",
    endpoints: {
      generate: "/api/generate"
    },
    version: "1.0.0",
    deployed: true,
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/generate', generateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
