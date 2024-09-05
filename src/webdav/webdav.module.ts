import { DynamicModule, Module } from '@nestjs/common';

import { WebdavModuleAsyncOptions, WebdavModuleOptions } from './webdav.types.js';
import { createAsyncProviders, createProviders } from './webdav.utils.js';
import { WebdavService } from './webdav.service.js';

/**
 * Example of usage
 * @example
 * .@Module({
 *    imports: [
 *     ConfigModule.forRoot({ isGlobal: true }),
 *     WebdavModule.registerAsync({
 *       inject: [ConfigService],
 *       useFactory: (configService: ConfigService) => ({
 *         url: configService.get('WEBDAV_URL'),
 *         username: configService.get('WEBDAV_LOGIN'),
 *         password: configService.get('WEBDAV_PASSWORD'),
 *         root: configService.get('WEBDAV_ROOT'),
 *         createRootIfNotExists: true,
 *       }),
 *     }),
 *  ],
 *  controllers: [AppController],
 *  providers: [AppService],
 * })
 * export class AppModule {}
 */
@Module({
  providers: [WebdavService]
})
export class WebdavModule {
  static register(options: WebdavModuleOptions): DynamicModule {
    const providers = createProviders(options);

    return {
      module: WebdavModule,
      providers: providers,
      exports: [...providers, WebdavService],
    }
  }
  static registerAsync(options: WebdavModuleAsyncOptions): DynamicModule {
    const providers = createAsyncProviders(options);

    return {
      module: WebdavModule,
      imports: options.imports,
      providers: providers,
      exports: [...providers, WebdavService],
    }
  }
}
