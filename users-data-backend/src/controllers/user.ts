import { NextFunction, Request, Response } from 'express';
import BadRequest from '../errors/badRequest';
import NotFound from '../errors/notFound';
import UserInterface from '../interfaces/user';
import AddressInterface from '../interfaces/address'
import { AddressService } from '../services/address';
import { UserService } from '../services/user';

export async function create(req: Request, res: Response, next: NextFunction) {
  const { razao_social, nome_fantasia, contato, telefone, cnpj, email, role, password, seller_id } = req.body as UserInterface;
  const { rua, nro, bairro, cidade, uf } = req.body as AddressInterface;
  const userService = new UserService();
  const addressService = new AddressService();
  try {
    if (contato === undefined) {
      throw new BadRequest('Você precisa enviar o nome da pessoa');
    }
    const user_id:number = await userService.create({ razao_social, nome_fantasia, contato, telefone, cnpj, email, role, password, seller_id });
    console.log('user Controller create: ', user_id);
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
  let formatedId = id.slice(id.length -1);
  if (!id.slice(id.length -2).includes(':')){
    formatedId = id.slice(id.length -2);
  }
  console.log('user controller find: ', id.slice(id.length -1), id.slice(id.length -2), id.slice(id.length -3));
  try {
    if (id === undefined) {
      throw new BadRequest('Você precisa enviar o id da pesquisa');
    }
    const n = parseInt(formatedId);
    console.log('id: ', n);
    const obj = await userService.find(n);
    console.log('obj: ', obj);
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

export async function update(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const userService = new UserService();
  const addressService = new AddressService();
  let formatedId = id.slice(id.length -1);
  if (!id.slice(id.length -2).includes(':')){
    formatedId = id.slice(id.length -2);
  }
  const { razao_social, nome_fantasia, contato, telefone, cnpj, email, role, password, seller_id} = req.body as UserInterface;
  const { rua, nro, bairro, cidade, uf } = req.body as AddressInterface;
  try {
    if (id === undefined) {
      throw new BadRequest('Você precisa enviar o id da exclusão');
    }
    const n = parseInt(formatedId);
    console.log('id: ', n);
    await userService.update(n, {razao_social, nome_fantasia, contato, telefone, cnpj, email, role, password, seller_id});
    await addressService.update(n, { rua, nro, bairro, cidade, uf, user_id: n});
    res.status(200).json();
  } catch (err) {
    next(err);
  }
}

export async function erase(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const userService = new UserService();
  let formatedId = id.slice(id.length -1);
  if (!id.slice(id.length -2).includes(':')){
    formatedId = id.slice(id.length -2);
  }
  try {
    if (id === undefined) {
      throw new BadRequest('Você precisa enviar o id da exclusão');
    }
    const n = parseInt(formatedId);
    console.log('id: ', n);
    await userService.delete(n);
    res.status(200).json();
  } catch (err) {
    next(err);
  }
}

export async function listBySellerId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const userService = new UserService();
  let formatedId = id.slice(id.length -1);
  if (!id.slice(id.length -2).includes(':')){
    formatedId = id.slice(id.length -2);
  }
  try {
    if (id === undefined) {
      throw new BadRequest('Você precisa enviar o id da busca');
    }
    const n = parseInt(formatedId);
    const userList = await userService.listBySellerId(n);
    res.status(200).json(userList);
  } catch (err) {
    next(err);
  }
}
