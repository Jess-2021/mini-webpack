const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

function getModuleCode(file) {
  // 读取文件
  const body = fs.readFileSync(file, 'utf-8')

  // 转化为AST
  const ast = parser.parse(body, {
    sourceType: "module"
  })

  // 收集依赖
  const deps = {}
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file)
      const abspath = "./" + path.join(dirname, node.source.value)

      deps[node.source.value] = abspath
    }
  })

  // ES6转成ES5
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  })
  const moduleInfo = { file, deps, code }

  return moduleInfo
}

const code = getModuleCode('./src/add.js') // 针对于根目录下
console.log("code", code)