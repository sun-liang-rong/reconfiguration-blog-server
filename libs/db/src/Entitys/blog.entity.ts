import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { Tag } from './tag.entity';

@Entity()
export class Blog extends Base {
  @Column({
    nullable: true,
  })
  title: string;
  @Column({
    nullable: true,
  })
  cover: string;
  @Column({
    nullable: true,
  })
  intrduce: string;
  @Column({
    nullable: true,
    type: 'text',
  })
  content: string;
  @Column({
    nullable: true,
    type: 'text',
  })
  htmlcontent: string;
  @ManyToOne((type) => Tag)
  tag: Tag;
  @Column({
    nullable: true,
  })
  state: boolean;
}
