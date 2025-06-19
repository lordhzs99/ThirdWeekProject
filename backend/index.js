import express from 'express';
import cors from 'cors';
import { PrismaClient } from './generated/prisma/index.js'
import routes from './routes/kudosRoutes.js'
import routescards from './routes/cardRoutes.js'
const app = express();
const PORT = 3000;
app.use(express.json())
app.use(cors());

app.use(routes)
app.use(routescards)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});