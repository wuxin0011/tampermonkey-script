import dark from './dark/live.css.dark'
import root from './dark/root.dark'
import { is_bilibili, is_douyin } from '../utils'

const css = `
${root}
.m-container,
  .m-container .btn,
  .m-container table,
  .m-container table tbody,
  .m-container table thead,
  .m-container table tr {
    margin: 0 ;
    padding: 0 ;
    border: none;
    outline: none;
  }
  
  .m-container {
    --m-font-color: #fff;
    --m-container-background-color: #fff;
    --m-container-width: 800px;
    --m-container-height: 400px;
    --m-container-operation-right-width: 150px;
    --m-container-input-width: ${is_bilibili ? '200px' : '100px'};
    --m-container-box-transition: all 0.5s ease-in-out;
    --m-container-select-width: var(--m-container-input-width);
    --m-container-input-outline: 1px solid rgba(8, 125, 235, 0.6) ;
  }
  
  .m-container {
    box-sizing: border-box ;
    position: fixed ;
    flex-direction: column ;
    width: var(--m-container-width) ;
    height: var(--m-container-height) ;
    top: 100px ;
    left: 50% ;
    border-radius: 10px ;
    overflow: hidden ;
    background-color: var(--m-container-background-color) ;
    z-index: ${is_douyin ? '10' : '100000000'} ;
    padding: 15px ;
    transition: var(--m-container-box-transition) ;
    box-shadow: 20px 20px 10px rgba(0, 0, 0, 0.1),
      -1px -2px 18px rgba(0, 0, 0, 0.1) ;
  
    opacity: 0;
    transform: translate(-50%, -150%);
  }
  
  .m-container-is-active {
    opacity: 1;
    transform: translate(-50%, 0%);
    z-index:100000000 ;
  }
  
  .m-container-box {
    display: flex ;
    flex-direction: column ;
    width: 100% ;
    height: 100% ;
  }
  
  .m-container .operation {
    box-sizing: border-box ;
    height: auto ;
    justify-content: start ;
  }
  
  
  .m-container input[type="text"] {
    width: var(--m-container-input-width) ;
    box-sizing: border-box ;
    border: 1px solid rgba(8, 125, 235, 0.6) ;
    outline: none ;
    padding: 5px 10px ;
    border-radius: 20px ;
    transition: var(--m-container-box-transition);
  }
  
  .m-container input:focus {
    border: 1px solid rgba(8, 125, 235, 1) ;
  }
  
  .m-container .operation input[type="checkbox"] {
    display: inline ;
  }
  
  .m-container .operation input[type="file"] {
    display: none ;
  }
  
  .m-container table {
    position: relative ;
    box-sizing: border-box ;
    overflow: hidden ;
    text-align: left ;
    flex: 1 ;
    display: flex ;
    flex-direction: column ;
  }
  
  .m-container table tr {
    margin: 5px 0 ;
    display: flex ;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4) ;
    justify-content: space-between;
  }
  
  .m-container table tr td:nth-child(1),
  .m-container table thead th:nth-child(1) {
    width: 50px;
    text-align: center ;
  }
  
  .m-container table tr td:nth-child(2),
  .m-container table tr td:nth-child(3),
  .m-container table tr td:nth-child(4),
  .m-container table thead th:nth-child(2),
  .m-container table thead th:nth-child(3),
  .m-container table thead th:nth-child(4) {
    flex: 1 ;
    text-align: center ;
    white-space: nowrap ;
    overflow: hidden ;
    text-overflow: ellipsis ;
  }
  
  .m-container table tbody {
    flex: 1 ;
    overflow: auto ;
  }
  
  .m-container table th,
  .m-container table td {
    padding: 10px ;
  }
  
  .m-container table tbody tr:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.4) ;
  }
  
  .m-container .m-link,
  .m-container .m-link:visited {
    color: teal ;
  }
  
  .m-container .m-link:hover {
    color: blue ;
    text-decoration: underline ;
  }
  
  .m-container .btn {
    cursor: pointer ;
    padding: 5px 8px ;
    border: none ;
    max-width:50px ;
    color: var(--m-font-color) ;
    font-size: 1rem ;
    border-radius: 20px ;
    margin: 0 ;
    background-color: rgba(166, 169, 173, 1) ;
    z-index: 1000 ;
    outline: none ;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4), 0px 0px 1px rgba(0, 0, 0, 0.4) ;
  }
  
  .m-container .btn:hover {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1) ;
  }
  
  .m-container .btn:hover {
    background-color: rgba(166, 169, 173, 0.6) ;
  }
  
  .m-container .btn-primary {
    background-color: rgba(64, 158, 255, 1) ;
  }
  
  .m-container .btn-primary:hover {
    background-color: rgba(64, 158, 255, 0.6) ;
  }
  
  .m-container .btn-success {
    background-color: rgba(103, 194, 58, 1) ;
  }
  
  .m-container .btn-success:hover {
    background-color: rgba(103, 194, 58, 0.6) ;
  }
  
  .m-container .btn-info {
    background-color: rgba(119, 119, 119, 1) ;
  }
  
  .m-container .btn-info:hover {
    background-color: rgba(119, 119, 119, 0.6) ;
  }
  
  .m-container .btn-warning {
    background-color: rgba(230, 162, 60, 1) ;
  }
  
  .m-container .btn-warning:hover {
    background-color: rgba(230, 162, 60, 0.6) ;
  }
  
  .m-container .btn-danger {
    background-color: rgba(245, 108, 108, 1) ;
  }
  
  .m-container .btn-danger:hover {
    background-color: rgba(245, 108, 108, 0.6) ;
  }
  
  #m-container-box1 {
    position: absolute ;
    z-index: 10000000 ;
    transition: var(--m-container-box-transition) ;
    width: 100% ;
    height: 100% ;
  }
  
  #m-container-box2 {
    position: absolute ;
    z-index: 9999 ;
    transition: var(--m-container-box-transition) ;
    width: 100% ;
    height: 100% ;
  }
  
  .m-ani-left-is-active {
    transform: translateX(0) ;
    visibility: visible ;
    opacity: 1 ;
  }
  
  .m-ani-left-is-close {
    transform: translateX(-100%) ;
    visibility: hidden ;
    opacity: 0 ;
  }
  
  .m-ani-right-is-active {
    transform: translateX(0) ;
    visibility: visible ;
    opacity: 1 ;
  }
  
  .m-ani-right-is-close {
    transform: translateX(100%) ;
    visibility: hidden ;
    opacity: 0 ;
  }
  
  .m-type-container .m-type-item {
    display: flex ;
    height: 30px ;
  }
  
  .m-type-container .m-type-item .m-type-item-left {
    flex: 1 ;
    position: relative ;
    box-sizing: border-box ;
    overflow: hidden ;
  }
  
  .m-type-container .m-type-item .m-type-item-right {
    width: var(--m-container-operation-right-width);
    text-align: center ;
  }
  
  .m-type-container .m-type-item .m-type-item-left .m-select-option-container,
  .m-type-container .m-type-item .m-type-item-left .m-select-input-container {
    transition: var(--m-container-box-transition) ;
    position: absolute ;
    width: 100% ;
  }
  
  .m-type-container .m-select {
    display: flex ;
  }
  
  .m-type-container .m-select .m-select-item {
    margin-right: 10px ;
  }
  
  .m-type-container .m-select .m-select-item:last-child {
    margin-right: 0 ;
  }
  
  .m-type-container .m-select select {
    width: 100px ;
    color: rgba(119, 119, 119, 0.9) ;
  }
  
  .m-type-container .m-select select::placeholder {
    color: rgba(119, 119, 119, 0.9) ;
  }
  
  .m-type-container .m-tag-select {
    width: calc(var(--m-container-select-width)/2) ;
    outline: none ;
    border: 1px solid rgba(8, 125, 235, 0.6) ;
    padding: 5px 8px ;
    padding: 5px 10px ;
  }
  
  .m-container select {
    border: 1px solid rgba(8, 125, 235, 1) ;
  }
  
  
  .m-type-container .m-select .m-option-default {
    color: rgba(119, 119, 119, 0.6) ;
  }
  
  .m-type-container input[type="text"] {
    width: 350px ;
  }
  
  .m-type-container .m-select input {
    width: var(--m-container-input-width) ;
  }
  
  .m-type-container .m-search-msg {
    color: red ;
  }
  

  .m-container-display-block{
     display:block !important;
  }
  .m-container-display-none{
     display:none !important;
  }

  .m-container .m-link:hover {
    color: var(--w-text-light) ;
    text-decoration: underline ;
  }
  
  


  ${dark}

`
export default css
