import express, { Application, Request, Response, NextFunction } from 'express'
import { userRoutes } from './server/user-routes';
import { taskRoutes } from './server/task-routes';
import { projectRoutes } from './server/project-routes';
import bodyParser from 'body-parser';
import cors from 'cors'
import { getDatabase } from './db/db';
import 'dotenv/config'

const app: Application = express();

const PORT = process.env.PORT || 4000

app.use(bodyParser.json({}))
app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
}))

app.use('/api/task', taskRoutes)
app.use('/api/users', userRoutes)
app.use('/api/project', projectRoutes)
app.get('/', (req, res) => {
    res.send('Hello World');
})
// app.use('/api/auth', authRoutes)

app.listen(PORT, async () => {
    console.log(`Server running on Port ${PORT}`);
})
