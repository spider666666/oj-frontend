const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,

  //对monaco-editor进行整合（链式的整合方法）
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  }
});
