import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/ss-paging-esm.ts',
  output: {
		file: 'dist/ss-paging.dist.js',
		format: 'iife',
    name: 'SSPaging',
    globals: {
      vue:'Vue'
    }
	},
  plugins: [typescript()]
}