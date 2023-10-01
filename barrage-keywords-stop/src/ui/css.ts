const style = `
 
  .m-dm-container {
    --dm-container-width: 500px;
    --dm-container-height: 300px;
    --dm-input-add-keywords-width: 120px;
    --dm-input-time-width: 20px;
    --dm-container-background-color: 30, 23, 37;
    --dm-font-color: #fff;
    --dm-font-color-hover: #000;
    --dm-background-color: 0, 0, 0;
    --dm-background-color-hover: #fff;
    --dm-border-color: #fff;
    --dm-border-color-hover: #000;
  }




  .m-dm-container {
    width: var(--dm-container-width) ;
    height: var(--dm-container-height) ;
    background-color: rgba(var(--dm-container-background-color), 1) ;
    position: fixed ;
    display: flex ;
    flex-direction: column ;
    box-sizing: border-box ;
    box-shadow: 2px 2px 10px rgba(var(--dm-background-color), 0.7) ;
    border-radius: 10px ;
    position: fixed ;
    right: 0 ;
    top: 100px ;
    border: none ;
    transition: transform ease-in-out 0.5s ;
    z-index: 999999 ;
    box-sizing: border-box ;
    padding: 10px ;
  }

  .m-dm-input-animation-time,
  .m-dy-input-add-keywords {
    width: var(--dm-input-add-keywords-width) ;
    padding: 8px 12px ;
    border: none ;
    outline: none ;
    margin-left: 10px ;
    margin-top: 10px ;
    border-radius: 10px ;
  }

  .m-dm-input-animation-time,
  .m-dy-input-add-keywords:focus {
    border: none ;
    outline: none ;
  }

  .m-dm-input-animation-time {
    width: var(--dm-input-time-width) ;
  }

  .m-dm-install-link {
    display:inline-block ;
    float:right ;
    right:5px ;
    color: var(--dm-font-color) ;
  }



  .m-dm-container-header,
  .m-dm-container-footer {
    height: 44px ;
    position: relative  ;
  }

  .m-dm-container-header #m-dm-close-btn {
    float:right ;
    right: 3px ;
    color: var(--dm-font-color) ;
    font-size: 30px ;
    cursor: pointer  ;
    position: absolute  ;
  }


  .m-dm-container-body {
    flex: 1 ;
    overflow: auto ;
  }

  .m-dm-keywords-tag {
    display: inline-block ;
    padding: 5px ;
    background-color: var(--dm-background-color) ;
    border: none ;
    margin: 5px ;
    cursor: pointer ;
    color: var(--dm-font-color) ;
    font-size: 12px ;
    outline: 1px solid var(--dm-border-color) ;
    border-radius: 10px ;
  }

  .m-dm-keywords-tag:hover {
    background-color:var(--dm-font-color);
    color:var(--dm-font-color-hover);
  }


  .m-dm-time-button,
  .m-dm-all-keywords-button,
  .m-dm-delete-keywords-button,
  .m-dm-add-keywords-button {
    display: inline-block ;
    padding: 4px 8px ;
    text-align: center ;
    border: none ;
    outline: none ;
    background-color: var(--dm-background-color-hover) ;
    color: var(--dm-font-color-hover) ;
    cursor: pointer ;
    border: 1px solid var(--dm-border-color) ;
    border-radius: 10px ;
  }

  
  .m-dm-time-button:hover,
  .m-dm-all-keywords-button:hover,
  .m-dm-delete-keywords-button:hover,
  .m-dm-add-keywords-button:hover {
    background-color: rgb(var(--dm-background-color)) ;
    color: var(--dm-font-color) ;
    border: 1px solid var(--dm-border-color) ;

  }

  .m-dm-container-footer {
    box-sizing: border-box ;
    padding: 10px ;
  }

  .m-dm-container-footer .message-tip{
    color: var(--dm-font-color) ;
    opacity:1;
    display:inline-block;
    transition:opacity 0.5s ease-out;
  }


  .m-dm-ani-close {
    transform: translateX(var(--dm-container-width)) ;
  }

  .m-dm-container-body {
    overflow: auto ;
    -webkit-overflow-scrolling: touch ;
    scrollbar-width: thin ;
    scrollbar-color: #888888 #f0f0f0 ;
    -webkit-overflow-scrolling: touch ;
    scrollbar-width: none ;
    -ms-overflow-style: none ;
  }



  .m-dm-container-body::-webkit-scrollbar {
    width: 4px ;
  }

  .m-dm-container-body::-webkit-scrollbar-track {
    background-color: rgb(22, 24, 35) ;
  }

  .m-dm-container-body::-webkit-scrollbar-thumb {
    background-color: #333 ;
    border-radius: 4px ;
  }


  
  `

  export default style
