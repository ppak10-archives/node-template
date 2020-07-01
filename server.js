/**
 * server.js
 * Entry file for express server
 */

// Node Modules
import {config} from 'dotenv';
config();

import {exists, readFile, statSync} from 'fs';
import {createServer} from 'http';
import path from 'path';
import url from 'url';

// Constant
const PORT = process.env.PORT || 3000; // Defaults to port 3000 if env unset

createServer((request, response) => {
  const parsedURL = url.parse(request.url);
  let pathname = `.${parsedURL.pathname}`;
  const ext = path.parse(pathname).ext || '.html';
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
  };

  exists(pathname, (exist) => {
    if (!exist) {
      response.statusCode = 404;
      response.end(`File ${pathname} not found`);
      return;
    }

    if (statSync(pathname).isDirectory()) {
      pathname += 'public/index' + ext;
    }

    readFile(pathname, (err, data) => {
      if (err) {
        response.statusCode = 500;
        response.end(`Error retrieving file: ${err}.`);
      } else {
        response.setHeader('Content-type', map[ext] || 'text/plain');
        response.end(data);
      }
    });
  });
}).listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Running server on port: ${PORT}`);
});
