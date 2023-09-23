import DefaultTheme from 'vitepress/theme';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { useData, useRoute, EnhanceAppContext } from 'vitepress';
import 'viewerjs/dist/viewer.min.css';
import './style/index.css'


/**
 * 
 * @link https://vitepress.dev/guide/extending-default-theme
 */
export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.component('vImageViewer', vImageViewer);
  },
  setup() {
    const { frontmatter } = useData();
    const route = useRoute();


    // @link https://github.com/T-miracle/vitepress-plugin-image-viewer/blob/HEAD/README_zh.md
    imageViewer(route);
    // Obtain configuration from: https://giscus.app/
    giscusTalk({
      repo: 'wuxin0011/blog-giscus-comment',
      repoId: 'R_kgDOJADaHw',
      category: 'Announcements',
      categoryId: 'DIC_kwDOJADaH84CUUwQ',
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
      loading: "lazy",
      reactionsEnabled: "1",
    }, {
      frontmatter, route
    });
  }
}
