const root = `
:root {
  --w-brand: #3aa675;
  --w-light: #e5e7eb;
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
  --v_line_light: var(--line_light, #F1F2F3);
  --v_line_regular: var(--line_regular, #E3E5E7);
  --v_line_bold: var(--line_bold, #C9CCD0);
  --v_graph_white: var(--graph_white, #FFFFFF);
  --v_graph_bg_thin: var(--w-bg-darker);
  --v_graph_bg_regular: var(--w-bg-darker);
  --v_graph_bg_thick: var(--graph_bg_thick, #E3E5E7);
  --v_graph_weak: var(--graph_weak, #C9CCD0);
  --v_graph_medium: var(--graph_medium, #9499A0);
  --v_graph_icon: var(--graph_icon, #61666D);
  --v_shadow: var(--shadow, #000000);
  --v_text_hover: var(--w-blue-link-hover);
  --v_text_active:var(--w-blue-link-hover);
  --v_text_disabled: #C9CCD0 ;
  --v_line_border: var(--w-border-dark);
  --v_line_bolder_hover: var(--w-border);
  --v_line_bolder_active: var(--w-border-dark);
  --v_line_bolder_disabled: var(--w-border);
  --text_hover:  var(--w-blue-link-hover);
  --text_active:  var(--w-blue-link-hover);
  --text_disabled: var(--Ga3);
  --line_border: var(--w-border);
  --line_bolder_hover: var(--w-border-dark);
  --line_bolder_active:  var(--w-border-dark);
  --line_bolder_disabled:var(--w-border);
}

.dark body,
.dark #app {
  --text1: var(--w-text);
  --text2: var(--w-text-light);
  --text3: var(--w-text-lighter);
  --bg1: var(--w-bg-darker);
  --bg2: var(--w-bg-darker);
  --bg3: var(--w-bg-darker);
  --bg1_float: var(--w-bg-darker);
  --bg2_float: var(--w-bg-darker);
  --text_white: var(--w-white);
  --text1: var(--w-text);
  --text2: var(--w-text-light);
  --text3: var(--w-text-lighter);
  --text4: var(--w-text-lightest);
  --line_light: var(--line_light, #F1F2F3);
  --line_regular: var(--line_regular, #E3E5E7);
  --line_bold: var(--line_bold, #C9CCD0);
  --graph_white: var(--graph_white, #FFFFFF);
  --graph_bg_thin: var(--w-bg-darker);
  --graph_bg_regular: var(--w-bg-darker);
  --graph_bg_thick: var(--graph_bg_thick, #E3E5E7);
  --graph_weak: var(--graph_weak, #C9CCD0);
  --graph_medium: var(--graph_medium, #9499A0);
  --graph_icon: var(--graph_icon, #61666D);
  --shadow: var(--shadow, #000000);
  --text_hover: var(--w-blue-link-hover);
  --text_active:var(--w-blue-link-hover);
  --text_disabled: #C9CCD0 ;
  --line_border: var(--w-border-dark);
  --line_bolder_hover: var(--w-border);
  --line_bolder_active: var(--w-border-dark);
  --line_bolder_disabled: var(--w-border);
  --text_hover:  var(--w-blue-link-hover);
  --text_active:  var(--w-blue-link-hover);
  --text_disabled: var(--Ga3);
}
`


export default root
