describe('EasyMedi 환자 채널', () => {
    it('온보딩 거절', () => {
      cy.visit('https://easymedi.net/dojagi') // 사이트 방문
      cy.contains('맞춤 상품 추천을 받아보시겠어요?').should('be.visible');
      cy.contains('나중에요').click() // 나중에요 버튼 클릭
    })

    it('온보딩 챗봇', () => {
      // 맞춤 시술 추천 
      cy.visit('https://easymedi.net/dojagi') // 사이트 방문
      cy.contains('맞춤 상품 추천을 받아보시겠어요?').should('be.visible');
      cy.contains('받을래요').click() // 받을래요 버튼 클릭
      cy.contains('피부고민').click() // Depth1
      cy.contains('트러블·진정').click() // Depth2
      cy.contains('염증성 여드름').click() // Depth3
      cy.contains('실펌').click() // Depth4 최종 소분류 선택

    })

    // it('로그인', () => {
    //   // 로그인
    //   cy.get('input#username').type('tester01') // 아이디 입력
    //   cy.get('input#password').type('tester1!!') // 비밀번호 입력
    //   cy.get('button[type="submit"]').click() // 로그인 버튼 클릭
    // })
  })