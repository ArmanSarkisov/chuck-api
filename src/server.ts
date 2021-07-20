import http from 'http'

// Configs
import app from '.'
import { currentConfig } from '../config';
import { prettyLog } from './utils';

http.createServer({}, app).listen(currentConfig.app.port);

prettyLog({
  message: `Server running at http://${currentConfig.app.host}:${currentConfig.app.port}`,
  options: { borderColor: 'green' }
})