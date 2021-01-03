import { resolve } from 'path'


export default {
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  },
  module: {
    rules: [{
      test: /\.js/,
      loader: 'babel-loader'
    }]
  },
  output: {
    libraryTarget: 'umd'
  }
}
