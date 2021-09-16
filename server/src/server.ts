import 'reflect-metadata';
require('dotenv').config({ path: '../.env' });
import express, { Application, RequestHandler } from 'express';
import { createConnection } from 'typeorm';
import morgan from 'morgan';
import trim from './components/middleware/trim';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const PORT = process.env.PORT || 4000;

const app: Application = express();

app.use(express.static('public'));
app.use(express.json() as RequestHandler);
app.use(morgan('dev'));
app.use(trim);
//to parse the json data
app.use(express.json());
app.use(morgan('dev'));
app.use(trim);
app.use(cookieParser());
//this allows us to write cookies ,
//origin is where cookies can be written
//options allows to send a request before
// a request
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);

require('./routes/auth-routes')(app);
require('./routes/user-routes')(app);
require('./routes/project-routes')(app);
require('./routes/link-routes')(app);

app.listen(PORT, async () => {
  console.log(`Server running on Port ${PORT} 🚀 🚀 🚀 `);
  try {
    await createConnection();
    console.log('Database connected 🤖');
  } catch (err: any) {
    console.log(err);
  }
});
