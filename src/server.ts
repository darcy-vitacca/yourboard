import 'dotenv/config';
import express, { Application, RequestHandler } from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import morgan from 'morgan';
import { authRoutes } from './routes/auth-routes';
import { userRoutes } from './routes/user-routes';
import { projectRoutes } from './routes/project-routes';
import { linkRoutes } from './routes/link-routes';

// import cors from 'cors'
const PORT = process.env.PORT || 4000;

const app: Application = express();
app.use(express.json() as RequestHandler);
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('Hello World'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/link', linkRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on Port ${PORT}`);
  try {
    await createConnection();
    console.log('Databased connected');
  } catch (err) {
    console.log(err);
  }
});
//
// app.use(cors({
//     credentials: true,
//     origin: process.env.ORIGIN,
//     optionsSuccessStatus: 200
// }))
//

// app.get('/', (req, res) => {
//     res.send('Hello World');
// })
//
