import { NextFunction, Request, Response } from 'express';
import BadRequest from '../errors/badRequest';
import NotFound from '../errors/notFound';
import UserInterface from '../interfaces/user';
import { UserService } from '../services/user';

export async function create(req: Request, res: Response, next: NextFunction) {
  const { contact } = req.body as UserInterface;
  const userService = new UserService();
  try {
    if (contact === undefined) {
      throw new BadRequest('Você precisa enviar o nome da pessoa');
    }
    await userService.create({ contact });
    res.status(201).send();
  } catch (err) {
    next(err);
  }
}

export async function find(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const userService = new UserService();
  try {
    if (id === undefined) {
      throw new BadRequest('Você precisa enviar o id da pesquisa');
    }
    const obj = await userService.find(parseInt(id, 10));
    if (!obj) {
      throw new NotFound('Pessoa não encontrada');
    }
    res.status(200).json(obj);
  } catch (err) {
    next(err);
  }
}

export async function list(_req: Request, res: Response, next: NextFunction) {
  const userService = new UserService();
  try {
    const userList = await userService.list();
    res.json(userList);
  } catch (err) {
    next(err);
  }
}