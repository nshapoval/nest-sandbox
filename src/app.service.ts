import { Injectable } from '@nestjs/common';
import { WebdavService } from './webdav/webdav.service.js';
import { CreateWriteStreamCallback } from 'webdav';

@Injectable()
export class AppService {
  constructor(private webdavService: WebdavService) {}

  listFiles(path: string) {
    return this.webdavService.getDirectoryContents(path);
  }

  streamFile(fileName: string) {
    return this.webdavService.createReadStream(fileName);
  }

  uploadFile(fileName: string, callback?: CreateWriteStreamCallback) {
    return this.webdavService.createWriteStream(fileName, undefined, callback);
  }
}
