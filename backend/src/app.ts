import express, { NextFunction, Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

const app = express();
dotenv.config(); //Reads .env file and makes it accessible via process.env

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

const connectToDB = async () => {
  try {
    await pool.connect();
  } catch (err) {
    console.log(err);
  }
};
connectToDB();

app.get('/test', (req: Request, res: Response, next: NextFunction) => {
  const a = pool
    .query('select * from users')
    .then((response) => res.send(response.rows));
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
