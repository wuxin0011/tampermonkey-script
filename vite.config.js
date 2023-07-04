import {defineConfig} from 'vite';
import monkey from 'vite-plugin-monkey';
import config from './package.json' assert {type: 'json'}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [monkey({
        entry: 'src/main.js', userscript: {
            icon: 'https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/picgo/icon.png',
            match: [' https://www.huya.com/*', 'https://www.huya.com/*', 'https://*.bilibili.com/*'],
            namespace: config.repository.url,
            version: config.version,
            description: config.description,
            author:config.author,
            grant: ["GM_addStyle"],
            name: 'live-plugin',
        },
        build: {
            fileName: 'live-plugin.js'
        }
    }),]

});
