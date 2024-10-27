import {model, property} from '@loopback/repository';

@model()
export class LoginRequestDTO {
  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    minLength: 8,
  })
  password: string;
}
