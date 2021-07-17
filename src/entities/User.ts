import { IsEmail, Length } from 'class-validator';
import {
  Entity as TOEntity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
  Generated,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import Entity from './Entity';
import Project from './Project';
import Link from './Link';
// import Post from './Post';
// import Vote from './Vote';

@TOEntity('users')
export default class User extends Entity {
  //partial allows nullable fields // Base entity allows active record approach
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Exclude()
  @Index()
  @Generated('uuid')
  @Column()
  user_id: string;

  @Index()
  @IsEmail(undefined, { message: 'Must be a valid email address' })
  @Length(1, 255, { message: 'Email is empty' })
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(6, 255, { message: 'Must be 6 characters or more without spaces.' })
  @Column({ unique: true })
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    nullable: true,
  })
  profile_img: string;

  @Exclude()
  @Index()
  @Length(8, 255, {
    message:
      'Must be a combination of 8 letters and numbers, including uppercase and lower case, without spaces.',
  })
  @Column()
  //^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$
  //^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[$@$!%?&])[A-Za-z\d$@$!%?&]{8,}
  // @IsUppercase()
  // @IsLowercase()
  password: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => Link, (link) => link.user)
  links: Link[];

  // @OneToMany(() => Vote, (vote) => vote.user)
  // votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}