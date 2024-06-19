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
import {Review, ReviewSchedule} from '../models';
import {ReviewRepository, ReviewScheduleRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {Roles} from '../enums/roles';
import moment from 'moment';
import {MentorUserService} from '../services/user.service';

@authenticate('jwt')
export class ReviewController {
  constructor(
    @repository(ReviewRepository)
    public reviewRepository: ReviewRepository,
    @repository(ReviewScheduleRepository)
    public reviewScheduleRepository: ReviewScheduleRepository,
    @inject(SecurityBindings.USER, {optional: true}) private user: UserProfile,
    @inject('services.MentorUserService')
    private mentorUserService: MentorUserService,
  ) {}

  @post('/reviews')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(200, {
    description: 'Review model instance',
    content: {'application/json': {schema: getModelSchemaRef(Review)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Review, {
            title: 'NewReview',
            exclude: ['id'],
          }),
        },
      },
    })
    review: Omit<Review, 'id'>,
  ): Promise<Review> {
    return this.reviewRepository.create(review);
  }

  @get('/reviews/count')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(200, {
    description: 'Review model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Review) where?: Where<Review>): Promise<Count> {
    return this.reviewRepository.count(where);
  }

  @get('/reviews/by-schedule')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(200, {
    description: 'Array of Review model instances',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Review, {includeRelations: true}),
      },
    },
  })
  async findByUserId(
    @param.filter(ReviewSchedule)
    filter?: Filter<ReviewSchedule>,
  ): Promise<Review[]> {
    const reviewSchedules = await this.reviewScheduleRepository.find(filter);
    const ids = reviewSchedules.map(rs => rs.id);
    const reviews = await this.reviewRepository.find({
      where: {
        id: {inq: ids},
      },
    });

    return reviews;
  }

  @get('/reviews')
  @authorize({
    allowedRoles: ['administrator', 'mentor', 'student'],
  })
  @response(200, {
    description: 'Array of Review model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Review, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Review) filter?: Filter<Review>): Promise<Review[]> {
    if (this.user.type === Roles.MENTOR || this.user.type === Roles.STUDENT) {
      let mentorReviewSchedules: ReviewSchedule[] = [];

      if (this.user.type === Roles.MENTOR) {
        mentorReviewSchedules = await this.reviewScheduleRepository.find({
          where: {
            mentor_id: this.user.id,
          },
        });
      } else if (this.user.type === Roles.STUDENT) {
        mentorReviewSchedules = await this.reviewScheduleRepository.find({
          where: {
            student_id: this.user.id,
          },
        });
      }
      const ids = mentorReviewSchedules
        .map(rs => rs.id)
        .filter(id => typeof id === 'number') as number[];

      const mentorFilter: Filter<Review> = {
        ...filter,
        where: {
          ...filter?.where,
          schedule_id: {inq: ids},
        },
      };
      const reviews = await this.reviewRepository.find(mentorFilter);

      return reviews;
    }
    return this.reviewRepository.find(filter);
  }

  @post('/reviews/{id}/start')
  @authorize({
    allowedRoles: ['mentor'],
  })
  @response(200, {
    description: 'Review model instance',
    content: {'application/json': {schema: {type: 'string'}}},
  })
  async startReview(@param.path.number('id') id: number) {
    const review = await this.reviewRepository.findById(id);
    const mentorReviewSchedule = await this.reviewScheduleRepository.findOne({
      where: {
        id: review.schedule_id,
      },
    });

    if (!mentorReviewSchedule) return 'Review has no schedule';

    if (review.review_status_id !== 1)
      //not equal pending
      return 'Review has been already started / canceled or completed';

    const currentTime = moment();
    const startDateTime = moment(mentorReviewSchedule.start);

    if (!currentTime.isSameOrAfter(startDateTime))
      return 'Review cannot be started yet';

    review.review_status_id = 2; //in progress
    this.reviewRepository.updateById(review.id, review);

    return 'Review has been started';
  }

  @post('/reviews/{id}/cancel')
  @authorize({
    allowedRoles: ['mentor', 'student'],
  })
  @response(200, {
    description: 'Review model instance',
    content: {'application/json': {schema: {type: 'string'}}},
  })
  async cancelReview(@param.path.number('id') id: number) {
    const review = await this.reviewRepository.findById(id);
    const mentorReviewSchedule = await this.reviewScheduleRepository.findOne({
      where: {
        id: review.schedule_id,
      },
    });

    if (!mentorReviewSchedule) return 'Review has no schedule';

    if (review.review_status_id !== 1)
      //not equal pending
      return 'Review has been already started / canceled or completed';

    const currentTime = moment();
    const startDateTime = moment(mentorReviewSchedule.start);

    if (currentTime.isSameOrAfter(startDateTime))
      return 'Review cannot be canceled at this time';

    review.review_status_id = 4; //canceled
    this.reviewRepository.updateById(review.id, review);

    mentorReviewSchedule.end = currentTime.format('YYYY-MM-DD HH:mm:ss.SSSZ');
    this.reviewScheduleRepository.updateById(
      mentorReviewSchedule.id,
      mentorReviewSchedule,
    );

    return 'Review has been canceled';
  }

  @post('/reviews/{id}/complete')
  @authorize({
    allowedRoles: ['mentor'],
  })
  @response(200, {
    description: 'Review model instance',
    content: {'application/json': {schema: {type: 'string'}}},
  })
  async completeReview(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              grade: {type: 'number'},
              comment: {type: 'string'},
            },
          },
        },
      },
    })
    data: {grade?: number; comment?: string},
  ) {
    const review = await this.reviewRepository.findById(id);
    const mentorReviewSchedule = await this.reviewScheduleRepository.findOne({
      where: {
        id: review.schedule_id,
      },
    });

    if (!mentorReviewSchedule) return 'Review has no schedule';

    if (review.review_status_id !== 2)
      //not equal in progress
      return 'Review has not been started';

    const currentTime = moment();

    review.review_status_id = 3; //canceled
    review.grade = data.grade;
    review.comment = data.comment;
    this.reviewRepository.updateById(review.id, review);

    mentorReviewSchedule.end = currentTime.format('YYYY-MM-DD HH:mm:ss.SSSZ');
    this.reviewScheduleRepository.updateById(
      mentorReviewSchedule.id,
      mentorReviewSchedule,
    );

    return 'Review has been completed';
  }

  @post('/reviews/{mentor_id}/schedule')
  @authorize({
    allowedRoles: ['student'],
  })
  @response(200, {
    description: 'Review model instance',
    content: {'application/json': {schema: {type: 'string'}}},
  })
  async scheduleReview(
    @param.path.number('mentor_id') mentor_id: number,
    @param.query.string('time') time: number,
  ) {
    const newTime = this.mentorUserService.getNewTime(time);
    const freeMentors = await this.mentorUserService.getFreeMentors(newTime);
    const mentor = freeMentors.find(item => item.id === mentor_id);

    if (!mentor)
      return 'Review cannot be scheduled for selected mentor because mentor is busy at provided time';

    const reviewSchedule = new ReviewSchedule();
    reviewSchedule.mentor_id = mentor.id;
    reviewSchedule.student_id = this.user.id;
    reviewSchedule.start = newTime.format('YYYY-MM-DD HH:mm:ss.SSSZ');

    this.reviewScheduleRepository.create(reviewSchedule);

    return 'Review has been scheduled';
  }

  @patch('/reviews')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(200, {
    description: 'Review PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Review, {partial: true}),
        },
      },
    })
    review: Review,
    @param.where(Review) where?: Where<Review>,
  ): Promise<Count> {
    return this.reviewRepository.updateAll(review, where);
  }

  @get('/reviews/{id}')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(200, {
    description: 'Review model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Review, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Review, {exclude: 'where'})
    filter?: FilterExcludingWhere<Review>,
  ): Promise<Review> {
    return this.reviewRepository.findById(id, filter);
  }

  @patch('/reviews/{id}')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(204, {
    description: 'Review PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Review, {partial: true}),
        },
      },
    })
    review: Review,
  ): Promise<void> {
    await this.reviewRepository.updateById(id, review);
  }

  @put('/reviews/{id}')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(204, {
    description: 'Review PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() review: Review,
  ): Promise<void> {
    await this.reviewRepository.replaceById(id, review);
  }

  @del('/reviews/{id}')
  @authorize({
    allowedRoles: ['administrator'],
  })
  @response(204, {
    description: 'Review DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.reviewRepository.deleteById(id);
  }
}
