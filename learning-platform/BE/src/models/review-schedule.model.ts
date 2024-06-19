import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'number',
    required: false,
  })
  mentor_id: number;

  @property({
    type: 'number',
    required: false,
  })
  student_id: number;

  constructor(data?: Partial<ReviewSchedule>) {
    super(data);
  }
}

export interface ReviewScheduleRelations {}

export type ReviewScheduleWithRelations = ReviewSchedule &
  ReviewScheduleRelations;
