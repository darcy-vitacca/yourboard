import { Column, Entity as TOEntity, PrimaryColumn } from 'typeorm';
import Entity from './Entity';

@TOEntity('password_requests')
export default class PasswordRequest extends Entity {
  constructor(password_request: Partial<PasswordRequest>) {
    super();
    Object.assign(this, password_request);
  }

  @PrimaryColumn()
  id: string;

  @Column()
  email: string;
}
