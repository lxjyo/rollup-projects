# rollup

rollup 基于ES6模块化规范，使用rollup.config.(m)js|ts配置文件，配置rollup打包 
```rollup -c rollup.config.mjs -w ``` 使用es模块配置文件
```rollup -c rollup.config.ts --configPlugin typescript -w```使用ts配置文件，依赖ts插件，并需要在tsconfig.json的includes中加入rollup.config.ts

基础配置文件内容：
```js
import { defineConfig } from 'rollup';
export default defineConfig({
  input: './src/index.js', // 入口文件
  // output可以为数组，用于输出多种格式的文件
  output: {
    // 如果生成一个以上输出文件，需要替换成 dir 选项
    file: './dist/bundle.js', // 输出文件
    format: 'esm', // 输出格式
    entryFileNames: '[name].js', // 打包入口文件名
    chunkFileNames: 'chunks/[name].js', // chunk块文件名
  },
  external: ['lodash'], // 告诉rollup哪些模块是外部模块，不需要打包
  manualChunks: { // 手动分块
  }
})
```
format: 
 - esm：ES6模块，别名 es
 - cjs：CommonJS模块
 - umd：UMD模块，同时支持 amd，cjs 和 iife
 - iife：立即执行函数，用于在浏览器中通过script标签引入
> 当格式为 umd | iife 时，如果想要使用全局变量名来表示你的 bundle 时，需要指定 name 选项；globals 配置外部依赖


常用的插件：
1. @rollup/plugin-node-resolve：用于查找裸模块
2. @rollup/plugin-commonjs：将CommonJS模块转换为ES6，以便 Rollup 可以处理
3. @rollup/plugin-babel：配合使用babel插件
```js
import babel from '@rollup/plugin-babel';

babel({
  babelHelpers: 'bundled', // 将babelHelpers打包到bundle中
  babelHeplers: 'runtime', // 配合@babel/plugin-transform-runtime使用
  exclude: 'node_modules/**',
  extensions: ['.js', '.jsx', '.ts', '.tsx'] // 可处理的文件
})
```
4. rollup-plugin-postcss：处理样式（包括对css预处理器的处理）
5. @rollup/plugin-terser：压缩代码，放到output.plugins选项中
6. @rollup/plugin-image：处理图片
7. @rollup/plugin-alias：处理别名
```js
// 处理别名
import alias from '@rollup/plugin-alias';
import { fileURLToPath } from 'node:url';

alias({
  entries: [
    {
      find: '@',
      replacement: fileURLToPath(new URL('src', import.meta.url)),
    },
  ],
})
```
8. @rollup/plugin-replace：替换代码中的变量
```js
import replace from  '@rollup/plugin-replace';
replace({
  // 需要将字符串做一下替换，不然会报错：process is not defined
  preventAssignment: true,
  'process.env.NODE_ENV': JSON.stringify('production'),
})
```
9. rollup-plugin-clear：清理目录
10. rollup-plugin-generate-html-template：根据html模板生成html文件
11. 本地服务&热替换：rollup-plugin-serve、rollup-plugin-livereload
```js
// 本地预览 实现热重载
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
serve({
  open: true,
  port: 3001,
  contentBase: 'dist',
}),
livereload({
  watch: 'dist',
})
```
12. 使用ts：typescript、 tslib、rollup-plugin-typescript2(vue项目需使用) 或 @rollup/plugin-typescript；
13. vue项目：rollup-plugin-vue 、@vue/compiler-sfc
```js
// 注意顺序, 需要在ts、样式等前面
vue({
  preprocessStyles: true,
})
```