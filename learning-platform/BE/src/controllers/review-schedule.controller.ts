import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ReviewSchedule} from '../models';
import {ReviewScheduleRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import { authorize } from '@loopback/authorization';

@authenticate('jwt')
export class ReviewScheduleController {
  constructor(
    @repository(ReviewScheduleRepository)
    public reviewScheduleRepository: ReviewScheduleRepository,
  ) {}

  @post('/review-schedules')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(200, {
    description: 'ReviewSchedule model instance',
    content: {'application/json': {schema: getModelSchemaRef(ReviewSchedule)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ReviewSchedule, {
            title: 'NewReviewSchedule',
            exclude: ['id'],
          }),
        },
      },
    })
    reviewSchedule: Omit<ReviewSchedule, 'id'>,
  ): Promise<ReviewSchedule> {
    return this.reviewScheduleRepository.create(reviewSchedule);
  }

  @get('/review-schedules/count')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(200, {
    description: 'ReviewSchedule model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ReviewSchedule) where?: Where<ReviewSchedule>,
  ): Promise<Count> {
    return this.reviewScheduleRepository.count(where);
  }

  @get('/review-schedules')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(200, {
    description: 'Array of ReviewSchedule model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ReviewSchedule, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ReviewSchedule) filter?: Filter<ReviewSchedule>,
  ): Promise<ReviewSchedule[]> {
    return this.reviewScheduleRepository.find(filter);
  }

  @patch('/review-schedules')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(200, {
    description: 'ReviewSchedule PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ReviewSchedule, {partial: true}),
        },
      },
    })
    reviewSchedule: ReviewSchedule,
    @param.where(ReviewSchedule) where?: Where<ReviewSchedule>,
  ): Promise<Count> {
    return this.reviewScheduleRepository.updateAll(reviewSchedule, where);
  }

  @get('/review-schedules/{id}')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(200, {
    description: 'ReviewSchedule model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ReviewSchedule, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ReviewSchedule, {exclude: 'where'})
    filter?: FilterExcludingWhere<ReviewSchedule>,
  ): Promise<ReviewSchedule> {
    return this.reviewScheduleRepository.findById(id, filter);
  }

  @patch('/review-schedules/{id}')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(204, {
    description: 'ReviewSchedule PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ReviewSchedule, {partial: true}),
        },
      },
    })
    reviewSchedule: ReviewSchedule,
  ): Promise<void> {
    await this.reviewScheduleRepository.updateById(id, reviewSchedule);
  }

  @put('/review-schedules/{id}')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(204, {
    description: 'ReviewSchedule PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() reviewSchedule: ReviewSchedule,
  ): Promise<void> {
    await this.reviewScheduleRepository.replaceById(id, reviewSchedule);
  }

  @del('/review-schedules/{id}')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(204, {
    description: 'ReviewSchedule DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.reviewScheduleRepository.deleteById(id);
  }
}
