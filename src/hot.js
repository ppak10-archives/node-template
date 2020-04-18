/**
 * hot.js
 * Entry file for development environment and checks for reloads in index.js
 */

import './index';

if (module.hot) {
  module.hot.accept('./index.js', () => {
    require('./index');
  });
}
