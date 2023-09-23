// ==UserScript==
// @name         bilibili-tag-shield
// @namespace    npm/vite-plugin-monkey
// @version      0.0.1
// @author       monkey
// @description  bilibilib标签精准屏蔽
// @icon         https://vitejs.dev/logo.svg
// @match        *://www.baidu.com/*
// @match        *://www.bilibili.com/*
// @require      https://cdn.bootcdn.net/ajax/libs/vue/3.3.4/vue.global.prod.js
// @require      https://cdn.bootcdn.net/ajax/libs/element-plus/2.3.14/index.full.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/element-plus/2.3.14/index.css
// @grant        GM_addStyle
// @grant        GM_setValue
// ==/UserScript==

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const a=document.createElement("style");a.textContent=t,document.head.append(a)})(" .m-title-item[data-v-34552631]{margin:5px 0 10px!important}.el-tag[data-v-34552631]{margin:5px}.el-col[data-v-34552631]{margin:5px 0}.m-select-tags[data-v-34552631]{max-height:60vh;overflow:hidden auto}.m-title-item[data-v-d25533ae]{margin:5px!important}.select-item[data-v-d25533ae]{margin-top:20px}.m-title-item[data-v-f30296c7]{margin:5px!important}.el-tag[data-v-f30296c7]{margin:5px}.m-add-keywords-tag[data-v-f30296c7]{width:100px}.m-title-item[data-v-3c87277a]{margin:5px!important}.select-item[data-v-897e1cdd]{margin-top:20px}.m-setting-button[data-v-cb59291a]{position:fixed;top:200px;right:0;z-index:10000000} ");

