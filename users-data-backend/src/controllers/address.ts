import { NextFunction, Request, Response } from 'express';
import BadRequest from '../errors/badRequest';
import NotFound from '../errors/notFound';
import Address from '../interfaces/address';
import { AddressService } from '../services/address';
import ValidationError from '../services/validationError';

export async function create(req: Request, res: Response, next: NextFunction) {
  const {rua, nro, bairro, cidade, uf, user_id } = req.body as Address;
  const addressService = new AddressService();
  try {
    if (cidade === undefined) {
      throw new BadRequest('Você precisa enviar o nome da cidade');
    }
    await addressService.create({ rua, nro, bairro, cidade, uf, user_id });
    res.status(201).send();
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new BadRequest(err.message));
    } else {
      next(err);
    }
  }
}

export async function find(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const addressService = new AddressService();
  try {
    if (id === undefined) {
      throw new BadRequest('Você precisa enviar o id da pesquisa');
    }
    const obj = await addressService.find(parseInt(id, 10));
    if (!obj) {
      throw new NotFound('Pessoa não encontrada');
    }
    res.status(200).json(obj);
  } catch (err) {
    next(err);
  }
}

export async function list(_req: Request, res: Response, next: NextFunction) {
  const addressService = new AddressService();
  try {
    const addressList = await addressService.list();
    res.json(addressList);
  } catch (err) {
    next(err);
  }
}