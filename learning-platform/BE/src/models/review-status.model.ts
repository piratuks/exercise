import {Entity, hasMany, model, property} from '@loopback/repository';
import { Review } from './review.model';

@model({
  settings: {
    postgresql: {
      schema: 'public',
      table: 'review_statuses',
    },
  },
})
export class ReviewStatus extends Entity {
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
  status: string;

  @hasMany(() => Review)
  students: Review[];

  constructor(data?: Partial<ReviewStatus>) {
    super(data);
  }
}

export interface ReviewStatusRelations {
  review?: Review[];
}

export type ReviewStatusWithRelations = ReviewStatus & ReviewStatusRelations;