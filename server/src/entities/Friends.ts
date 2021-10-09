import {
  Entity as TOEntity,
  Column,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Entity from './Entity';

@TOEntity('friends')
export default class Friend extends Entity {
  constructor(friend: Partial<Friend>) {
    super();
    Object.assign(this, friend);
  }
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  user_1_name: string;

  @Index()
  @Column()
  user_1_id: string;

  @Index()
  @Column()
  user_1_email: string;

  @Index()
  @Column({ nullable: true })
  user_2_name: string;

  @Index()
  @Column({ nullable: true })
  user_2_id: string;

  @Index()
  @Column()
  user_2_email: string;

  @Index()
  @Column({ nullable: true })
  project_id: string;

  @Index()
  @Column({
    nullable: true,
  })
  accepted: boolean;
}
