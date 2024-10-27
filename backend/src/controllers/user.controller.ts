import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import bcrypt from 'bcrypt';
import {LoginRequestDTO} from '../dtos';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {UserService} from '../services';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject('services.UserService') private userService: UserService,
  ) { }

  @post('/login')
  async login(
    @requestBody() credentials: LoginRequestDTO,
  ): Promise<{token: string}> {
    const token = await this.userService.login(credentials);
    return {token};
  }

  @post('/register')
  async register(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            'x-ts-type': User,
          },
        },
      },
    })
    newUserRequest: User,
  ): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: {email: newUserRequest.email},
    });

    if (existingUser) {
      throw new HttpErrors.Conflict('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(newUserRequest.password, 10);

    const newUser = await this.userRepository.create({
      ...newUserRequest,
      password: hashedPassword,
    });

    newUser.password = '';
    return newUser;
  }
}
