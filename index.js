import express from 'express';
import generateRoutes from './routes/generate.js';

import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/generate', generateRoutes);


const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
