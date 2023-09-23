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
`

const dark =
  `
${common}
${router}
${other}

`


export default dark
