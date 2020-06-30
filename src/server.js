/**
 * server.js
 * Entry file for express server
 */

// Node Modules
import {createServer} from 'http';

createServer((request, response) => {
  response.write('Hello World');
  response.end();
}).listen(3000);
