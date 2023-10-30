import anime from './anime'
import blackboard from './blackboard'
import common from './common'
import douga from './douga'
import guochuang from './guochuang'
import home from './home'
import other from './other'
import read from './read'
import space from './space'
import t from './t'
import video from './video'
import  bangumi from './bangumi'
import  account from './account'


const router =
  `
${home}
${video}
${space}
${blackboard}
${t}
${anime}
${guochuang}
${douga}
${read}
${bangumi}
${account}
`

const dark =
  `
${common}
${router}
${other}

`


export default dark
