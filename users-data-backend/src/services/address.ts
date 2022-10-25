import Address from '../interfaces/address';
import AddressModel from '../models/address';
import { SimpleModel } from '../models/model';
import Service from './service';
import ValidationError from './validationError';

export class AddressService extends Service<Address> {
  constructor(model: SimpleModel<Address> = new AddressModel()) {
    super(model);
  }

  async create(obj: Address): Promise<number> {
    if (obj.cidade.length <= 3) {
      throw new ValidationError(
        'A cidade precisa ter pelo menos 4 caracteres'
      );
    }
    if (!obj.user_id) {
      throw new ValidationError(
        'Chave de referência para User inválida!'
      );
    }
    return super.create(obj);
  }
}