import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'User' })
  userName: string;

  @Column({ default: null })
  token: string;

  @Column({ default: '' })
  avatarSrc: string;

  @ManyToOne(() => Role, role => role.roles)
  roles: Role;
}