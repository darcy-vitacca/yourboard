import {
  Entity as TOEntity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Entity from './Entity';
import Project from './Project';
import { IsEmail, Length } from 'class-validator';

@TOEntity('project_users')
export default class ProjectUser extends Entity {
  constructor(project_user: Partial<ProjectUser>) {
    super();
    Object.assign(this, project_user);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({
    nullable: true,
  })
  full_name: string;

  @Column()
  status: boolean;

  @Index()
  @IsEmail(undefined, { message: 'Must be a valid email address' })
  @Length(1, 255, { message: 'Email is empty' })
  @Column({
    nullable: true,
  })
  email: string;

  @Column()
  owner: boolean;

  @Column()
  project_id: string;
  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'project_id' })
  project: Project;
}
