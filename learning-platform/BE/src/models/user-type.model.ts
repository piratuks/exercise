import {Entity, hasMany, model, property} from '@loopback/repository';
import { User } from './user.model';

@model({
  settings: {
    postgresql: {
      schema: 'public',
      table: 'user_types',
    },
  },
})
export class UserType extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @hasMany(() => User)
  users: User[];
  
  constructor(data?: Partial<UserType>) {
    super(data);
  }
}

export interface UserTypeRelations {
  users?: User[];
}

export type UserTypeWithRelations = UserType & UserTypeRelations;