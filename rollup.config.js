const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
  ],  plugins: [
    resolve(),
    commonjs(),
    postcss({
      extract: 'Calendar.css',
      minimize: true,
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      outDir: 'dist',
    }),
  ],
  external: ['react', 'react-dom'],
};
