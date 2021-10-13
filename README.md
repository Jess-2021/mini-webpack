# Super mini-webpack demo
The imitator of Webpack that generating dependency graph for web project.


- 模拟webpack打包生成IIFE的过程。包括了：
  - 从入口生成依赖树;
  - 到递归分析依赖;
  - 最后生成依赖图。

- 模拟require的实现。