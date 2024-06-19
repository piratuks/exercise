import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {param, get, getModelSchemaRef, response} from '@loopback/rest';
import {ReviewStatusRepository} from '../repositories';
import {ReviewStatus} from '../models';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';

@authenticate('jwt')
export class ReviewStatusController {
  constructor(
    @repository(ReviewStatusRepository)
    public reviewStatusRepository: ReviewStatusRepository,
  ) {}

  @get('/review-statuses/count')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(200, {
    description: 'ReviewStatus model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ReviewStatus) where?: Where<ReviewStatus>,
  ): Promise<Count> {
    return this.reviewStatusRepository.count(where);
  }

  @get('/review-statuses')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(200, {
    description: 'Array of ReviewStatus model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ReviewStatus, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ReviewStatus) filter?: Filter<ReviewStatus>,
  ): Promise<ReviewStatus[]> {
    return this.reviewStatusRepository.find(filter);
  }

  @get('/review-statuses/{id}')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(200, {
    description: 'ReviewStatus model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ReviewStatus, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ReviewStatus, {exclude: 'where'})
    filter?: FilterExcludingWhere<ReviewStatus>,
  ): Promise<ReviewStatus> {
    return this.reviewStatusRepository.findById(id, filter);
  }
}
