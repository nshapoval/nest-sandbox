import { createClient, WebDAVClient } from "webdav"

import { WEBDAV_CONNECTION_OPTIONS, WEBDAV_CONNECTION_TOKEN } from "./webdav.constants.js"
import { WebdavModuleAsyncOptions, WebdavModuleOptions } from "./webdav.types.js"
import { Provider } from "@nestjs/common"

const createConnection = (options: WebdavModuleOptions) => {
    return createClient(options.url, {
        username: options.username,
        password: options.password,
    })
}

const initRoot = async (options: WebdavModuleOptions, connection: WebDAVClient) => {
    if (options.createRootIfNotExists && options.root && await connection.exists(options.root) === false) {
        await connection.createDirectory(options.root);
    }
}

export const createProviders = (options: WebdavModuleOptions): Provider[] => {    
    const connectionOptionsProvider: Provider = {
        provide: WEBDAV_CONNECTION_OPTIONS,
        useValue: options,
    };

    const connectionProvider: Provider = {
        provide: WEBDAV_CONNECTION_TOKEN,
        async useFactory() {
            const connection = createConnection(options);
            await initRoot(options, connection);
            return createConnection(options)
        },
    }

    return [connectionOptionsProvider, connectionProvider];
}

export const createAsyncProviders = (options: WebdavModuleAsyncOptions): Provider[] => {
    const connectionProvider: Provider = {
        provide: WEBDAV_CONNECTION_TOKEN,
        async useFactory(options: WebdavModuleOptions) {
            const connection = createConnection(options);
            await initRoot(options, connection);
            return createConnection(options)
        },
        inject: [WEBDAV_CONNECTION_OPTIONS],
    };

    const connectionOptionsProvider: Provider = {
        provide: WEBDAV_CONNECTION_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
    }

    return [connectionOptionsProvider, connectionProvider];
}