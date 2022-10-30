import {BindingKey, CoreBindings} from '@loopback/core';
import {BytesnbinaryCoreComponent} from './component';
import {LoggerService} from './providers';

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'myjwts3cr3t';
  export const TOKEN_EXPIRES_IN_VALUE = '21600';
}
export namespace BytesnbinaryCoreComponentBindings {
  export const COMPONENT = BindingKey.create<BytesnbinaryCoreComponent>(
    `${CoreBindings.COMPONENTS}.BytesnbinaryCoreComponent`,
  );
}
export namespace LoggerBindings {
  export const LOGGER = BindingKey.create<LoggerService>('services.logger');
}
export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds',
  );
}
