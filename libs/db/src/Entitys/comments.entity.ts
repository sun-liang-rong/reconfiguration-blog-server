import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from 'libs/db/Entitys/base.entity';
import { Tag } from 'libs/db/Entitys/tag.entity';

@Entity()
export class Comments extends Base {
  @Column()
  aid: string;
  @Column()
  uid: string;
  @Column()
  comments_time: Date;
  @Column()
  comments_content: string;
}
