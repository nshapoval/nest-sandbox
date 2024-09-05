import { normalize } from 'path';
import { Readable } from 'stream';
import { Injectable } from '@nestjs/common';
import {
    BufferLike,
    CopyFileOptions,
    CreateDirectoryOptions,
    CreateReadStreamOptions,
    CreateWriteStreamCallback,
    CreateWriteStreamOptions,
    GetDirectoryContentsOptions,
    GetFileContentsOptions,
    GetQuotaOptions,
    Headers,
    LockOptions,
    MoveFileOptions,
    PutFileContentsOptions,
    RequestOptionsCustom,
    SearchOptions,
    StatOptions,
    WebDAVClient,
    WebDAVMethodOptions
} from 'webdav';

import { InjectWebdav, InjectWebdavOptions } from './webdav.decorator.js';
import { WebdavModuleOptions } from './webdav.types.js';

@Injectable()
export class WebdavService implements WebDAVClient {
    constructor(
        @InjectWebdav() private client: WebDAVClient,
        @InjectWebdavOptions() private options: WebdavModuleOptions,
    ){}

    private fromRoot(path: string) {
        return normalize(this.options.root + '/' + path);
    }

    async createDirectory(path: string, options?: CreateDirectoryOptions) {
        return this.client.createDirectory(this.fromRoot(path), options);
    }

    async copyFile(filename: string, destination: string, options?: CopyFileOptions) {
        return this.client.copyFile(this.fromRoot(filename), destination, options);
    }

    async getDirectoryContents(path: string, options?: GetDirectoryContentsOptions) {
        return this.client.getDirectoryContents(this.fromRoot(path), options);
    }

    createReadStream(filename: string, options?: CreateReadStreamOptions) {
        return this.client.createReadStream(this.fromRoot(filename), options);
    }

    createWriteStream(filename: string, options?: CreateWriteStreamOptions, callback?: CreateWriteStreamCallback) {
        return this.client.createWriteStream(this.fromRoot(filename), options, callback);
    }

    async customRequest(path: string, requestOptions: RequestOptionsCustom) {
        return this.client.customRequest(this.fromRoot(path), requestOptions)
    }

    async deleteFile(filename: string) {
        return this.client.deleteFile(this.fromRoot(filename));
    }

    async exists(path: string) {
        return this.client.exists(this.fromRoot(path))
    }

    async getDAVCompliance(path: string) {
        return this.client.getDAVCompliance(this.fromRoot(path))
    }

    async getFileContents(filename: string, options?: GetFileContentsOptions) {
        return this.client.getFileContents(this.fromRoot(filename), options);
    }

    getFileDownloadLink(filename: string) {
        return this.client.getFileDownloadLink(this.fromRoot(filename));
    }

    getFileUploadLink(filename: string) {
        return this.client.getFileUploadLink(this.fromRoot(filename));
    }

    getHeaders() {
        return this.client.getHeaders()
    };

    async getQuota(options?: GetQuotaOptions) {
        return this.client.getQuota(options)
    }

    async lock(path: string, options?: LockOptions) {
        return this.client.lock(this.fromRoot(path), options);
    }

    async moveFile(filename: string, destinationFilename: string, options?: MoveFileOptions) {
        return this.client.moveFile(this.fromRoot(filename), this.fromRoot(destinationFilename), options);
    }

    async partialUpdateFileContents(filePath: string, start: number, end: number, data: string | BufferLike | Readable, options?: WebDAVMethodOptions) {
        return this.client.partialUpdateFileContents(this.fromRoot(filePath), start, end, data);
    }

    async putFileContents(filename: string, data: string | BufferLike | Readable, options?: PutFileContentsOptions) {
        return this.client.putFileContents(this.fromRoot(filename), data, options);
    }

    async search(path: string, options?: SearchOptions) {
        return this.client.search(path, options);
    }

    setHeaders(headers: Headers) {
        this.client.setHeaders(headers);
    }

    async stat(path: string, options?: StatOptions) {
        return this.client.stat(this.fromRoot(path), options);
    }

    async unlock(path: string, token: string, options?: WebDAVMethodOptions) {
        return this.client.unlock(this.fromRoot(path), token, options);
    }
}
