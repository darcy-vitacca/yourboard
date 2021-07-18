import { Length } from 'class-validator';
import {
  Entity as TOEntity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Generated,
} from 'typeorm';
import Entity from './Entity';
import User from './User';
import Project from './Project';
import Subfolder from './Subfolder';

@TOEntity('links')
export default class Link extends Entity {
  constructor(link: Partial<Link>) {
    super();
    Object.assign(this, link);
  }
  @Index()
  @PrimaryGeneratedColumn('uuid')
  link_id: string;

  @Index()
  @Column({
    nullable: true,
  })
  url_name: string;

  @Index()
  @Column('text')
  url: string;

  @Index()
  @Column({
    nullable: true,
  })
  url_image: string;

  @Column()
  user_id: string;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;

  @Column()
  project_id: string;
  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'project_id' })
  project: Project;

  @Column()
  subfolder_id: string;
  @ManyToOne(() => Subfolder, (subfolder: Subfolder) => subfolder.links)
  @JoinColumn({ name: 'subfolder_id', referencedColumnName: 'subfolder_id' })
  subfolder: Subfolder;

  @Index()
  @Column({
    nullable: true,
  })
  clicked: number;

  @Index()
  @Column()
  position: number;
}
