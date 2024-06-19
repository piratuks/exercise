import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {ReviewStatus, ReviewStatusRelations} from '../models';

export class ReviewStatusRepository extends DefaultCrudRepository<
  ReviewStatus,
  typeof ReviewStatus.prototype.id,
  ReviewStatusRelations
> {
  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource,
  ) {
    super(ReviewStatus, dataSource);
  }
}
