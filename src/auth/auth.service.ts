import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from './dto/auth-user.dto';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Role } from '../entity/role.entity';


@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>,
              @InjectRepository(Role) private roleRepository: Repository<Role>) {
  }

  async register(authUserDto: AuthUserDto) {
    const candidate = await this.userRepository.findOne({ email: authUserDto.email });
    if (candidate) {
      return { message: 'Такой Email Заят!!!' };
    } else {
      const pass = authUserDto.password;
      const user = this.userRepository.create({
        email: authUserDto.email,
        password: await bcrypt.hash(pass, 12),
        roles: await this.roleRepository.findOne({ id: 3 }),
      });
      return await this.userRepository.save(user);
    }
  }


  getAllUser() {
    return this.userRepository.find({ relations: ['roles'] });
  }


  async getByIdUser(id: string) {
    const user = await this.userRepository.findOne(id, { relations: ['roles'] });
    if (user) {
      return user;
    } else {
      return {
        message: 'Такого пользователя нет!!!',
      };
    }
  }

  async updateRole(roleID: number, userID: number) {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        roles: await this.roleRepository.findOne({ id: roleID }),
      })
      .execute();
    return await this.userRepository.findOne(userID, { relations: ['roles'] });
  }


}