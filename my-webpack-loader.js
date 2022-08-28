// custom-loader
module.exports = function myWebpackLoader (content) {
  console.log('myWebpackLoader가 동작함');
  return content.replace('console.log(', 'alert(');
}
