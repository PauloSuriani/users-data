import { NextFunction, Request, Response } from 'express';
import BadRequest from '../errors/badRequest';
import NotFound from '../errors/notFound';
import Login from '../interfaces/login';
import { LoginService } from '../services/login';
import ValidationError from '../services/validationError';

export async function login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const {email, password } = req.body as Login;
  const loginService = new LoginService();
  try {
    if (email === undefined || password === undefined) {
      throw new BadRequest('Você precisa informar email e senha!');
    }
    const loggedUser = await loginService.login({ email, password });

    console.log('login controller: ', loggedUser);

    return res.status(200).json({"status": 200, "message": loggedUser});
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new BadRequest(err.message));
    } else {
      next(err);
    }
  }

}

export async function tokenVerify (req: Request, res: Response, next: NextFunction): Promise<Response | void>  {
  
  const { authorization: token } = req.headers;
  const loginService = new LoginService();
  
  if (!token) return res.status(404).json('Invalid token');
  try {
    const loggedUser = await loginService.tokenVerify(token);
    console.log('loginverify controller: ', req.headers, token, loggedUser);
    return res.status(200).json(loggedUser);
  } catch (error: unknown) {
    return next();
  }
}