import {TokenService} from '@loopback/authentication';
import {injectable, BindingScope, inject} from '@loopback/core';
import {promisify} from 'util';
import {UserProfile, securityId} from '@loopback/security';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import { HttpErrors } from '@loopback/rest';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService implements TokenService {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SECRET) private jwtSecret: string,
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN) private jwtExpiresIn: string,
  ) {}

  async verifyToken(token: string): Promise<UserProfile> {
    try {
      const decodedToken = await verifyAsync(token, this.jwtSecret);
      const userProfile: UserProfile = {
        [securityId]: decodedToken.id,
        name: decodedToken.name,
        id: decodedToken.id,
      };
      return userProfile;
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error verifying token: ${error.message}`);
    }
  }

  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized('Error generating token: userProfile is null');
    }
    const token = await signAsync(userProfile, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    });
    return token;
  }
}