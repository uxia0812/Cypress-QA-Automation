const { defineConfig } = require("cypress");

module.exports = {
  e2e: {
      // 크로미움 동일 출처 정책 보안 비활성화
      chromeWebSecurity: false,

     // 테스트 페이지 뷰포트 설정
     viewportWidth: 1700, 
     viewportHeight: 900,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};