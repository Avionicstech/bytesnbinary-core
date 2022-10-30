import {Count, DataObject, Entity, juggler, Where} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {Options} from 'loopback-datasource-juggler';
import {AuthUser, UserModifiableEntity} from '../models';
import {AuthErrorKeys} from '../types';
import {DefaultSoftCrudRepository} from './default-soft-crud.repository.base';

export abstract class DefaultUserModifyRepository<
  T extends UserModifiableEntity,
  ID,
  Relations extends object = {},
> extends DefaultSoftCrudRepository<T, ID, Relations> {
  constructor(
    entityClass: typeof Entity & {
      prototype: T;
    },
    dataSource: juggler.DataSource,
    protected readonly currentUser: AuthUser,
  ) {
    super(entityClass, dataSource, currentUser);
  }

  async create(entity: DataObject<T>, options?: Options): Promise<T> {
    if (!this.currentUser) {
      throw new HttpErrors.Forbidden(AuthErrorKeys.InvalidCredentials);
    }
    const uid = this.currentUser?.userTenantId ?? this.currentUser?.id;
    entity.createdBy = uid;
    entity.modifiedBy = uid;
    return super.create(entity, options);
  }

  async createAll(entities: DataObject<T>[], options?: Options): Promise<T[]> {
    if (!this.currentUser) {
      throw new HttpErrors.Forbidden(AuthErrorKeys.InvalidCredentials);
    }
    const uid = this.currentUser?.userTenantId ?? this.currentUser?.id;
    entities.forEach(entity => {
      entity.createdBy = uid ?? '';
      entity.modifiedBy = uid ?? '';
    });
    return super.createAll(entities, options);
  }

  async save(entity: T, options?: Options): Promise<T> {
    if (!this.currentUser) {
      throw new HttpErrors.Forbidden(AuthErrorKeys.InvalidCredentials);
    }
    const uid = this.currentUser?.userTenantId ?? this.currentUser?.id;
    entity.modifiedBy = uid;
    return super.save(entity, options);
  }

  async update(entity: T, options?: Options): Promise<void> {
    if (!this.currentUser) {
      throw new HttpErrors.Forbidden(AuthErrorKeys.InvalidCredentials);
    }
    const uid = this.currentUser?.userTenantId ?? this.currentUser?.id;
    entity.modifiedBy = uid;
    return super.update(entity, options);
  }

  async updateAll(
    data: DataObject<T>,
    where?: Where<T>,
    options?: Options,
  ): Promise<Count> {
    if (!this.currentUser) {
      throw new HttpErrors.Forbidden(AuthErrorKeys.InvalidCredentials);
    }
    const uid = this.currentUser?.userTenantId ?? this.currentUser?.id;
    data.modifiedBy = uid;
    return super.updateAll(data, where, options);
  }

  async updateById(
    id: ID,
    data: DataObject<T>,
    options?: Options,
  ): Promise<void> {
    if (!this.currentUser) {
      throw new HttpErrors.Forbidden(AuthErrorKeys.InvalidCredentials);
    }
    const uid = this.currentUser?.userTenantId ?? this.currentUser?.id;
    data.modifiedBy = uid;
    return super.updateById(id, data, options);
  }

  async replaceById(
    id: ID,
    data: DataObject<T>,
    options?: Options,
  ): Promise<void> {
    if (!this.currentUser) {
      throw new HttpErrors.Forbidden(AuthErrorKeys.InvalidCredentials);
    }
    const uid = this.currentUser?.userTenantId ?? this.currentUser?.id;
    data.modifiedBy = uid;
    return super.replaceById(id, data, options);
  }
}
