import { Inject } from '@nestjs/common';

import { WEBDAV_CONNECTION_OPTIONS, WEBDAV_CONNECTION_TOKEN } from './webdav.constants.js';

export const InjectWebdav = () => Inject(WEBDAV_CONNECTION_TOKEN);
export const InjectWebdavOptions = () => Inject(WEBDAV_CONNECTION_OPTIONS);