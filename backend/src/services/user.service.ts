import {inject, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId} from '@loopback/security';
import * as bcrypt from 'bcryptjs';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {JWTService} from './jwt-service';

@injectable()
export class UserService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject('services.JWTService')
    private jwtService: JWTService,
  ) { }

  async verifyCredentials(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({where: {email}});
    if (!user) {
      throw new HttpErrors.NotFound('Email does not exist');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new HttpErrors.Unauthorized('Invalid credentials');
    }
    return user;
  }

  async login(credentials: {email: string; password: string}): Promise<string> {
    const user = await this.verifyCredentials(credentials.email, credentials.password);

    const userProfile = {
      [securityId]: user.id!.toString(),
      id: user.id,
      email: user.email,
    };

    const token = this.jwtService.generateToken(userProfile);
    return token;
  }
}
