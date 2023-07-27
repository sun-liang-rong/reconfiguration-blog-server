import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Base {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  update_at: Date;
}
