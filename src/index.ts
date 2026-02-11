import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRoutes from "./routes/task.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from './middlewares/errorHandler.js';
import { authenticateToken } from './middlewares/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", authenticateToken, taskRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})

