import { Column, Entity as TOEntity, PrimaryGeneratedColumn } from 'typeorm';
import Entity from './Entity';

@TOEntity('notes')
export default class Note extends Entity {
  constructor(note: Partial<Note>) {
    super();
    Object.assign(this, note);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("text")
  note:  string;

  @Column()
  project_id: string;

  @Column()
  user_id: string;
}
