import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MulterModule } from '@nestjs/platform-express';
import { WebdavModule } from './webdav/webdav.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WebdavModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: configService.get('WEBDAV_URL'),
        username: configService.get('WEBDAV_LOGIN'),
        password: configService.get('WEBDAV_PASSWORD'),
        root: configService.get('WEBDAV_ROOT'),
        createRootIfNotExists: true,
      }),
    }),
    MulterModule.register({
      dest: 'tmp', 
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
