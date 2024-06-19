import {Entity, belongsTo, model, property} from '@loopback/repository';
import { ReviewStatus } from './review-status.model';
import { ReviewSchedule } from './review-schedule.model';

@model({
  settings: {
    postgresql: {
      schema: 'public',
      table: 'reviews',
    },
  },
})
export class Review extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  grade?: string;

  @property({
    type: 'string',
  })
  comment?: string;

  @belongsTo(() => ReviewStatus)
  review_status_id: number;

  @belongsTo(() => ReviewSchedule)
  schedule_id: number;

  constructor(data?: Partial<Review>) {
    super(data);
  }
}

export interface ReviewRelations {
  reviewStatus?: ReviewStatus;
  reviewSchedule?: ReviewSchedule;
}

export type ReviewWithRelations = Review & ReviewRelations;
