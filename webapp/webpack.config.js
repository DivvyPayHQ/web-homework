const path = require('path')
const root = process.cwd()
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const outputDirectory = path.join(root, '..', 'webserver', 'public')

let plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: './index.ejs',
    title: 'Divvy Coding Challenge',
    appMountId: 'react-app'
  })
]

const JS_FILE_REGEX = /\.(js|jsx)$/
const IMAGE_FILE_REGEX = /\.(jpg|jpeg|png|svg|bmp)$/
const NODE_MODULES_DIR_REGEX = /\/node_modules\/(?!apollo-.*?|react-apollo)/
const GRAPH_QL_FILE_REGEX = /\.(graphql|gql)$/

const babelConfig = {
  test: JS_FILE_REGEX,
  exclude: NODE_MODULES_DIR_REGEX,
  use: {
    loader: 'babel-loader'
  }
}

const imageUrlConfig = {
  test: IMAGE_FILE_REGEX,
  use: 'url-loader?limit=25000'
}

const eslintConfig = {
  test: JS_FILE_REGEX,
  use: 'eslint-loader',
  enforce: 'pre',
  exclude: /\/node_modules\/(?!apollo-.*?|react-apollo)/
}

const graphQlConfig = {
  test: GRAPH_QL_FILE_REGEX,
  exclude: NODE_MODULES_DIR_REGEX,
  loader: 'graphql-tag/loader'
}

const rules = [
  babelConfig,
  eslintConfig,
  imageUrlConfig,
  {
    test: /\.mjs$/,
    include: NODE_MODULES_DIR_REGEX,
    type: 'javascript/auto'
  },
  graphQlConfig
]

const config = {
  context: root,
  entry: './src/index.js',
  mode: JSON.stringify('development'),
  output: {
    path: outputDirectory,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    devtoolModuleFilenameTemplate: 'divvy-challenge://[resource-path]'
  },
  devtool: 'eval-source-map',
  optimization: { minimize: false },
  plugins,
  module: { rules },
  devServer: {
    historyApiFallback: true,
    hot: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // If you use Vagrant or Cloud9, set
    // host: options.host || '0.0.0.0';
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json'],
    alias: {
      Actions: path.resolve(__dirname, 'src', 'bundles', 'common', 'actions'),
      Assets: path.resolve(__dirname, 'src', 'bundles', 'common', 'assets'),
      Components: path.resolve(__dirname, 'src', 'bundles', 'common', 'components'),
      Config: path.resolve(__dirname, 'src', 'bundles', 'common', 'config'),
      Constants: path.resolve(__dirname, 'src', 'bundles', 'common', 'constants'),
      Helpers: path.resolve(__dirname, 'src', 'bundles', 'common', 'helpers'),
      Reducers: path.resolve(__dirname, 'src', 'bundles', 'common', 'reducers'),
      Styles: path.resolve(__dirname, 'src', 'bundles', 'common', 'styles'),
      Utils: path.resolve(__dirname, 'src', 'bundles', 'common', 'utils'),
      Validation: path.resolve(__dirname, 'src', 'bundles', 'common', 'validation')
    }
  }
}

module.exports = config
