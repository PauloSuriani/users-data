import { RowDataPacket } from 'mysql2';
import conn from '../database/connection';
import User from '../interfaces/user';
import { SimpleModel } from './model';

type ResultSetHeader = {
  fieldCount?: string,
  affectedRows?: string,
  insertId?: number,
  info?: string,
  serverStatus?: string,
  warningStatus?: string
}

export default class UserModel implements SimpleModel<User> {
  constructor(private connection = conn) { }
  async create(obj: User) {
    const result = await this.connection.execute(
      `INSERT INTO users_data_db.users(razao_social, nome_fantasia, contato, telefone, cnpj, email, role, password, seller_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [obj.razao_social ? obj.razao_social : '(não cadastrada)', 
      obj.nome_fantasia ? obj.nome_fantasia : '(não cadastrado)', 
      obj.contato ? obj.contato : '(não cadastrado)', 
      obj.telefone ? obj.telefone : '(não cadastrado)', 
      obj.cnpj ? obj.cnpj : '(não cadastrado)', 
      obj.email ? obj.email : '(não cadastrado)', 
      obj.role ? obj.role : 'admin',
      obj.password,
      obj.seller_id]
    );
    const userIdResponse:ResultSetHeader = result[0] as ResultSetHeader;
    return userIdResponse.insertId;
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
      `SELECT *
       FROM users_data_db.users U, users_data_db.addresses A
       WHERE A.USER_ID = U.ID
       AND U.ID = ?;`, [id]
    );
    const [users] = result as RowDataPacket[];
    return users[0] as User;
  }

  async update(id: number, obj: User) {
    const result = await this.connection.execute(
      `UPDATE users_data_db.users
       SET razao_social = ?, nome_fantasia = ?, contato = ?,
          telefone = ?, cnpj = ?, email = ?, role = ?
       WHERE ID = ?;
       `,
      [obj.razao_social ? obj.razao_social : '(não cadastrada)', 
      obj.nome_fantasia ? obj.nome_fantasia : '(não cadastrado)', 
      obj.contato ? obj.contato : '(não cadastrado)', 
      obj.telefone ? obj.telefone : '(não cadastrado)', 
      obj.cnpj ? obj.cnpj : '(não cadastrado)', 
      obj.email ? obj.email : '(não cadastrado)', 
      obj.role ? obj.role : 'Admin',
      id]
    );
    const userIdResponse:ResultSetHeader = result[0] as ResultSetHeader;
    return userIdResponse.insertId;
  }

  async delete(id: number): Promise<void>{
    await this.connection.execute(
      `DELETE FROM users_data_db.addresses A
       WHERE A.USER_ID = ?;`, [id]
    );
    await this.connection.execute(
      `DELETE FROM users_data_db.users U
       WHERE U.ID = ?;`, [id]
    );
  }

  async login(email: string): Promise<RowDataPacket> {
    const result = await this.connection.execute(
      `SELECT *
       FROM users_data_db.users U
       WHERE U.EMAIL = ?;`, [email]
    );
    const [users] = result as RowDataPacket[];
    return users;
  }

  async listBySellerId(id: number) {
    const result = await this.connection.execute(
      `SELECT *
       FROM users_data_db.users U, users_data_db.addresses A
       WHERE A.USER_ID = U.ID
       AND U.SELLER_ID = ?;`, [id]
    );
    const [users] = result;
    return users as User[];
  }
}