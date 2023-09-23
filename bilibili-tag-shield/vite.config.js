import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';
import { fileURLToPath, URL } from 'url'
import json from "./package.json" assert { type: "json" };

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['*://www.baidu.com/*', '*://www.bilibili.com/*'],
        description: json.description
      },
      build: {
        externalGlobals: {
          "vue": cdn.bootcdn('Vue', 'vue.global.prod.js'),
          'element-plus': cdn.bootcdn('Element-Plus', 'index.full.min.js'),
          "element-plus/dist/index.css": cdn.bootcdn('elementPlusCss', "index.css")
        },
        fileName: "bilibili-tag-shield.js",
        autoGrant: true,
        minifyCss: true
      },
    }),
  ],
});
