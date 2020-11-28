import { Injectable, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/auth-user.dto';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entity/role.entity';
import { Response } from 'express';


@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>,
              @InjectRepository(Role) private roleRepository: Repository<Role>,
              private jwtService: JwtService) {
  }


  async login(authUserDto: AuthUserDto, @Res() res: Response) {
    try {
      const candidate = await this.userRepository.findOne({ email: authUserDto.email });
      if (candidate) {
        const candidatePass = bcrypt.compareSync(authUserDto.password, candidate.password);
        if (candidatePass) {
          // Генирацыя токина
          const token = this.jwtService.sign({
            email: candidate.email,
            userID: candidate.id,
          });
          const rolesID = await this.userRepository.findOne(candidate.id, { relations: ['roles'] });
          debugger
          return res.status(200).json({
            userID: candidate.id,
            userName: candidate.userName,
            email: candidate.email,
            avatarSrc: candidate.avatarSrc,
            roles: rolesID.roles.id,
            token: `Bearer ${token}`,
          });
        } else {
          res.status(401).json({
            message: 'Пароль не совпадает попробуйте снова!',
          });
        }
      } else {
        res.status(404).json({
          message: 'Такой пользователь не найден',
        });
      }
    } catch (e) {
      console.log('err: => ', e);
    }
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

  async updateToken(token: string, userID: string) {
    const user = await this.userRepository.findOne(userID);
    debugger
    user.token = token;
    return this.userRepository.save(user);
  }

  async updateRole(roleID: number, userID: number) {
    const user = await this.userRepository.findOne(userID);
    user.roles = await this.roleRepository.findOne(roleID);
    return this.userRepository.save(user);
  }


}