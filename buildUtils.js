const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const glob = require('glob')
// 页面模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
const PAGE_PATH = path.resolve(__dirname, './src/pages')

// 多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function() {
  let entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
  let map = {}
  entryFiles.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    map[filename] = filePath
  })
  return map
}

// 多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPluginDev = function() {
  let entryJs = glob.sync(PAGE_PATH + '/*/*.js')
  let arr = []
  entryJs.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    let conf = {
      // 模板来源
      template: './src/template/index.ejs',
      // 文件名称
      filename: filename + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      // chunks: ['manifest', 'vendor', filename],
      inject: false
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}

exports.htmlPluginProd = function() {
  let entryJs = glob.sync(PAGE_PATH + '/*/*.js')
  let arr = []
  entryJs.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    let conf = {
      // 模板来源
      template: './src/template/index.ejs',
      // 文件名称
      filename: filename + '_prod.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      // chunks: ['manifest', 'vendor', filename],
      inject: false
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}