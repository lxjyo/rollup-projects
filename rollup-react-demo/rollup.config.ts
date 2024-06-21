import { RollupOptions } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// 使用typescript
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
// 处理样式文件
import postcss from 'rollup-plugin-postcss';
// 处理图片
import image from '@rollup/plugin-image';
// 处理别名
import alias from '@rollup/plugin-alias';
import { fileURLToPath } from "node:url";
// 替换
import replace from "@rollup/plugin-replace";
// 清理目录
import clear from 'rollup-plugin-clear';
// 生成html
import htmlTemplate from "rollup-plugin-generate-html-template";
// 本地预览 实现热重载
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
// 压缩
import terser from "@rollup/plugin-terser";
// 打包分析
import {visualizer} from "rollup-plugin-visualizer";

const config: RollupOptions = {
  input: './src/index.tsx',
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: '[name]-[hash].js',
    chunkFileNames: 'chunk/[name]-[hash].js',
    manualChunks: {
      react: ['react', 'react-dom']
    },
    // globals: {
    //   "react": "React",
    //   "react-dom": "ReactDOM",
    // },
    // paths: {
    //   "react": "https://cdn.jsdelivr.net/npm/react@18.2.0/+esm",
    //   "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@18.2.0/+esm",
    // },
    plugins: [terser()],
  },
  // external: ['react', 'react-dom'],
  plugins: [
    visualizer(),
    nodeResolve(),
    commonjs(),
    typescript(),
    // rollup-plugin-postcss 处理样式文件，支持scss less css等
    postcss({
      extract: true, // 将css 提取到dist目录下
      modules: true, // 增加css的模块化支持
      extensions: ['.css'],
    }),
    image(),
    replace({
      // 需要将字符串做一下替换，不然会报错：process is not defined
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    alias({
      entries: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("src", import.meta.url)),
        },
      ],
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    clear({
      targets: ['dist'],
    }),
    htmlTemplate({
      template: "public/index.html",
      target: "dist/index.html",
      attrs: ['type="module"'],
    }),
    serve({
      open: true,
      port: 3001,
      contentBase: "dist",
    }),
    livereload({
      watch: 'dist'
    })
  ],
};

export default config;
