// import testimage1 from '../../fixtures/testimage1.jpeg';

describe('서비스 관리자 테스트', () => {
    // describe 블록 안의 모든 it 테스트 전에 이 코드가 자동으로 실행됩니다.
    beforeEach(() => {
      // 로그인
      cy.visit('https://easymedi.net/admin/login') // 사이트 방문
      cy.get('input#username').type('admin') // 아이디 입력
      cy.get('input#password').type('admin1234!') // 비밀번호 입력
      cy.get('button[type="submit"]').click() // 로그인 버튼 클릭
    });
  
    it('공지사항 전송 기능 테스트', () => {
      cy.get('button#channel-hospital').click() // 병원 체크
      cy.get('button#channel-agent').click() // 에이전트 체크
      cy.get('#announcement-title').type('테스트 공지사항') // 공지사항 제목 입력
      cy.get('#announcement-content').type('테스트 공지사항 내 테스트 테스트 테스트') // 공지사항 내용 입력
      
      // 이미지 업로드
      cy.fixture('Image/testimage1.png', 'base64').then(fileContent => {
        // base64 문자열을 Blob 객체 형식으로 변환
        const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/jpeg');
        
        // label의 for 속성 값을 사용하여 실제 파일 입력 필드를 선택
        cy.get('#image-upload').selectFile({
            contents: blob,
            fileName: 'testimage1.png',
            mimeType: 'image/png'
          }, { force: true });
      });

      cy.get('.justify-end > .justify-center').click() // 공지사항 전송 버튼 클릭
    });
  
    it('병원 관리 기능 테스트', () => {
      // beforeEach 덕분에 이 코드가 실행되기 전에 이미 로그인된 상태입니다.
      cy.get('nav > :nth-child(2) > .w-full').click() // 병원 관리 메뉴 클릭
      cy.get(':nth-child(2) > .bg-gray-50 > :nth-child(1)').click() // 병원 관리 메뉴 클릭
    });
  
    it('상품/이벤트 관리 기능 테스트', () => {
        cy.get('nav > :nth-child(2) > .w-full').click() // 병원 관리 메뉴 클릭
        cy.contains('상품/이벤트 관리').click() // 상품/이벤트 관리 메뉴 클릭
    });
  
    it('에이전트 관리 기능 테스트', () => {
        cy.get('nav > :nth-child(3) > .w-full').click() // 에이전트 관리 메뉴 클릭
    });
  
    it('환자 관리 기능 테스트', () => {
        cy.get('nav > :nth-child(4) > .w-full').click() // 환자 관리 메뉴 클릭
    });
  
    it('채팅상담 모니터링 기능 테스트', () => {
        cy.get('nav > :nth-child(5) > .w-full').click() // 채팅상담 모니터링 메뉴 클릭
    });
  
    it('결제 및 일정 관리 기능 테스트', () => {
        cy.get('nav > :nth-child(6) > .w-full').click() // 결제 및 일정 관리 메뉴 클릭
    });
  
    it('이용약관 관리 기능 테스트', () => {
        cy.get('nav > :nth-child(7) > .w-full').click() // 서비스 관리자 메뉴 클릭
        cy.get(':nth-child(7) > .bg-gray-50 > .w-full').click() // 이용약관 관리 메뉴 클릭
    });
  });
