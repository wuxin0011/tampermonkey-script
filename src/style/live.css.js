import dark from './dark/live.css.dark'



const css = `
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

.m-container,
  .m-container .btn,
  .m-container table,
  .m-container table tbody,
  .m-container table thead,
  .m-container table tr {
    margin: 0 !important;
    padding: 0 !important;
    border: none;
    outline: none;
  }
  
  .m-container {
    --m-font-color: #fff;
    --m-container-background-color: #fff;
    --m-container-width: 700px;
    --m-container-height: 400px;
    --m-container-operation-right-width: 150px;
    --m-container-input-width: 150px;
    --m-container-box-transition: all 0.4s ease-in-out;
    --m-container-select-width: var(--m-container-input-width);
    --m-container-input-outline: 1px solid rgba(8, 125, 235, 0.6) !important;
  }
  
  .m-container {
    box-sizing: border-box !important;
    position: fixed !important;
    flex-direction: column !important;
    width: var(--m-container-width) !important;
    height: var(--m-container-height) !important;
    top: 100px !important;
    left: 50% !important;
    border-radius: 10px !important;
    overflow: hidden !important;
    background-color: var(--m-container-background-color) !important;
    z-index: 100000000 !important;
    padding: 15px !important;
    transition: var(--m-container-box-transition) !important;
    box-shadow: 20px 20px 10px rgba(0, 0, 0, 0.1),
      -1px -2px 18px rgba(0, 0, 0, 0.1) !important;
  
    opacity: 0;
    transform: translate(-50%, -150%);
  }
  
  .m-container-is-active {
    opacity: 1;
    transform: translate(-50%, 0%);
    z-index:100000000 !important;
  }
  
  .m-container-box {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    height: 100% !important;
  }
  
  .m-container .operation {
    box-sizing: border-box !important;
    height: auto !important;
    justify-content: start !important;
  }
  
  
  .m-container input[type="text"] {
    width: var(--m-container-input-width) !important;
    box-sizing: border-box !important;
    border: 1px solid rgba(8, 125, 235, 0.6) !important;
    outline: none !important;
    padding: 5px 10px !important;
    border-radius: 20px !important;
    transition: var(--m-container-box-transition);
  }
  
  .m-container input:focus {
    border: 1px solid rgba(8, 125, 235, 1) !important;
  }
  
  .m-container .operation input[type="checkbox"] {
    display: inline !important;
  }
  
  .m-container .operation input[type="file"] {
    display: none !important;
  }
  
  .m-container table {
    position: relative !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
    text-align: left !important;
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
  }
  
  .m-container table tr {
    margin: 5px 0 !important;
    display: flex !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4) !important;
    justify-content: space-between;
  }
  
  .m-container table tr td:nth-child(1),
  .m-container table thead th:nth-child(1) {
    width: 50px;
    text-align: center !important;
  }
  
  .m-container table tr td:nth-child(2),
  .m-container table tr td:nth-child(3),
  .m-container table tr td:nth-child(4),
  .m-container table thead th:nth-child(2),
  .m-container table thead th:nth-child(3),
  .m-container table thead th:nth-child(4) {
    flex: 1 !important;
    text-align: center !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  
  .m-container table tbody {
    flex: 1 !important;
    overflow: auto !important;
  }
  
  .m-container table th,
  .m-container table td {
    padding: 10px !important;
  }
  
  .m-container table tbody tr:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.4) !important;
  }
  
  .m-container .m-link,
  .m-container .m-link:visited {
    color: teal !important;
  }
  
  .m-container .m-link:hover {
    color: teal !important;
    text-decoration: underline !important;
  }
  
  .m-container .btn {
    cursor: pointer !important;
    padding: 5px 8px !important;
    border: none !important;
    max-width:50px !important;
    color: var(--m-font-color) !important;
    font-size: 1rem !important;
    border-radius: 20px !important;
    margin: 0 !important;
    background-color: rgba(166, 169, 173, 1) !important;
    z-index: 1000 !important;
    outline: none !important;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4), 0px 0px 1px rgba(0, 0, 0, 0.4) !important;
  }
  
  .m-container .btn:hover {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1) !important;
  }
  
  .m-container .btn:hover {
    background-color: rgba(166, 169, 173, 0.6) !important;
  }
  
  .m-container .btn-primary {
    background-color: rgba(64, 158, 255, 1) !important;
  }
  
  .m-container .btn-primary:hover {
    background-color: rgba(64, 158, 255, 0.6) !important;
  }
  
  .m-container .btn-success {
    background-color: rgba(103, 194, 58, 1) !important;
  }
  
  .m-container .btn-success:hover {
    background-color: rgba(103, 194, 58, 0.6) !important;
  }
  
  .m-container .btn-info {
    background-color: rgba(119, 119, 119, 1) !important;
  }
  
  .m-container .btn-info:hover {
    background-color: rgba(119, 119, 119, 0.6) !important;
  }
  
  .m-container .btn-warning {
    background-color: rgba(230, 162, 60, 1) !important;
  }
  
  .m-container .btn-warning:hover {
    background-color: rgba(230, 162, 60, 0.6) !important;
  }
  
  .m-container .btn-danger {
    background-color: rgba(245, 108, 108, 1) !important;
  }
  
  .m-container .btn-danger:hover {
    background-color: rgba(245, 108, 108, 0.6) !important;
  }
  
  #m-container-box1 {
    position: absolute !important;
    z-index: 10000000 !important;
    transition: var(--m-container-box-transition) !important;
    width: 100% !important;
    height: 100% !important;
  }
  
  #m-container-box2 {
    position: absolute !important;
    z-index: 9999 !important;
    transition: var(--m-container-box-transition) !important;
    ;
    width: 100% !important;
    height: 100% !important;
  }
  
  .m-ani-left-is-active {
    transform: translateX(0) !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
  
  .m-ani-left-is-close {
    transform: translateX(-100%) !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
  
  .m-ani-right-is-active {
    transform: translateX(0) !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
  
  .m-ani-right-is-close {
    transform: translateX(100%) !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
  
  .m-type-container .m-type-item {
    display: flex !important;
    height: 30px !important;
  }
  
  .m-type-container .m-type-item .m-type-item-left {
    flex: 1 !important;
    position: relative !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
  }
  
  .m-type-container .m-type-item .m-type-item-right {
    width: var(--m-container-operation-right-width);
    text-align: center !important;
  }
  
  .m-type-container .m-type-item .m-type-item-left .m-select-option-container,
  .m-type-container .m-type-item .m-type-item-left .m-select-input-container {
    transition: var(--m-container-box-transition) !important;
    position: absolute !important;
    width: 100% !important;
  }
  
  .m-type-container .m-select {
    display: flex !important;
  }
  
  .m-type-container .m-select .m-select-item {
    margin-right: 10px !important;
  }
  
  .m-type-container .m-select .m-select-item:last-child {
    margin-right: 0 !important;
  }
  
  .m-type-container .m-select select {
    width: 100px !important;
    color: rgba(119, 119, 119, 0.9) !important;
  }
  
  .m-type-container .m-select select::placeholder {
    color: rgba(119, 119, 119, 0.9) !important;
  }
  
  .m-type-container .m-tag-select {
    width: calc(var(--m-container-select-width)/2) !important;
    outline: none !important;
    border: 1px solid rgba(8, 125, 235, 0.6) !important;
    padding: 5px 8px !important;
    padding: 5px 10px !important;
  }
  
  .m-container select {
    border: 1px solid rgba(8, 125, 235, 1) !important;
  }
  
  
  .m-type-container .m-select .m-option-default {
    color: rgba(119, 119, 119, 0.6) !important;
  }
  
  .m-type-container input[type="text"] {
    width: 350px !important;
  }
  
  .m-type-container .m-select input {
    width: var(--m-container-input-width) !important;
  }
  
  .m-type-container .m-search-msg {
    color: red !important;
  }
  
  .m-span-text {
      transition: all 0.3s ease;
      cursor: pointer !important;
      opacity: 0;
      float:right;
      display:inline-block;
      margin:0 10px;
      transform: scale(0.5);
      font-size:20px;
      position:relative;
  }

  .m-span-text::before{
      content:"🧹";
      cursor: pointer !important;
  }
  
  .m-container-display-block{
     display:block !important;
  }
  .m-container-display-none{
     display:none !important;
  }

  ${dark}

`
export default css
