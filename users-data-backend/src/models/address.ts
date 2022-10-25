import { RowDataPacket } from 'mysql2';
import conn from '../database/connection';
import Address from '../interfaces/address';
import { Model } from './model';

export default class AddressModel implements Model<Address> {
  constructor(private connection = conn) { }
  async create(obj: Address) {
    await this.connection.execute(
      `INSERT INTO users_data_db.addresses(
        rua, nro, bairro, cidade,uf, user_id
      ) VALUES (?, ?, ?, ?, ?, ?);
    `, [obj.rua, obj.nro, obj.bairro, obj.cidade, obj.uf, obj.user_id]);
    return 0;
  }

  async list() {
    const result = await this.connection.execute(
      `SELECT 
      rua, nro, bairro, cidade 
      FROM users_data_db.addresses;`
    );
    const [addresses] = result;
    return addresses as Address[];
  }

  async find(id: number): Promise<Address | null> {
    const result = await this.connection.execute(
      `SELECT rua, nro, bairro, cidade
      FROM users_data_db.addresses as p WHERE p.id = ?;`, [id]
    );
    const [addresses] = result as RowDataPacket[];
    return addresses[0] as Address;
  }

  async update(_id: number, _obj: Address): Promise<void> {
    throw new Error('Not implemented error');
  }

  async delete(_id: number): Promise<void> {
    throw new Error('Not implemented error');
  }
}