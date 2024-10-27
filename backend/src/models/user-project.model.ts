import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Project} from './project.model';
import {User} from './user.model';

@model()
export class UserProject extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Project)
  projectId: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  joinedAt?: string;


  constructor(data?: Partial<UserProject>) {
    super(data);
  }
}

export interface UserProjectRelations {
  // describe navigational properties here
}

export type UserProjectWithRelations = UserProject & UserProjectRelations;
