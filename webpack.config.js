const webpack = require('webpack')
const path = require('path')
const DtsBundleWebpack = require('dts-bundle-webpack')

const PATHS = {
  src: path.join(__dirname, './src'),
  lib: path.join(__dirname, "lib")
}

const webpackConfig = {
  mode: 'development',
  entry: {
    'ci-sandbox': PATHS.src + '/umd.ts'
  },
  output: {
    path: PATHS.lib,
    filename: '[name].js',
    library: 'CiSandbox',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: "eval-source-map",
  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      loader: 'awesome-typescript-loader'
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'react': path.resolve(__dirname, './node_modules/react') ,
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    }
  },
  plugins: [
    new DtsBundleWebpack({
      name: 'ci-sandbox',
      main: 'build/index.d.ts',
      // baseDir: '../lib',
      out: '../lib/ci-sandbox.d.ts',
      removeSource: true,
      // outputAsModuleFolder: true
    })
  ],
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  }
}

module.exports = webpackConfig
