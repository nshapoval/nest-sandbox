import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';

import { AppService } from './app.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, rm } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  listFolder() {
    return this.appService.listFiles('');
  }

  @Get(':fileName')
  download(@Param('fileName') fileName: string, @Res() res: Response) {
    const file =  this.appService.streamFile(fileName);
    file.pipe(res);
  }

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    createReadStream(file.path)
      .pipe(this.appService.uploadFile(file.originalname, (res => {
        rm(file.path, () => null);
      })))
  }
}
