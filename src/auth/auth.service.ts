import { Injectable, Res, UploadedFile } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/auth-user.dto';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entity/role.entity';
import { Response } from 'express';
import { Country } from '../entity/country.entity';


@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>,
              @InjectRepository(Role) private roleRepository: Repository<Role>,
              @InjectRepository(Country) private countryRepos: Repository<Country>,
              private jwtService: JwtService) {
  }


  async login(authUserDto: AuthUserDto, @Res() res: Response) {
    try {
      const candidate = await this.userRepository.findOne({ email: authUserDto.email }, { relations: ['roleID'] });
      if (candidate) {
        const candidatePass = bcrypt.compareSync(authUserDto.password, candidate.password);
        if (candidatePass) {
          // Генирацыя токина
          const token = this.jwtService.sign({
            email: candidate.email,
            roleID: candidate.roleID._id,
          });
          return res.status(200).json({
            userID: candidate._id,
            email: candidate.email,
            firstName: candidate.firstName,
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
        message: 'Такой Email уже занят!!',
      });
    } else {
      const pass = authUserDto.password;
      const user = this.userRepository.create({
        email: authUserDto.email,
        avatarName: file.path,
        firstName: authUserDto.firstName,
        lastName: authUserDto.lastName,
        password: await bcrypt.hash(pass, 12),
        roleID: await this.roleRepository.findOne({ _id: 'f8ae1fb7-1b82-4dd4-8476-a1c0ed3f325a' }),
        countryID: await this.countryRepos.findOne({ _id: 'a1a6e6c5-daa4-4630-94ee-7773a6530a1d' }),
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
      user.firstName = userDto.firstName;
      user.avatarName = userDto.avatarName;
      await this.userRepository.save(user);
      return res.status(200).json({
        message: 'Данные успешно сохранены',
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