import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      schema: 'public',
      table: 'users',
    },
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'number',
    required: true,
  })
  user_type_id: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {}

export type UserWithRelations = User & UserRelations;
