import {Entity, model, property} from '@loopback/repository';

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
    type: 'number',
  })
  grade?: number;

  @property({
    type: 'string',
  })
  comment?: string;

  @property({
    type: 'number',
    required: true,
  })
  review_status_id: number;

  @property({
    type: 'number',
    required: false,
  })
  schedule_id: number;

  constructor(data?: Partial<Review>) {
    super(data);
  }
}

export interface ReviewRelations {}

export type ReviewWithRelations = Review & ReviewRelations;
