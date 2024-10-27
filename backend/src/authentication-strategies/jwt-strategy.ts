import {AuthenticationStrategy} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {JWTService} from '../services/jwt-service';

export class JWTStrategy implements AuthenticationStrategy {
  name = 'jwt';

  constructor(
    @inject('services.JWTService')
    public jwtService: JWTService,
  ) { }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = this.extractToken(request);
    if (!token) {
      throw new Error('Authorization header not found.');
    }

    const userProfile = this.jwtService.verifyToken(token);

    if (!userProfile) {
      throw new HttpErrors.Unauthorized('Invalid token');
    }

    const completeUserProfile: UserProfile = {
      ...userProfile,
      [securityId]: userProfile.id, // Assuming `id` is the unique identifier
    };
    return completeUserProfile;
  }

  extractToken(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;
    return authHeader.split(' ')[1];
  }
}
