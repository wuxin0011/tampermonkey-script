


const css = `
  .dark .m-container {
    --m-container-background-color: var(--w-bg-darker);
  }
  
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



`
export default css
