function banner() {
  const data = new Date().toLocaleString();
  const banner = [
    '이것은 BannerPlugin이 처리한 결과입니다.',
    `Build Data: ${data}`,
  ].join('\n');

  return banner;
}

module.exports = banner;
