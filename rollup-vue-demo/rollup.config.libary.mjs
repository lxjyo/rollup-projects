import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// 处理vue
import vue from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
// 处理图片
import image from '@rollup/plugin-image';
// 处理别名
import alias from '@rollup/plugin-alias';
import { fileURLToPath } from 'node:url';
// 替换
import replace from '@rollup/plugin-replace';
// 清理目录
import clear from 'rollup-plugin-clear';

const libaryConfig = defineConfig({
  input: './src/main.ts',
  output: [
    {
      dir: 'libary/umd',
      format: 'umd',
      name: 'Vue3Demo',
      globals: {
        vue: 'Vue',
      },
      exports: 'named',
    },
    {
      dir: 'libary/esm',
      format: 'esm',
    },
  ],
  external: ['vue'],
  plugins: [
    alias({
      entries: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('src', import.meta.url)),
        },
      ],
    }),
    nodeResolve(),
    commonjs(),
    // 注意顺序
    vue({
      preprocessStyles: true,
    }),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true
        }
      }
    }),
    replace({
      // 需要将字符串做一下替换，不然会报错：process is not defined
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    postcss({
      extract: true,
      minimize: true,
      extensions: ['.css', '.scss', '.sass'], // 指定要处理的文件扩展名，转换成css
    }),
    image(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts', '.vue'],
    }),
    clear({
      targets: ['libary/esm', 'libary/umd']
    })
  ]
});

export default libaryConfig;