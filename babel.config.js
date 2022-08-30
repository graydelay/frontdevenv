module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        chrome: '79',
        ie: '11'
      },
      useBuiltIns: 'usage', // Polyfill 사용 방식 지정 (ex. 'entry', false)
      corejs: {
        version: 2
      }
    }]
  ]
}
