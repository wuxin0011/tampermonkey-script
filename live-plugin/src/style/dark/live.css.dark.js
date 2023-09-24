


const css = `
  .dark .m-container {
    --m-container-background-color: var(--w-bg-darker);
  }
  

  .dark .m-select-dark-option,
  .dark .m-select-dark, .dark .m-dark-type-select,
  .dark .m-container {
    background-color: var(--m-container-background-color) !important;
    color:var(--w-text-light) !important;
  }


  .dark .m-container .m-link,
  .dark .m-container .m-link:visited {
    color: var(--w-text) !important;
  }
  
  .m-container .m-link:hover {
    color: var(--w-text-light) !important;
    text-decoration: underline !important;
  }
  
  

  .dark .m-container table tr,
  .dark .m-container table tbody tr:nth-child(1) 
   {
    border-color: var(--w-text-light) !important;
   }


   .dark .m-container .btn {
      background: var(--w-bg-darker) !important;
      outline:1px solid var(--w-text) !important;
      color: var(--w-text-light) !important;
   }

   .dark .m-container .btn:hover {
    background: var(--w-bg) !important;
    outline:1px solid var(--w-text-light) !important;
    color: var(--w-text) !important;
   }


`
export default css
