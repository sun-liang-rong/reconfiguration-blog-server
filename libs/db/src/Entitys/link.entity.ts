import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class Link extends Base {
  @Column()
  title: string;
  @Column()
  alink: string;
  @Column()
  describe: string;
  @Column()
  cover: string;
}
