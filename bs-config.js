const ENV = require('./env.js') //環境変数
const SSI = require('browser-sync')

module.exports = {
  files: './public/**/*.css, ./public/**/*.js, ./public/**/*.html',
  server: {
    baseDir: './public/',
    index: 'index.html',
  },
  startPath: ENV.BASE_DIR + 'pagelist.html',
  online: true,
  open: 'external',
  proxy: false,
  port: 3000,
}
