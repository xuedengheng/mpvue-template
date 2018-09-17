let webim = null
if(window) {
  webim = require('./lib-js/webim')
} else {
  webim = require('./lib-wx/webim')
}
export default webim.default
