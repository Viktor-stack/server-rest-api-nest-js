import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Role } from '../entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],

  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
}