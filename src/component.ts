import {
  Application,
  Binding,
  Component,
  config,
  ContextTags,
  CoreBindings,
  inject,
  injectable,
} from '@loopback/core';
import {
  AuthServiceBindings,
  BytesnbinaryCoreComponentBindings,
  TokenServiceConstants,
} from './keys';
import {
  BytesnbinaryCoreComponentOptions,
  DEFAULT_BYTESNBINARY_CORE_OPTIONS,
} from './types';

// Configure the binding for BytesnbinaryCoreComponent
@injectable({
  tags: {[ContextTags.KEY]: BytesnbinaryCoreComponentBindings.COMPONENT},
})
export class BytesnbinaryCoreComponent implements Component {
  bindings?: Binding[] = [
    Binding.bind(AuthServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    ),
    Binding.bind(AuthServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    ),
  ];
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    private application: Application,
    @config()
    private options: BytesnbinaryCoreComponentOptions = DEFAULT_BYTESNBINARY_CORE_OPTIONS,
  ) {}
}
