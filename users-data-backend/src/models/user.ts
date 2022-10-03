import { RowDataPacket } from 'mysql2';
import conn from '../database/connection';
import User from '../interfaces/user';
import { SimpleModel } from './model';

export default class UserModel implements SimpleModel<User> {
  constructor(private connection = conn) { }
  async create(obj: User) {
    await this.connection.execute(
      `INSERT INTO users_data_db.users(
        name
      ) VALUES (?);`,
      [obj.name]
    );
  }

  async list() {
    const result = await this.connection.execute(
      `SELECT *
      FROM users_data_db.users;`
    );
    const [users] = result;
    return users as User[];
  }

  async find(id: number): Promise<User | null> {
    const result = await this.connection.execute(
      `SELECT name
      FROM users_data_db.users as p WHERE p.id = ?;`, [id]
    );
    const [users] = result as RowDataPacket[];
    return users[0] as User;
  }
}