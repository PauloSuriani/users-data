import { NextFunction, Request, Response } from 'express';
import BadRequest from '../errors/badRequest';
import NotFound from '../errors/notFound';
import UserInterface from '../interfaces/user';
import AddressInterface from '../interfaces/address'
import { AddressService } from '../services/address';
import { UserService } from '../services/user';

export async function create(req: Request, res: Response, next: NextFunction) {
  const { razao_social, nome_fantasia, contato, telefone, cnpj, email, role } = req.body as UserInterface;
  const { rua, nro, bairro, cidade, uf } = req.body as AddressInterface;
  const userService = new UserService();
  const addressService = new AddressService();
  try {
    if (contato === undefined) {
      throw new BadRequest('Você precisa enviar o nome da pessoa');
    }
    const user_id:number = await userService.create({ razao_social, nome_fantasia, contato, telefone, cnpj, email, role });
    console.log('resultado da model', user_id, typeof user_id);
    if(typeof user_id == "number"){
      await addressService.create({ rua, nro, bairro, cidade, uf, user_id});
    }
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