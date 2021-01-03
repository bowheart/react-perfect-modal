import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'


const env = process.env.NODE_ENV


const plugins = [
  babel({
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [
      // '@babel/es2015-rollup',
      [ '@babel/env', { modules: false } ],
      '@babel/react',
      [ '@babel/stage-2', { 'decoratorsLegacy': true } ]
    ]
  }),

  replace({
    'process.env.NODE_ENV': JSON.stringify(env) // quote the value
  }),

  resolve()
]


if (env === 'production') {
  plugins.push(uglify({
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false
    }
  }))
}


const config = {
  input: 'src/index.js',
  output: {
    file: 'dist/react-perfect-modal.js',
    format: 'umd',
    name: 'ReactPerfectModal'
  },
  externals: [ 'react', 'react-dom' ],
  plugins
}


export default config
