import { Length } from 'class-validator';
import {
  Entity as TOEntity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Entity from './Entity';
import Project from './Project';
import Link from './Link';
import { Exclude } from 'class-transformer';

@TOEntity('subfolders')
export default class Subfolder extends Entity {
  constructor(subfolder: Partial<Subfolder>) {
    super();
    Object.assign(this, subfolder);
  }
  @Index()
  @PrimaryGeneratedColumn('uuid')
  subfolder_id: string;

  @Column({
    nullable: true,
  })
  subfolder_image: string;

  @Column()
  position: number;

  @Column()
  project_id: string;
  @ManyToOne(() => Project, (project) => project.subfolders)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'project_id' })
  project: Project;

  @OneToMany(() => Link, (link) => link.subfolder)
  links: Link[];
}
