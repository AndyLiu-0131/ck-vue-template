import devConf from '../../devConfig'
import config from '../../config'
let baseInfo = config
if (process.env.NODE_ENV === 'development') {
  baseInfo = devConf
}

export default baseInfo
