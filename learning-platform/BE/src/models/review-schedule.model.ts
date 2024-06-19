import {Entity, belongsTo, hasOne, model, property} from '@loopback/repository';
import { User } from './user.model';

@model({
  settings: {
    postgresql: {
      schema: 'public',
      table: 'review_schedules',
    },
  },
})
export class ReviewSchedule extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  start: string;

  @property({
    type: 'date',
  })
  end?: string;

  @belongsTo(() => User)
  mentor_id?: number;

  @belongsTo(() => User)
  student_id?: number;

  @hasOne(() => ReviewSchedule)
  reviewSchedule: ReviewSchedule;

  constructor(data?: Partial<ReviewSchedule>) {
    super(data);
  }
}

export interface ReviewScheduleRelations {
  mentor?: User;
  student?: User;
  reviewSchedule?: ReviewSchedule;
}

export type ReviewScheduleWithRelations = ReviewSchedule & ReviewScheduleRelations;
