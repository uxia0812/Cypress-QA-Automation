describe('EasyMedi 서비스 관리자 - ', () => {

    beforeEach(() => {
      // 로그인
      cy.visit('https://easymedi.net/agent/login') // 사이트 방문
      cy.get('#username').type('yujin11!!') // 아이디 입력
      cy.get('#password').type('yujin11!!') // 비밀번호 입력
      cy.get('.inline-flex').click() // 로그인 버튼 클릭
    })

    it('병원 관리', () => {
      // 병원 관리
      cy.get('.space-y-1 > :nth-child(2)').click() // 병원 관리 메뉴 클릭
      // cy.get('[data-testid="agent-nav-2-btn"]').click() // 병원 관리 메뉴 클릭

      // 제휴 병원 관리
      // cy.get('[data-testid="tab-partners"]').type('도자기').type('{enter}')
      cy.get('[data-testid="tab-applications"]').click() // 제휴 신청 탭 클릭
      cy.get('[data-testid="tab-partners"]').click() // 제휴 병원 관리 탭 클릭
      cy.wait(500); // 0.5초 대기

      // 병원 정보 제대로 불러와지는 지 확인
        // 현재 선택된 카드 안에서 다음 정보들을 확인합니다.
        cy.get('[data-testid^="partner-hospital-card-"]').should('exist') // 해당 요소가 DOM에 존재하는지 확인합니다.
        .and('have.length.at.least', 1); // 선택된 요소의 개수가 최소 1개 이상인지 확인합니다.
        
        // URL 복사 버튼 클릭
        cy.get('[data-testid^="copy-url-btn-"]') // data-testid가 'copy-url-btn-'으로 시작하는 모든 버튼 선택
        .then($buttons => {
          // 0부터 버튼 개수 미만 사이의 랜덤 정수 인덱스 생성
          const randomIndex = Math.floor(Math.random() * $buttons.length);
          // 랜덤 인덱스의 버튼을 cy.wrap()으로 Cypress 객체로 감싸서 클릭
          cy.wrap($buttons.eq(randomIndex)).click();
        });
        Cypress.on('uncaught:exception', (err, runnable) => {
          // 'Clipboard'와 관련된 오류일 경우 테스트를 실패시키지 않고 계속 진행
          if (err.message.includes('Clipboard')) {
            return false;
          }
          // 그 외 다른 오류는 그대로 Cypress가 실패시키도록 함
          return true;
        });

        // 관리 버튼 클릭
        cy.get('[data-testid^="manage-btn-"]') // data-testid가 'manage-btn-'으로 시작하는 모든 요소(버튼)를 선택
        .then($buttons => {
          // 0부터 버튼 개수 미만 사이의 랜덤 인덱스 생성
          const randomIndex = Math.floor(Math.random() * $buttons.length);
          // 랜덤 인덱스에 해당하는 버튼을 Cypress 체인으로 감싸서 클릭
          cy.wrap($buttons.eq(randomIndex));

        // 관리 > 메모 입력
        cy.get('svg.lucide-settings').closest('button').click();
        cy.get('[data-testid="hospital-notes-textarea"]').type("테스트 메모");
        cy.get('button[data-testid="save-notes-btn"]').click();
      })
    })
  })