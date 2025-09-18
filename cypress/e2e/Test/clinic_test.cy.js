// cypress의 함수 코드들은 기본적으로 비동기 함수들이며 실행 방식은 마치 자바스크립트의 await 비동기 방식으로 동작된다.
// 그래서 별도로 Promise나 await 처리 없이 테스트 코드들을 써내려가도 충돌없이 사용이 가능하다.

describe('EasyMedi 병원관리자 - 테스트', () => {
  it('테스트', () => {
    cy.visit('https://easymedi.net/clinic/home') // 사이트 방문

    cy.get('.w-56 > .flex-1 > :nth-child(2)').click() // 에이전트 관리 메뉴 클릭
    cy.get('input#username').type('test01') // 아이디 입력
    cy.get('input#password').type('test01!!') // 비밀번호 입력
    cy.get('button[type="submit"]').click() // 로그인 버튼 클릭

    cy.get('.w-56 > .flex-1 > :nth-child(2)').click() // 에이전트 관리 메뉴 클릭
    cy.contains('제휴 신청').click();  // 제휴 신청 탭 클릭
    cy.contains(/사업체|개인/).should('be.visible'); // '사업체' 또는 '개인' 워딩 확인 - 목록이 떴는 지 확인

    // 랜덤 제휴 신청
    cy.get('.gap-2').then(($buttons) => {
        const buttonCount = $buttons.length;
        if (buttonCount > 0) {
            const randomIndex = Math.floor(Math.random() * buttonCount);
            cy.wrap($buttons).eq(randomIndex).click();
        } else {
            throw new Error('제휴신청 버튼을 찾을 수 없습니다.');
        }
    });

    cy.contains('제휴 요청 메시지').should('be.visible');
    cy.get('textarea#partnership-message').type('테스트 제휴 요청 메세지 테스트 테스트') // 제휴 요청 메세지 입력
    cy.get('input#commission-rate').type('10') // 제휴 수수료 입력
    cy.contains('제휴 신청 보내기').click() // 제휴 신청 버튼 클릭
    cy.reload() // 새로고침
    cy.contains('승인 대기중').should('be.visible');
  })
})