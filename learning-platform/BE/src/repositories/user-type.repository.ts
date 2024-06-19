import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {UserType, UserTypeRelations} from '../models';

export class UserTypeRepository extends DefaultCrudRepository<
  UserType,
  typeof UserType.prototype.id,
  UserTypeRelations
> {
  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource,
  ) {
    super(UserType, dataSource);
  }
}
