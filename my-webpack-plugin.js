const { Compilation } = require("webpack");

class MyWebpackPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('My Plugin', stats => { // 플러그인이 종료될 때 실행
      console.log('MyPlugin: done'); // callback function
    });

    compiler.hooks.emit.tapAsync('My Plugin', (compilation, callback) => {
      const source = compilation.assets['main.js'].source();
      console.log(source);

      callback();
    })
  }
}

module.exports = MyWebpackPlugin;
