import User from '../interfaces/user';
import { SimpleModel } from '../models/model';
import UserModel from '../models/user';
import Service from './service';

export class UserService extends Service<User> {
  constructor(model: SimpleModel<User> = new UserModel()) {
    super(model);
  }

  async create(obj: User): Promise<void> {
    if (obj.name.length <= 3) {
      throw new Error('O nome precisa ter pelo menos 4 caracteres');
    }
    return super.create(obj);
  }
}