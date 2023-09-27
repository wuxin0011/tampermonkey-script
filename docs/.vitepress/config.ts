import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "tampermonkey-script",
  description: "油猴脚本",
  // @link https://vitepress.dev/reference/cli#command-line-interface
  // base: process.env.BASE_PATH,

  head: [
    [
      'link',
      { rel: 'icon', href: '/logo/sm-logo.png', type: "image/svg+xml" }
    ]
  ],
  themeConfig: {
    logo: '/logo/md-logo.png',
    outline: {
      level: [2, 3]
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about/' }
    ],


    sidebar: [
      {
        text: '指南',
        items: [
          { text: '开始', link: '/guide/quick-started' },
          { text: '如何自己开发一个脚本', link: '/guide/self-developed' },
        ]
      },
      {
        text: '插件',
        items: [
          { text: '直播插件', link: '/plugins/live-plugins' },
          { text: '弹幕屏蔽插件', link: '/plugins/barrage-keywords-stop' },
        ]
      },
      {
        text: '关于',
        link: '/about/'
      }
    ],

    socialLinks: [
      { icon: 'github', 'link': 'https://github.com/wuxin0011/tampermonkey-script', ariaLabel: 'gitee' }
    ],
    editLink: {
      pattern: 'https://github.com/wuxin0011/tampermonkey-script/docs/:path',
      text: '编辑此页'
    },
    footer: {
      message: 'MIT Licensed ',
      copyright: 'Copyright © 2023-present  <a href="https://github.com/wuxin0011">wuxin0011</a> '
    },
    algolia: {
      appId: "IAWNWZYOCW",
      apiKey: 'c4b6e3b5249969ce2e83fc3f3d6fec59',
      indexName: 'dev_m_note',
    },
    lastUpdatedText: '最后更新时间'
  },
  lastUpdated: true,


  // component replace
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPSwitchAppearance\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/vp-theme-apperence.vue', import.meta.url)
          )
        }
      ]
    }
  }
})
