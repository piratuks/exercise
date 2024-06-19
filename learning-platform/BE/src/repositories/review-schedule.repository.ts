import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {ReviewSchedule, ReviewScheduleRelations} from '../models';

export class ReviewScheduleRepository extends DefaultCrudRepository<
  ReviewSchedule,
  typeof ReviewSchedule.prototype.id,
  ReviewScheduleRelations
> {
  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource,
  ) {
    super(ReviewSchedule, dataSource);
  }
}
