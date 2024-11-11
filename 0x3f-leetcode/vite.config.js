import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn, util } from 'vite-plugin-monkey';
import { fileURLToPath, URL } from 'url'
import config from "./package.json" assert { type: "json" };

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
        icon: 'https://assets.leetcode.cn/aliyun-lc-upload/users/endlesscheng/avatar_1690721039.png',
        match: [
          'https://leetcode.cn/circle/discuss/*',
          'https://leetcode.cn/problems/*',
          'https://leetcode.cn/contest/*/problems/*',
          'https://leetcode.com/circle/discuss/*',
          'https://leetcode.com/discuss/*',
          'https://leetcode.com/problems/*',
          'https://leetcode.com/contest/*/problems/*'
        ],
        namespace: config.repository.downloadURL,
        source: config.repository.url,
        version: config.version,
        description: config.description,
        author: config.author,
        downloadURL: config.repository.downloadURL,
        updateURL: config.repository.updateURL,
      },
      build: {
        externalGlobals: {
          vue: cdn
            .unpkg('Vue', 'dist/vue.global.prod.js')
            .concat(util.dataUrl(';window.Vue=Vue;')),
          'element-plus': cdn.unpkg('ElementPlus', 'dist/index.full.js'),
          // 'axios': cdn.unpkg('axios', 'dist/axios.js'),
        },
        externalResource: {
          "element-plus/dist/index.css": cdn.unpkg('elementPlusCss', "dist/index.css")
        },
        fileName: "0x3f-leetcode-problems.js",
        autoGrant: true,
        minifyCss: false,
      },
    }),
  ],
});
