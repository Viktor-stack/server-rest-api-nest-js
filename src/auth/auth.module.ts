import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Role } from '../entity/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 60 * 60 },
    }),
    MulterModule.register({
      dest: './upload',
    }),
  ],

  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {
}