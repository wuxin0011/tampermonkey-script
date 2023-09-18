
const root = `
:root {
  --w-brand: #3aa675;
  --w-light: #e5e7eb;
  --w-white: #fff;
  --w-brand-light: #349469;
  --w-bg: #22272e;
  --w-bg-light: #2b313a;
  --w-bg-lighter: #262c34;
  --w-bg-dark: #343b44;
  --w-bg-darker: #37404c;
  --w-bg-darker: var(--w-bg-dark);
  --w-text: #adbac7;
  --w-text-light: #cbd4dc;
  --w-text-lighter: #cdd6dd;
  --w-text-lightest: #8094a8;
  --w-border: #3e4c5a;
  --w-border-dark: #34404c;
  --w-blue-link-hover:#00aeec;
  --w-skeleton:#494f57;
}
.dark body,
.dark #app {
  --v_bg1: var(--w-bg-darker);
  --v_bg2: var(--w-bg-darker);
  --v_bg3: var(--w-bg-darker);
  --v_bg1_float: var(--w-bg-darker);
  --v_bg2_float: var(--w-bg-darker);
  --v_text_white: var(--w-white);
  --v_text1: var(--w-text);
  --v_text2: var(--w-text-light);
  --v_text3: var(--w-text-lighter);
  --v_text4: var(--w-text-lightest);
  --v_line_light:  var(--w-text-lighter);
  --v_line_regular: var(--w-text-lighter);
  --v_line_bold:  var(--w-text-lightest);
  --v_graph_white:var(--w-text);
  --v_graph_bg_thin: var(--w-bg-darker);
  --v_graph_bg_regular: var(--w-bg-darker);
  --v_graph_bg_thick: var(--w-bg);
  --v_graph_weak:  var(--w-text);
  --v_graph_medium:  var(--w-text-light);
  --v_graph_icon: var(--w-text-lightest);
  --v_shadow: var(--w-text);
  --v_text_hover: var(--w-blue-link-hover);
  --v_text_active:var(--w-blue-link-hover);
  --v_text_disabled: #C9CCD0 ;
  --v_line_border: var(--w-text-lighter);
  --v_line_bolder_hover:  var(--w-text-lightest);
  --v_line_bolder_active: var(--w-text-lightest);
  --v_line_bolder_disabled: var(--w-text);
 

}

.dark body,
.dark #app {
  --bg1:  var(--v_bg1);
  --bg2:  var(--v_bg2);
  --bg3:  var(--v_bg3);
  --bg1_float: var(--v_bg1_float);
  --bg2_float: var(--v_bg2_float);
  --text_white: var(--v_text_white);
  --text1:  var(--v_text1);
  --text2: var(--v_text2);
  --text3:  var(--v_text3);
  --text4:  var(--v_text4);
  --line_light:  var(--v_line_light);
  --line_regular: var(--v_line_regular);
  --line_bold: var(--v_line_bold);
  --graph_white: var(--v_graph_white);
  --graph_bg_thin: var(--v_graph_bg_thin);
  --graph_bg_regular: var(--v_graph_bg_regular);
  --graph_bg_thick: var(--v_graph_bg_thick);
  --graph_weak: var(--w-text);
  --graph_medium: var(--w-text-light);
  --graph_icon: var(--w-text-lightest);
  --shadow: var(--w-text);
  --text_hover: var(--v_text_hover);
  --text_active: var(--v_text_active);
  --text_disabled:  var(--v_text_disabled);
  --line_border: var(--v_line_border);
  --line_bolder_hover: var(--v_line_bolder_hover);
  --line_bolder_active: var(--v_line_bolder_active);
  --line_bolder_disabled:  var(--v_line_bolder_disabled);
  --b_text1: var(--text1);
  --b_text2: var(--text2);
  --b_text3: var(--text3);
  --b_text4: var(--text4);
}
`


export default root
