import {Entity, hasMany, model, property} from '@loopback/repository';
import {UserProject} from './user-project.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 6,
      errorMessage: 'Password phải có độ dài ít nhất 6 ký tự',
    },
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'email',
      errorMessage: 'Email không hợp lệ',
    }
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 6,
      maxLength: 200,
      errorMessage: 'Full name phải có độ dài ít nhất 6 ký tự',
    }
  })
  fullName: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt: string;

  @hasMany(() => UserProject)
  userProjects: UserProject[];


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
