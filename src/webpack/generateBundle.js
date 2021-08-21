var fs = require('fs')
var parseModules = require('./parseModules').default

function bundle(file) {
  const depsGraph = JSON.stringify(parseModules(file))
  return `(function (graph) {
    function require(file) {
        function absRequire(relPath) {
            return require(graph[file].deps[relPath])
        }
        var exports = {};
        (function (require,exports,code) {
            eval(code)
        })(absRequire,exports,graph[file].code)
        return exports
    }
    require('${file}')
  })(${depsGraph})`;
}

const content = bundle("./src/index.js");

!fs.existsSync("./dist") && fs.mkdirSync("./dist");
fs.writeFileSync("./dist/bundle.js", content);