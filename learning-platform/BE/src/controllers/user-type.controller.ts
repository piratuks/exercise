import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {param, get, getModelSchemaRef, response} from '@loopback/rest';
import {UserType} from '../models';
import {UserTypeRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class UserTypeController {
  constructor(
    @repository(UserTypeRepository)
    public userTypeRepository: UserTypeRepository,
  ) {}

  @get('/user-types/count')
  @response(200, {
    description: 'UserType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(UserType) where?: Where<UserType>): Promise<Count> {
    return this.userTypeRepository.count(where);
  }

  @get('/user-types')
  @response(200, {
    description: 'Array of UserType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserType) filter?: Filter<UserType>,
  ): Promise<UserType[]> {
    return this.userTypeRepository.find(filter);
  }

  @get('/user-types/{id}')
  @response(200, {
    description: 'UserType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserType, {exclude: 'where'})
    filter?: FilterExcludingWhere<UserType>,
  ): Promise<UserType> {
    return this.userTypeRepository.findById(id, filter);
  }
}
