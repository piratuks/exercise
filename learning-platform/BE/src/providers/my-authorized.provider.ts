import {Provider, inject, ValueOrPromise} from '@loopback/core';
import {
  AuthorizationContext,
  AuthorizationMetadata,
  Authorizer,
  AuthorizationDecision,
} from '@loopback/authorization';
import {UserProfile, SecurityBindings} from '@loopback/security';
import {repository} from '@loopback/repository';
import {UserRepository, UserTypeRepository} from '../repositories';

export class MyAuthorizationProvider implements Provider<Authorizer> {
  constructor(
    @inject(SecurityBindings.USER, {optional: true}) private user: UserProfile,
    @repository(UserTypeRepository)
    public userTypeRepository: UserTypeRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  value(): ValueOrPromise<Authorizer> {
    return this.authorize.bind(this);
  }

  async authorize(
    authorizationCtx: AuthorizationContext,
    metadata: AuthorizationMetadata,
  ): Promise<AuthorizationDecision> {
    if (!this.user) {
      return AuthorizationDecision.DENY;
    }

    const userByID = await this.userRepository.findById(this.user.id);

    if (userByID) {
      const userType = await this.userTypeRepository.findById(
        userByID.user_type_id,
      );
      if (
        metadata.allowedRoles &&
        !metadata.allowedRoles.includes(userType.type)
      ) {
        return AuthorizationDecision.DENY;
      }
    }

    return AuthorizationDecision.ALLOW;
  }
}
