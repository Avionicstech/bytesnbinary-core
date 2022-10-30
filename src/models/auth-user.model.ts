import {model, property} from '@loopback/repository';
import {securityId, UserProfile} from '@loopback/security';

export interface Role {
  id: string;
  permissions: string[];
  roleType: number;
}

@model({settings: {strict: false}})
export class AuthUser implements UserProfile {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;
  @property({
    type: 'string',
  })
  name?: string;
  @property({
    type: 'array',
    itemType: 'string',
  })
  permissions: string[];

  @property({
    type: 'object',
  })
  role: Role;

  @property({
    type: 'string',
  })
  userTenantId?: string;
  [securityId]: string;
}
