import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import { UserType } from './user-type.model';
import { ReviewSchedule } from './review-schedule.model';

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
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  first_name: string;

  @property({
    type: 'string',
    required: true,
  })
  last_name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @belongsTo(() => UserType)
  user_type_id: number;

  @hasMany(() => ReviewSchedule)
  mentors: User[];

  @hasMany(() => ReviewSchedule)
  students: User[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  students?: User[];
  mentors?: User[];
  userType?: UserType;
}

export type UserWithRelations = User & UserRelations;
