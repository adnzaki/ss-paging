import typescript from '@rollup/plugin-typescript';

export default {
  input: 'index.ts',
  output: [
    {
      file: 'dist/ss-paging.dist.js', // Sesuai dengan tsconfig outDir
      format: 'iife',
      name: 'SSPaging',
      globals: {
        vue: 'Vue',
      },
    },
    {
      file: 'dist/ss-paging.cjs.js', // Masih dalam folder dist
      format: 'cjs',
    },
    {
      file: 'dist/index.js', // Tempatkan di dalam dist
      format: 'es',
    },
  ],
  plugins: [typescript()],
}
