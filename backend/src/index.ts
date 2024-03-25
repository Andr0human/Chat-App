import { serverConfig } from './config';
import Server from './Server';

const server: Server = new Server(serverConfig);
server.run();
