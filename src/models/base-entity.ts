import {SoftDeleteEntity} from './soft-delete-entity';

export class BaseEntity extends SoftDeleteEntity {
  createdOn?: Date;
  modifiedOn?: Date;
}
