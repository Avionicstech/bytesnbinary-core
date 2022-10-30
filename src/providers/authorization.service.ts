import {
  AuthorizationContext,
  AuthorizationDecision,
  AuthorizationMetadata,
  Authorizer,
} from '@loopback/authorization';
import {BindingScope, injectable, Provider} from '@loopback/core';
import {securityId} from '@loopback/security';
import _ from 'lodash';
import {AuthUser} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthorizationProvider implements Provider<Authorizer> {
  value(): Authorizer {
    return this.authorize.bind(this);
  }
  async authorize(
    authorizationCtx: AuthorizationContext,
    metadata: AuthorizationMetadata,
  ) {
    // Bypass authorize if metadata have *
    if (metadata.resource === '*') {
      return AuthorizationDecision.ALLOW;
    }
    let currentUser: AuthUser;
    if (authorizationCtx.principals.length > 0) {
      const user = _.pick(authorizationCtx.principals[0], [
        'id',
        'name',
        'role',
        'permissions',
        'userTenantId',
      ]);

      if (!user) return AuthorizationDecision.DENY;

      currentUser = {
        [securityId]: user.id,
        name: user.name,
        role: user.role,
        permissions: user.permissions,
        id: user.id,
        userTenantId: user.userTenantId,
      };
    } else {
      return AuthorizationDecision.DENY;
    }

    if (!currentUser.role) {
      return AuthorizationDecision.DENY;
    }

    const allPermissions = [
      ...currentUser.permissions,
      ...currentUser.role.permissions,
    ];

    if (metadata.resource && allPermissions.includes(metadata.resource ?? '')) {
      return AuthorizationDecision.ALLOW;
    }

    let roleIsAllowed = false;

    if (
      metadata?.allowedRoles?.includes(currentUser.role.roleType.toString())
    ) {
      roleIsAllowed = true;
    }

    if (roleIsAllowed) {
      return AuthorizationDecision.ALLOW;
    }

    return AuthorizationDecision.DENY;
  }
}
