import { Length } from 'class-validator';
import {
  Entity as TOEntity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Entity from './Entity';
import Project from './Project';
import Link from './Link';

@TOEntity('projects')
export default class Subfolder extends Entity {
  constructor(subfolder: Partial<Subfolder>) {
    super();
    Object.assign(this, subfolder);
  }
  @Index()
  @Column({
    nullable: true,
  })
  subfolder_image: string;

  @Index()
  @Column()
  position: number;

  @ManyToOne(() => Project, (project) => project.subfolders)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'project_id' })
  project: Project;

  @OneToMany(() => Link, (link) => link.subfolder)
  links: Link[];
}
