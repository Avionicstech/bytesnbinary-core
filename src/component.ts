import {
  Application,
  injectable,
  Component,
  config,
  ContextTags,
  CoreBindings,
  inject,
} from '@loopback/core';
import {BytesnbinaryCoreComponentBindings} from './keys'
import {DEFAULT_BYTESNBINARY_CORE_OPTIONS, BytesnbinaryCoreComponentOptions} from './types';

// Configure the binding for BytesnbinaryCoreComponent
@injectable({tags: {[ContextTags.KEY]: BytesnbinaryCoreComponentBindings.COMPONENT}})
export class BytesnbinaryCoreComponent implements Component {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    private application: Application,
    @config()
    private options: BytesnbinaryCoreComponentOptions = DEFAULT_BYTESNBINARY_CORE_OPTIONS,
  ) {}
}
