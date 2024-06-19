import {inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {User, UserCredential, UserRelations} from '../models';
import {UserCredentialRepository} from './user-credential.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource,
    @repository(UserCredentialRepository)
    private userCredentialRepository: UserCredentialRepository,
  ) {
    super(User, dataSource);
  }

  async findUserCredentials(userId: number): Promise<UserCredential | null> {
    return this.userCredentialRepository.findOne({where: {user_id: userId}});
  }

  async findCredentials(userId: number): Promise<UserCredential | null> {
    const user = await this.findOne({where: {id: userId}});

    if (user) {
      const userCredentials = await this.findUserCredentials(user.id);
      if (userCredentials) {
        return userCredentials;
      }
    }

    throw new Error('authentication failed');
  }
}
