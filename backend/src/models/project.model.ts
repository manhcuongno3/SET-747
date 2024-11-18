import {Entity, hasMany, model, property} from '@loopback/repository';
import {UserProject} from './user-project.model';

@model()
export class Project extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
    required: true
  })
  startDate?: string;

  @property({
    type: 'date',
    required: true,
  })
  endDate: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: string;

  @property({
    type: 'string',
    required: true,
  })
  createdBy: string;

  @hasMany(() => UserProject)
  userProjects: UserProject[];

  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectRelations {
  // describe navigational properties here
}

export type ProjectWithRelations = Project & ProjectRelations;
