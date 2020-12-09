import {
  Column, CreateDateColumn,
  Entity,
  ManyToOne, ObjectIdColumn,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'User' })
  userName: string;

  @Column({ default: null })
  token: string;

  @Column({ default: '' })
  avatarName: string;

  @Column({ default: 0 })
  userPrice: number;

  @CreateDateColumn({ type: 'timestamp' })
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(() => Role, role => role.roleID)
  roleID: Role;
}