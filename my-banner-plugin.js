const childProcess = require('child_process');

function banner() {
  const data = new Date().toLocaleString();
  const banner = [
    '이것은 BannerPlugin이 처리한 결과입니다.',
    `Build Data: ${data}`,
    `Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}`,
    `Author: ${childProcess.execSync('git config user.name')}`
  ].join('\n');

  return banner;
}

module.exports = banner;
