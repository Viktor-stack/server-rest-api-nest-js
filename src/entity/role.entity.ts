import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';


@Entity()
export class Role {

  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  roleName: string;

  @OneToMany(() => User, User => User.roleID)
  roleID: User[];

}