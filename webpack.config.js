//引入path、webpack等模块
const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//判断环境变量中的NODE_ENV是否为开发版本
const isDev = process.env.NODE_ENV === 'development';

//基本配置
const config = {
  target: 'web',                                 //将webpack的编译目标设置为web平台
  entry: path.join(__dirname,'src/main.js'),     //声明入口文件，__dirname是该项目的根目录
  output:{                                       //声明出口文件
    filename: 'bundle.js',                       //将挂载的App全部打包成一个bundle.js,在浏览器中可以直接运行的代码
    path: path.join(__dirname,'dist')            //bundle.js保存的位置
  },
  //正对不同类型的文件，定义不同的识别规则，最终打包成js文件，以供webpack处理
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options:{
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),                //每次执行npm run build时清空dist文件夹下所有内容
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({                     //根据isDev配置process.env
      'process.env': {
        NODE_ENV: isDev ? "'development'" : "'production'"
      }
    }),
    new HtmlWebpackPlugin({
      title: 'vuetodo'
    })
  ]
}

//开发模式的基本配置模块中需要添加的规则
if(isDev){
  config.module.rules.push(
    {
      test: /\.styl/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }
  )
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true
  },
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}else{                                                          //生产模式的基本配置模块中需要添加的规则
  config.entry = {
    app: path.join(__dirname,'src/main.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl/,
      use: [
        MiniCssPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    },
  ),
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons:{
          name:'commons',
          chunks:'initial',
          minChunks:2
        }
      }
    }
  }
  config.plugins.push(
    new MiniCssPlugin({
      filename: '[name].[hash:8].css',
      chunkname: '[id].[hash:8].css'
    })
  )
}
module.exports = config;                       //声明一个config的配置，用于对外暴露