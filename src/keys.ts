import {BindingKey, CoreBindings} from '@loopback/core';
import {BytesnbinaryCoreComponent} from './component';
import {LoggerService} from './providers';

/**
 * Binding keys used by this component.
 */
export namespace BytesnbinaryCoreComponentBindings {
  export const COMPONENT = BindingKey.create<BytesnbinaryCoreComponent>(
    `${CoreBindings.COMPONENTS}.BytesnbinaryCoreComponent`,
  );
}
export namespace LoggerBindings {
  export const LOGGER = BindingKey.create<LoggerService>('services.logger');
}
