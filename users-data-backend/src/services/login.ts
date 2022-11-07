import * as bcrypt from 'bcryptjs';
import User from '../interfaces/user';
import Login from '../interfaces/login'
import UserModel from '../models/user';
import { SimpleModel } from '../models/model';
import Service from './service';
import ValidationError from './validationError';
import * as JWT from 'jsonwebtoken';
import { readFileSync } from 'fs';

export class LoginService extends Service<Login> {

  constructor(model: SimpleModel<User> = new UserModel()) {
    super(model);
  }
  userModel = new UserModel();

  async login(obj: Login) {

    if (!obj.password) {
      throw new ValidationError('Formato de senha inválido');
    }
    
    if (!obj.email?.includes('@')) {
      throw new ValidationError('Formato de email inválido');
    }

    let result = await this.userModel.login(obj.email as string);
    
    if (!result[0]) {
      throw new ValidationError('Nenhum Usuário Encontrado para este Email');
    } 

    // console.log(obj.password, result[0].password);
    const newResult = (result as [User]).filter(ob => ob.password !== '');
    console.log('newResult: ', newResult);

    if (!bcrypt.compareSync(obj.password, newResult[0].password)) {
      throw new ValidationError('Password incorreto!');
    }

    const email = newResult[0].email;
    
    const jwtSecret = readFileSync('jwt.evaluation.key', 'utf8');
    const newToken = JWT.sign({ email }, jwtSecret, {
      expiresIn: '45m',
      algorithm: 'HS256',
    });

    return { 
      user: { 
        id: newResult[0].id,
        email: newResult[0].email,
        role: newResult[0].role,
        contato: newResult[0].contato,
      },
      token: newToken
    } 
  }


  async tokenVerify (token: string): Promise<{}> {
    const jwtSecret = readFileSync('jwt.evaluation.key', 'utf8');
    const { email } = JWT.verify(token, jwtSecret) as JWT.JwtPayload;
    let result = await this.userModel.login(email);
    
    if (!result[0]) {
      throw new ValidationError('Nenhum Usuário Encontrado para este Email');
    } 

    const userFind = (result as [User]).filter(ob => ob.password !== '');
    console.log('tokenVerify service: ', userFind, email);

    if (!userFind[0]) throw new Error('Invalid token!');

    return { 
      loggedOn: { 
        id: userFind[0].id,
        email: userFind[0].email,
        role: userFind[0].role,
      }
    } 
  }

}