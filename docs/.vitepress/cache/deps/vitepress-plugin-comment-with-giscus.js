import {
  createApp,
  createCommentVNode,
  createElementBlock,
  defineComponent,
  h,
  nextTick,
  onMounted,
  openBlock,
  ref,
  watch
} from "./chunk-67UUJLDS.js";

// node_modules/.pnpm/@giscus+vue@2.3.0/node_modules/@giscus/vue/dist/index.mjs
var d = ["id", "host", "repo", "repoid", "category", "categoryid", "mapping", "term", "strict", "reactionsenabled", "emitmetadata", "inputposition", "theme", "lang", "loading"];
var l = defineComponent({
  __name: "Giscus",
  props: {
    id: {},
    host: {},
    repo: {},
    repoId: {},
    category: {},
    categoryId: {},
    mapping: {},
    term: {},
    theme: {},
    strict: {},
    reactionsEnabled: {},
    emitMetadata: {},
    inputPosition: {},
    lang: {},
    loading: {}
  },
  setup(s) {
    const t = ref(false);
    return onMounted(() => {
      t.value = true, import("./giscus-2a044aea-4NFHV4OS.js");
    }), (e, m) => t.value ? (openBlock(), createElementBlock("giscus-widget", {
      key: 0,
      id: e.id,
      host: e.host,
      repo: e.repo,
      repoid: e.repoId,
      category: e.category,
      categoryid: e.categoryId,
      mapping: e.mapping,
      term: e.term,
      strict: e.strict,
      reactionsenabled: e.reactionsEnabled,
      emitmetadata: e.emitMetadata,
      inputposition: e.inputPosition,
      theme: e.theme,
      lang: e.lang,
      loading: e.loading
    }, null, 8, d)) : createCommentVNode("", true);
  }
});

// node_modules/.pnpm/vitepress-plugin-comment-with-giscus@1.1.7/node_modules/vitepress-plugin-comment-with-giscus/lib/giscus.js
var setGiscus = (props = {}, frontmatter) => {
  var _a;
  const defaultProps = {
    id: "comment",
    host: "https://giscus.app",
    category: "General",
    mapping: "pathname",
    term: "Welcome to giscus!",
    reactionsEnabled: "1",
    inputPosition: "top",
    lang: "zh-CN",
    loading: "lazy",
    repo: "xxx/xxx",
    repoId: ""
  };
  let oldCommentContainer = document.getElementById("giscus");
  if (oldCommentContainer) {
    oldCommentContainer.parentNode.removeChild(oldCommentContainer);
  }
  if (!!(frontmatter == null ? void 0 : frontmatter.value) && ((frontmatter == null ? void 0 : frontmatter.value.comment) !== void 0 && !(frontmatter == null ? void 0 : frontmatter.value.comment))) {
    return;
  }
  if (!location.pathname || location.pathname === "/") {
    return;
  }
  const dark = !!((_a = document.querySelector("html")) == null ? void 0 : _a.className);
  const docContent = document.getElementsByClassName("content-container")[0];
  if (docContent) {
    const bindGiscus = document.createElement("div");
    bindGiscus.setAttribute("id", "giscus");
    bindGiscus.style.height = "auto";
    bindGiscus.style.marginTop = "40px";
    bindGiscus.style.borderTop = "1px solid var(--vp-c-divider)";
    bindGiscus.style.paddingTop = "20px";
    docContent.append(bindGiscus);
    createApp({
      render: () => {
        return h(l, { ...defaultProps, theme: dark ? "transparent_dark" : "light", ...props });
      }
    }).mount("#giscus");
  }
};
var setThemeWatch = () => {
  const element = document.querySelector("html");
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type == "attributes") {
        let comment = document.getElementById("comment");
        comment == null ? void 0 : comment.setAttribute("theme", element.className.indexOf("dark") !== -1 ? "transparent_dark" : "light");
      }
    });
  });
  observer.observe(element, {
    attributeFilter: ["class"]
  });
};
var giscusTalk = (props, vitepressObj) => {
  onMounted(() => {
    setGiscus(props, vitepressObj.frontmatter);
    setThemeWatch();
  });
  watch(() => vitepressObj.route.path, () => nextTick(() => {
    setGiscus(props, vitepressObj.frontmatter);
  }));
};
var giscus_default = giscusTalk;
export {
  giscus_default as default
};
//# sourceMappingURL=vitepress-plugin-comment-with-giscus.js.map
