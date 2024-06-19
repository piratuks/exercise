import {Entity, model, property} from '@loopback/repository';

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

  constructor(data?: Partial<UserType>) {
    super(data);
  }
}

export interface UserTypeRelations {}

export type UserTypeWithRelations = UserType & UserTypeRelations;
