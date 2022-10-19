import { RowDataPacket } from 'mysql2';
import conn from '../database/connection';
import User from '../interfaces/user';
import { SimpleModel } from './model';

export default class UserModel implements SimpleModel<User> {
  constructor(private connection = conn) { }
  async create(obj: User) {
    await this.connection.execute(
      `INSERT INTO users_data_db.users(razao_social, nome_fantasia, contato, fone, cnpj, email, role) 
       VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [obj.razao_social, obj.nome_fantasia, obj.contato, obj.telefone, obj.cnpj, obj.email, 'custommer']
    );
  }

  async list() {
    const result = await this.connection.execute(
      `SELECT *
       FROM users_data_db.users U, users_data_db.addresses A
       WHERE A.USER_ID = U.ID;`
    );
    const [users] = result;
    return users as User[];
  }

  async find(id: number): Promise<User | null> {
    const result = await this.connection.execute(
      `SELECT contato
       FROM users_data_db.users as p WHERE p.id = ?;`, [id]
    );
    const [users] = result as RowDataPacket[];
    return users[0] as User;
  }
}