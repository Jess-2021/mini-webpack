let getModuleCode = require('./getFileCode').default

// 模块解析
exports.default = function parseModules(file) {
  const entry = getModuleCode(file) // 入口文件
  const temp = [entry]
  const depsGraph = {} // 最后输出的依赖图

  getDeps(temp, entry)

  temp.forEach((module) => {
    depsGraph[module.file] = {
      deps: module.deps,
      code: module.code
    }
  })

  return depsGraph
}

// 获取依赖
function getDeps(temp, { deps }) {
  Object.keys(deps).forEach(key => {
    const child = getModuleCode(deps[key])
    temp.push(child)
    getDeps(temp, child)
  })
}

const content = exports.default('./src/index.js')
console.log('content',content)
