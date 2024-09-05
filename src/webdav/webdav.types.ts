import { ModuleMetadata } from "@nestjs/common";

export interface WebdavModuleOptions {
    url: string;
    username: string;
    password: string;
    root?: string;
    createRootIfNotExists?: boolean;
}

export interface WebdavModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useFactory?: (...args: any[]) => Promise<WebdavModuleOptions> | WebdavModuleOptions;
}