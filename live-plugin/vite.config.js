import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import config from './package.json' assert {type: 'json'}
import icon from './src/utils/icon'
import { fileURLToPath, URL } from 'url'
export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    plugins: [monkey({
        entry: 'src/main.js', userscript: {
            icon: icon,
            match: [
                'https://www.douyu.com/*',
                'https://www.huya.com/*',
                'https://*.douyin.com/*',
                'https://www.bilibili.com/*',
                'https://search.bilibili.com/*',
                'https://space.bilibili.com/*',
                'https://game.bilibili.com/*',
                'https://message.bilibili.com/*',
                'https://t.bilibili.com/*',
            ],
            namespace: config.repository.url,
            version: config.version,
            description: config.description,
            author: config.author,
            grant: ["GM_addStyle", "GM.registerMenuCommand"],
            name: '直播插件',
        },
        build: {
            fileName: 'live-plugin.js'
        }
    }),]

});
