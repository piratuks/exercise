import {Entity, model, property} from '@loopback/repository';

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

  constructor(data?: Partial<ReviewStatus>) {
    super(data);
  }
}

export interface ReviewStatusRelations {}

export type ReviewStatusWithRelations = ReviewStatus & ReviewStatusRelations;
