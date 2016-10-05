// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var plat = 'pc';
var conf = config.build;
var staticDir = './static/pc';
webpackConfig.resolve.alias = {
    'src': path.resolve(__dirname, '../pc/src'),
    'assets': path.resolve(__dirname, '../pc/src/assets'),
    'components': path.resolve(__dirname, '../pc/src/components')
}
webpackConfig.entry = {
  app: './src/pc/main.js'
}


if(process.argv[2] && process.argv[2] == 'mobile'){
  plat = 'mobile';
  conf = config.mobile;
  staticDir = './static/mobile';
  webpackConfig.resolve.alias = {
    'src': path.resolve(__dirname, '../mobile/src'),
    'assets': path.resolve(__dirname, '../mobile/src/assets'),
    'components': path.resolve(__dirname, '../mobile/src/components')
  }
  webpackConfig.entry = {
    app: './src/mobile/main.js'
  }
  webpackConfig.plugins[4].options.filename = conf.index
}

webpackConfig.output.path = conf.assetsRoot;


var spinner = ora('building for ' + plat + '...')
spinner.start()

var assetsPath = path.join(conf.assetsRoot, conf.assetsSubDirectory)

console.log('assetsPath ' + assetsPath)

rm('-rf', assetsPath)
mkdir('-p', conf.assetsRoot)
cp('-R', staticDir, assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
