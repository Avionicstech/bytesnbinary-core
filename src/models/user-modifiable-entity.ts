import {property} from '@loopback/repository';
import {SoftDeleteEntity} from './soft-delete-entity';

export abstract class UserModifiableEntity extends SoftDeleteEntity {
  @property({
    type: 'string',
    name: 'created_by',
  })
  createdBy?: string;

  @property({
    type: 'string',
    name: 'modified_by',
  })
  modifiedBy?: string;
}
