# bytesnbinary-core

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

## Installation

Install BytesnbinaryCoreComponent using `npm`;

```sh
$ [npm install | yarn add] bytesnbinary-core
```

## Basic Use

Configure and load BytesnbinaryCoreComponent in the application constructor
as shown below.

```ts
import {BytesnbinaryCoreComponent, BytesnbinaryCoreComponentOptions, DEFAULT_BYTESNBINARY_CORE_OPTIONS} from 'bytesnbinary-core';
// ...
export class MyApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    const opts: BytesnbinaryCoreComponentOptions = DEFAULT_BYTESNBINARY_CORE_OPTIONS;
    this.configure(BytesnbinaryCoreComponentBindings.COMPONENT).to(opts);
      // Put the configuration options here
    });
    this.component(BytesnbinaryCoreComponent);
    // ...
  }
  // ...
}
```
