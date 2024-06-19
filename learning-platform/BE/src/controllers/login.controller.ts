import {post, requestBody} from '@loopback/rest';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {UserProfile, securityId} from '@loopback/security';
import { JwtService } from '../services/jwt-service';

export class LoginController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: JwtService,
  ) {}

  @post('/login', {
    responses: {
      '200': {
        description: 'JWT Token',
        content: {'application/json': {schema: {type: 'string'}}},
      },
    },
  })
  async login(
    @requestBody({
      description: 'Login credentials',
      required: true,
      content: {
        'application/json': {schema: {type: 'object', properties: {username: {type: 'string'}, password: {type: 'string'}}}},
      },
    }) credentials: {username: string; password: string},
  ): Promise<{token: string}> {
    


    
    const userProfile: UserProfile = {
      [securityId]: credentials.username,
      name: credentials.username,
      id: credentials.username,
    };
    const token = await this.jwtService.generateToken(userProfile);
    return {token};
  }
}