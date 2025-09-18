describe('EasyMedi 서비스 관리자 - ', () => {

    beforeEach(() => {
      // 로그인
      cy.visit('https://easymedi.net/agent/login') // 사이트 방문
      cy.get('input#username').type('yujin11!!') // 아이디 입력
      cy.get('input#password').type('yujin11!!') // 비밀번호 입력
      cy.get('button[type="submit"]').click() // 로그인 버튼 클릭
    })

    it('에이전트 관리', () => {
      // 에이전트 관리
      cy.get('.w-56 > .flex-1 > :nth-child(2)').click() // 에이전트 관리 메뉴 클릭
    })
    
  })