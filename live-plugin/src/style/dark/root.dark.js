const root = `
html {
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
  --w-white: #fff;
}


::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 10;
}
::view-transition-new(root) {
  z-index: 10000;
}
.dark::view-transition-old(root) {
  z-index: 10000;
}
.dark::view-transition-new(root) {
  z-index: 10;
}
`

export default root
