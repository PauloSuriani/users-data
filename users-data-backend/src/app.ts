import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import BaseHTTPError from './errors/httpError';
import userRouter from './routes/user';
import addressRouter from './routes/address';
import loginRouter from './routes/login';

const app = express();

// app.use(cors);
app.use(cors({ origin: 'http://localhost:5173'}));
// app.use(cors({ origin: 'http://localhost:4173'}));

app.use(express.json());

app.use(userRouter);
app.use(addressRouter);
app.use(loginRouter);

app.use((err: BaseHTTPError, _: Request, res: Response, __: NextFunction) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  // eslint-disable-next-line no-console
  console.error(err.message);
  return res.status(500).json({ message: 'Erro interno' });
});

export default app;