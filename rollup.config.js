import typescript from '@rollup/plugin-typescript';

export default {
  input: 'index.ts',
  output: [
    {
      file: 'dist/ss-paging.dist.js',
      format: 'iife',
      name: 'SSPaging',
      globals: {
        vue:'Vue'
      }
    },
    {
      file: 'dist/ss-paging.cjs.js',
      format: 'cjs',
    },
    {
      file: 'index.js',
      format: 'es',
    },
  ],
  plugins: [typescript()]
}