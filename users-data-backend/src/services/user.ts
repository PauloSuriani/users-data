import User from '../interfaces/user';
import { SimpleModel } from '../models/model';
import UserModel from '../models/user';
import Service from './service';
import * as bcrypt from 'bcryptjs';

export class UserService extends Service<User> {
  constructor(model: SimpleModel<User> = new UserModel()) {
    super(model);
  }
  userModel = new UserModel();

  async create(obj: User): Promise<number> {
    // const Cryptr = require('cryptr');
    // const cryptr = new Cryptr('myTotalySecretKey');
    // console.log('user service', obj.password, hash);
    if (obj.password !== '' && obj.role !== 'custommer') {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(obj.password as string, salt);
  
      obj.password = hash;
  
      console.log('user service obj.password', obj.password);
    }

    if (obj.role === 'custommer') {
      obj.password = '';
    }

​
    // if (obj.contato.length <= 3) {
    //   throw new Error('O nome precisa ter pelo menos 4 caracteres');
    // }
    return super.create(obj);
  }

  async listBySellerId(id: number) {
    const custommers = await this.userModel.listBySellerId(id);
    return custommers;
  }
}