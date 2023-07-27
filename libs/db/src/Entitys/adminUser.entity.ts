import { Entity, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class AdminUser extends Base {
  @Column()
  username: string;

  @Column({
    select: false,
  })
  password: string;
  @Column()
  nickname: string;

  @Column()
  admingrade: number;
}
