import {BindingScope, injectable} from '@loopback/core';
import {UserProfile} from '@loopback/security';
import jwt from 'jsonwebtoken';

@injectable({scope: BindingScope.SINGLETON})
export class JWTService {
  private readonly secretKey = 'YOUR_SECRET_KEY';
  private readonly options = {
    expiresIn: '1h',
  };

  generateToken(userProfile: UserProfile): string {
    return jwt.sign(userProfile, this.secretKey, this.options);
  }

  verifyToken(token: string): UserProfile | undefined {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded as UserProfile;
    } catch (error) {
      throw new Error('Error verifying token: ' + error.message);
    }
  }
}
