(function(moduleList) {
  function require(moduleName) {
    var exports = {}
    ;(function(exports, code) {
      eval(code)
    })(exports, moduleList[moduleName])

    return exports
  }
  require('index.js')
})({
  'index.js': "let add = require('add.js').default;debugger;console.log('Jarar', add(5, 1))",
  'add.js': "exports.default = function(a, b) {return a + b}"
})