import { Injectable, Res, UploadedFile } from '@nestjs/common';
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
            userID: candidate._id,
          });
          return res.status(200).json({
            userID: candidate._id,
            email: candidate.email,
            userName: candidate.userName,
            avatarSrc: candidate.avatarName,
            roleID: await this.roleRepository.findOne(authUserDto.role_id),
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


  async register(authUserDto: AuthUserDto, @Res() res: Response, @UploadedFile() file) {
    const candidate = await this.userRepository.findOne({ email: authUserDto.email });
    if (candidate) {
      return res.status(409).json({
        message: 'Такой Email уже зфнят!!',
      });
    } else {
      const pass = authUserDto.password;
      const user = this.userRepository.create({
        email: authUserDto.email,
        avatarName: file.path,
        userName: authUserDto.userName,
        password: await bcrypt.hash(pass, 12),
        roleID: await this.roleRepository.findOne({ _id: '0d2a4b9e-38ab-4a32-b741-51fc68947035' }),
      });
      try {
        await this.userRepository.save(user);
        return res.status(201).json({
          message: 'Пользователь создан',
          user,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }


  async getAllUser(@Res() res: Response) {
    const users = await this.userRepository.find({ relations: ['roleID'] });
    return res.status(200).json(users);
  }


  async getByIdUser(id: string) {
    const user = await this.userRepository.findOne(id, { relations: ['roleID'] });
    if (user) {
      return user;
    } else {
      return {
        message: 'Такого пользователя нет!!!',
      };
    }
  }

  async updateUser(userID: string, userDto: AuthUserDto, @Res() res: Response): Promise<Response<AuthUserDto>> {
    try {
      let user = await this.userRepository.findOne(userID);
      user.userName = userDto.userName;
      user.avatarName = userDto.avatarName;
      await this.userRepository.save(user);
      return res.status(200).json({
        message: 'Даные успешно сохронены',
        user,
      });
    } catch (e) {
      console.log(e);
    }
  }


  async updateToken(token: string, userID: string) {
    const user = await this.userRepository.findOne(userID);
    user.token = token;
    return this.userRepository.save(user);
  }

  async updateRole(roleID: number, userID: number) {
    debugger
    const user = await this.userRepository.findOne(userID, { relations: ['roleID'] });
    user.roleID = await this.roleRepository.findOne(roleID);
    return await this.userRepository.save(user);
  }


}