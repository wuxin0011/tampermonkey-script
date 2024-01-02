
import root from "./root.dark"

const liveDarkCss = `

${root}


  .dark.m-container {
    --m-container-background-color: var(--w-bg-darker);
  }
  

  .dark .m-select-dark-option,
  .dark .m-select-dark,.dark .m-dark-type-select,
  .dark.m-container {
    background-color: var(--m-container-background-color) ;
    color:var(--w-text-light) ;
  }


  .dark.m-container .m-link,
  .dark.m-container .m-link:visited {
    color: var(--w-text) ;
  }
  


  .dark.m-container table tr,
  .dark.m-container table tbody tr:nth-child(1) 
   {
    border-color: var(--w-text-light) ;
   }





`

export default liveDarkCss
