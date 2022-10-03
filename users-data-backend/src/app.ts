import express, { NextFunction, Request, Response } from 'express';
import BaseHTTPError from './errors/httpError';
// import addressRouter from './routes/address';
import userRouter from './routes/user';

const app = express();

app.use(express.json());

app.use(userRouter);
// app.use(addressRouter);

app.use((err: BaseHTTPError, _: Request, res: Response, __: NextFunction) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  // eslint-disable-next-line no-console
  console.error(err.message);
  return res.status(500).json({ message: 'Erro interno' });
});

export default app;