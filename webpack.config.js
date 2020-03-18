const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const devMode = process.env.NODE_ENV !== 'prod'

function recursiveIssuer(module) {
  if (module.issuer) {
    return recursiveIssuer(module.issuer);
  } else if (module.name) {
    return module.name;
  } else {
    return false;
  }
}

module.exports = {
  // mode: 'development',
  devtool: 'source-map',
  entry: {
    index: './src/entry/index/index.js',
    carlist: './src/entry/carlist/carlist.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: (chunkData) => {
    //   if (chunkData) {
    //     var rawRequest = chunkData.chunk.entryModule.rawRequest;
    //     var moduleName = rawRequest && rawRequest.match(/entry\/(\S+)\/\S+.js/)[1];
    //     return `${moduleName}/[name].js`
    //   } else {
    //     return '[name].js'
    //   }
    // }
    filename: 'js/[name].bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9090
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(m?js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-react-jsx']
          }
        }
      },
      {
        test: /\.(jpg|png|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      }
    ]
  },
  plugins: [
    //清楚dist文件夹
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
      // moduleFilename: (chunkData) => {
      //   var rawRequest = chunkData.entryModule.rawRequest;
      //   var moduleName = rawRequest.match(/entry\/(\S+)\/\S+.js/)[1];
      //   return `${moduleName}/[name].css`
      // }
    }),
    //压缩css
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        map: {
          // 不生成内联映射,这样配置就会生成一个source-map文件
          inline: false,
          // 向css文件添加source-map路径注释
          // 如果没有此项压缩后的css会去除source-map路径注释
          annotation: true
        }
      }
    }),
    //生成多页面
    new HtmlWebpackPlugin({
      title: '车辆列表',
      filename: 'carlist.html',
      template: './src/templates/carlist.html',
      chunks: ['carlist', 'vendor', 'common']
    }),
    new HtmlWebpackPlugin({
      title: '首页',
      filename: 'index.html',
      template: './src/templates/index.html',
      chunks: ['index', 'vendor', 'common']
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash'
    }),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    // minimizer: [
    //   new TerserJSPlugin({}),
    //   new OptimizeCSSAssetsPlugin({})
    // ],
    splitChunks: {
      chunks: "all",
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 10
        },
        common: {
          name: 'common',
          test: /[\\/]lodash|jquery[\\/]/,
          priority: 11
        },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true
        // },
        // index: {
        //   name: 'index',
        //   test: (module, chunks, entry = 'index') => module.constructor.name === 'CssModule' && recursiveIssuer(module) === entry,
        //   chunks: 'all',
        //   enforce: true
        // },
        // carlist: {
        //   name: 'carlist',
        //   test: (module, chunks, entry = 'carlist') => module.constructor.name === 'CssModule' && recursiveIssuer(module) === entry,
        //   chunks: 'all',
        //   enforce: true
        // }
      }
    }
  }
}