(function (vue, ElementPlus) {
  'use strict';

  const colors = ["warning", "danger", "info", "success"];
  const random = (array) => {
    if (!array || !Array.isArray(array)) {
      return;
    }
    return Math.floor(Math.random() * (array.length + 1));
  };
  const randomColor = () => colors[random(colors)];
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _hoisted_1$1 = { class: "m-select-tags" };
  const _sfc_main$5 = {
    __name: "VideoTag",
    setup(__props) {
      const input1 = vue.ref("");
      const value = vue.ref([]);
      const options = [
        {
          value: "HTML",
          label: "HTML"
        },
        {
          value: "CSS",
          label: "CSS"
        },
        {
          value: "JavaScript",
          label: "JavaScript"
        }
      ];
      vue.onMounted(() => {
      });
      return (_ctx, _cache) => {
        const _component_el_alert = vue.resolveComponent("el-alert");
        const _component_el_option = vue.resolveComponent("el-option");
        const _component_el_select = vue.resolveComponent("el-select");
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_col = vue.resolveComponent("el-col");
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_row = vue.resolveComponent("el-row");
        const _component_el_tag = vue.resolveComponent("el-tag");
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createVNode(_component_el_alert, {
            title: "视频标签屏蔽",
            type: "info",
            class: "m-title-item"
          }),
          vue.createVNode(_component_el_row, null, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_col, { span: 24 }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_select, {
                    style: { "width": "300px" },
                    modelValue: value.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
                    multiple: "",
                    filterable: "",
                    "allow-create": "",
                    "default-first-option": "",
                    "reserve-keyword": false,
                    placeholder: "Choose tags for your article"
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(options, (item) => {
                        return vue.createVNode(_component_el_option, {
                          key: item.value,
                          label: item.label,
                          value: item.value
                        }, null, 8, ["label", "value"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue"]),
                  vue.createVNode(_component_el_button, { type: "primary" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("确认")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_col, { span: 24 }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_input, {
                    modelValue: input1.value,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => input1.value = $event),
                    style: { "width": "300px" },
                    placeholder: "查找已过滤标签 请输入关键字"
                  }, null, 8, ["modelValue"]),
                  vue.createVNode(_component_el_button, { type: "primary" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("搜索")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          vue.createElementVNode("div", _hoisted_1$1, [
            (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(100, (i) => {
              return vue.createVNode(_component_el_tag, {
                type: vue.unref(randomColor)(),
                closable: ""
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("宠物" + vue.toDisplayString(i), 1)
                ]),
                _: 2
              }, 1032, ["type"]);
            }), 64))
          ])
        ]);
      };
    }
  };
  const VideoTag = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-34552631"]]);
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  const _sfc_main$4 = {
    __name: "VideoRoom",
    setup(__props) {
      const input1 = vue.ref("");
      vue.ref(false);
      console.log("GM_setValue", _GM_setValue);
      const tableData = [
        {
          name: "username1",
          roomId: "roomId1"
        },
        {
          name: "username2",
          roomId: "roomId2"
        },
        {
          name: "username2",
          roomId: "roomId2"
        }
      ];
      return (_ctx, _cache) => {
        const _component_el_alert = vue.resolveComponent("el-alert");
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_table_column = vue.resolveComponent("el-table-column");
        const _component_el_table = vue.resolveComponent("el-table");
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createVNode(_component_el_alert, {
            title: "房间号屏蔽",
            type: "info ",
            class: "m-title-item"
          }),
          vue.createElementVNode("div", null, [
            vue.createVNode(_component_el_input, {
              modelValue: input1.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => input1.value = $event),
              style: { "width": "50%" },
              placeholder: "请输入房间号或者视频地址"
            }, null, 8, ["modelValue"]),
            vue.createVNode(_component_el_button, { type: "primary" }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("搜索")
              ]),
              _: 1
            })
          ]),
          vue.createVNode(_component_el_table, {
            data: tableData,
            height: "250",
            style: { "width": "auto" }
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_table_column, {
                label: "序号",
                width: "120",
                type: "index"
              }),
              vue.createVNode(_component_el_table_column, {
                prop: "name",
                label: "名称",
                width: "120"
              }),
              vue.createVNode(_component_el_table_column, {
                prop: "roomId",
                label: "房间号",
                width: "320"
              }),
              vue.createVNode(_component_el_table_column, { label: "操作" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_button, { type: "danger" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("删除")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]);
      };
    }
  };
  const VideoRoom = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-d25533ae"]]);
  const Type = {
    "room": "key",
    "tag": "wx_bilibili_tag",
    "keywords": "wx_bilibili_keywords",
    "regex": "wx_bilibili_regex"
  };
  const _sfc_main$3 = {
    __name: "VideoKeywords",
    setup(__props) {
      const inputValue = vue.ref("");
      const dynamicTags = vue.ref(["Tag 1", "Tag 2", "Tag 3"]);
      const inputVisible = vue.ref(false);
      const InputRef = vue.ref();
      const handleClose = (tag) => {
        console.log("handler close", tag);
        dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
      };
      const showInput = () => {
        inputVisible.value = true;
        vue.nextTick(() => {
          console.log("InputRef.value", InputRef.value);
        });
      };
      const handleInputConfirm = () => {
        if (inputValue.value) {
          dynamicTags.value.push(inputValue.value);
        }
        inputVisible.value = false;
        inputValue.value = "";
      };
      vue.onMounted(() => {
      });
      return (_ctx, _cache) => {
        const _component_el_alert = vue.resolveComponent("el-alert");
        const _component_el_tag = vue.resolveComponent("el-tag");
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_button = vue.resolveComponent("el-button");
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createVNode(_component_el_alert, {
            title: "关键字屏蔽",
            type: "info",
            class: "m-title-item"
          }),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(dynamicTags.value, (tag) => {
            return vue.openBlock(), vue.createBlock(_component_el_tag, {
              key: tag,
              class: "mx-1",
              "disable-transitions": false,
              onClose: ($event) => handleClose(tag),
              closable: ""
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(vue.toDisplayString(tag), 1)
              ]),
              _: 2
            }, 1032, ["onClose"]);
          }), 128)),
          inputVisible.value ? (vue.openBlock(), vue.createBlock(_component_el_input, {
            key: 0,
            ref_key: "InputRef",
            ref: InputRef,
            modelValue: inputValue.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputValue.value = $event),
            class: "m-add-keywords-tag",
            size: "small",
            onKeyup: vue.withKeys(handleInputConfirm, ["enter"]),
            onBlur: handleInputConfirm
          }, null, 8, ["modelValue", "onKeyup"])) : (vue.openBlock(), vue.createBlock(_component_el_button, {
            key: 1,
            size: "small",
            onClick: showInput
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(" + New Tag ")
            ]),
            _: 1
          }))
        ]);
      };
    }
  };
  const VideoKeywords = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-f30296c7"]]);
  const _sfc_main$2 = {
    __name: "VideoRegex",
    setup(__props) {
      const regex = vue.ref("");
      vue.onMounted(() => {
      });
      return (_ctx, _cache) => {
        const _component_el_alert = vue.resolveComponent("el-alert");
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_col = vue.resolveComponent("el-col");
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_row = vue.resolveComponent("el-row");
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createVNode(_component_el_alert, {
            title: "正则匹配",
            type: "info",
            class: "m-title-item"
          }),
          vue.createVNode(_component_el_row, null, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_col, { span: 14 }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_input, {
                    modelValue: regex.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => regex.value = $event),
                    style: {}
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_col, { span: 3 }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_button, { type: "primary" }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("确认")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]);
      };
    }
  };
  const VideoRegex = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-3c87277a"]]);
  const _sfc_main$1 = {
    __name: "Container",
    setup(__props) {
      const type = vue.ref(Type.room);
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_button_group = vue.resolveComponent("el-button-group");
        const _component_el_col = vue.resolveComponent("el-col");
        const _component_el_row = vue.resolveComponent("el-row");
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createVNode(_component_el_button_group, null, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_button, {
                type: "primary",
                onClick: _cache[0] || (_cache[0] = ($event) => type.value = vue.unref(Type).room)
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("房间号")
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_button, {
                type: "primary",
                onClick: _cache[1] || (_cache[1] = ($event) => type.value = vue.unref(Type).tag)
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("标签")
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_button, {
                type: "primary",
                onClick: _cache[2] || (_cache[2] = ($event) => type.value = vue.unref(Type).keywords)
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("关键字")
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_button, {
                type: "primary",
                onClick: _cache[3] || (_cache[3] = ($event) => type.value = vue.unref(Type).regex)
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("正则")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_row, { gutter: "20" }, {
            default: vue.withCtx(() => [
              type.value == vue.unref(Type).room ? (vue.openBlock(), vue.createBlock(_component_el_col, {
                key: 0,
                class: "select-item"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(VideoRoom)
                ]),
                _: 1
              })) : vue.createCommentVNode("", true),
              type.value == vue.unref(Type).tag ? (vue.openBlock(), vue.createBlock(_component_el_col, {
                key: 1,
                class: "select-item"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(VideoTag)
                ]),
                _: 1
              })) : vue.createCommentVNode("", true),
              type.value == vue.unref(Type).keywords ? (vue.openBlock(), vue.createBlock(_component_el_col, {
                key: 2,
                class: "select-item"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(VideoKeywords)
                ]),
                _: 1
              })) : vue.createCommentVNode("", true),
              type.value == vue.unref(Type).regex ? (vue.openBlock(), vue.createBlock(_component_el_col, {
                key: 3,
                class: "select-item"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(VideoRegex)
                ]),
                _: 1
              })) : vue.createCommentVNode("", true)
            ]),
            _: 1
          })
        ]);
      };
    }
  };
  const Container = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-897e1cdd"]]);
  const _withScopeId = (n) => (vue.pushScopeId("data-v-cb59291a"), n = n(), vue.popScopeId(), n);
  const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("h1", null, "欢迎使用Bilibili视频屏蔽插件", -1));
  const _sfc_main = {
    __name: "App",
    setup(__props) {
      const drawer = vue.ref(false);
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_drawer = vue.resolveComponent("el-drawer");
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("div", null, [
            vue.createVNode(_component_el_button, {
              type: "primary",
              style: { "margin-left": "16px" },
              onClick: _cache[0] || (_cache[0] = ($event) => drawer.value = !drawer.value),
              class: "m-setting-button"
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(" 设置 ")
              ]),
              _: 1
            })
          ]),
          vue.createVNode(_component_el_drawer, {
            modelValue: drawer.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => drawer.value = $event),
            "with-header": false,
            size: "40%"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(Container)
            ]),
            footer: vue.withCtx(() => [
              _hoisted_1
            ]),
            _: 1
          }, 8, ["modelValue"])
        ], 64);
      };
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cb59291a"]]);
  const VueApp = vue.createApp(App);
  const start = () => {
    const app = document.createElement("div");
    const body = document.querySelector("body");
    body.append(app);
    return app;
  };
  VueApp.use(ElementPlus).mount(start());

})(Vue, Element-Plus);