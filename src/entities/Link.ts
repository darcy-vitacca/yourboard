import { Length } from 'class-validator';
import {
  Entity as TOEntity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;

  @ManyToOne(() => Project, (project) => project.links)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'project_id' })
  project: Project;

  @ManyToOne(() => Subfolder, (subfolder) => subfolder.links)
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
