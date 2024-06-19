import {injectable, BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {ReviewScheduleRepository, UserRepository} from '../repositories';
import moment from 'moment';

@injectable({scope: BindingScope.TRANSIENT})
export class MentorUserService {
  constructor(
    @repository(ReviewScheduleRepository)
    private reviewScheduleRepository: ReviewScheduleRepository,
    @repository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  getNewTime = (time: number)=>{
    const currentTime = moment();
    const parsedTime = moment(currentTime, 'YYYY-MM-DD HH:mm:ss.SSSZ');
    const newTime = parsedTime.add(time, 'minutes');
    return newTime;
  }

  getFreeMentors = async (newTime: moment.Moment) => {
    const mentorReviewSchedules = await this.reviewScheduleRepository.find({
      where: {
        and: [
          {end: undefined},
          {
            start: {
              gte: moment(newTime)
                .subtract(60, 'minutes') // After the 60 minutes, a mentor is considered available even if he hasn't finished the review
                .format('YYYY-MM-DD HH:mm:ss.SSSZ'),
            },
          },
        ],
      },
    });

    const ids = mentorReviewSchedules
      .map(rs => rs.mentor_id)
      .filter(id => typeof id === 'number') as number[];

    const freeMentors = await this.userRepository.find({
      where: {
        and: [
          {id: {nin: ids}},
          {user_type_id: 3}, //mentor
        ],
      },
    });

    return freeMentors;
  };
}
