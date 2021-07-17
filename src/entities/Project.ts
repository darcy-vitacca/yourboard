import { Length } from 'class-validator';
import {
  Entity as TOEntity,
  Column,
  Index,
  Generated,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Entity from './Entity';
import { Exclude } from 'class-transformer';
import User from './User';
import Link from './Link';
import Subfolder from './Subfolder';

@TOEntity('projects')
export default class Project extends Entity {
  constructor(project: Partial<Project>) {
    super();
    Object.assign(this, project);
  }

  @Index()
  @Generated('uuid')
  @Column()
  project_id: string;

  @Index()
  @Column({ unique: true })
  project_name: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' })
  user: User;

  @OneToMany(() => Link, (link) => link.project)
  links: Link[];

  @OneToMany(() => Subfolder, (subfolder) => subfolder.project)
  subfolders: Subfolder[];

  @Index()
  @Column({ unique: true })
  description: string;
}