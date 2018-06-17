const ExtractTextPlugin = require('extract-text-webpack-plugin');// плагин для перемещения css в отдельный файл
const HtmlWebpackPlugin = require('html-webpack-plugin'); //плагин для генеации html страниц
const path = require('path'); //nodejs утилита для работы с путями

const DIST_PATH = path.resolve(__dirname, './dist'); //абсолютный путь к директории dist

module.exports = {
  entry: './src/index.js', //точка входа
  output: {
    filename: '[name].js', //название файла на выходе
    path: DIST_PATH, // Куда все складывать
  },
  module: {
  //Набор правил обработки файлов
  rules: [
    {
      test: /\.js$/, //Все файлы с расширением js
      exclude: /node_modules|dist/, //За исключением директорий node_modules и dist
      use: 'babel-loader', //Использовать babel-loader (компилировать ES6 в ES5)
    },
    {
      test: /\.scss$/, //Все файлы с расширением scss
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'] //Использовать css-loader и sass-loader
      })
    }],
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: DIST_PATH,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './templates/index.ejs',
    }),
    new ExtractTextPlugin('style.css'),
  ],
};
