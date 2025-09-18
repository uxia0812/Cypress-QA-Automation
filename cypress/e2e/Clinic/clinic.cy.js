describe('EasyMedi 병원관리자 - 에이전트 제휴 신청 테스트', () => {
  it('에이전트 로그인', () => { 
    cy.visit('https://easymedi.net/clinic/login') // 사이트 방문
    cy.get('input#username').type('test01') // 아이디 입력
    cy.get('input#password').type('test01!!') // 비밀번호 입력
    cy.get('button[type="submit"]').click() // 로그인 버튼 클릭
  })

  beforeEach(() => {
    // 에이전트 홈 진입
    cy.visit('https://easymedi.net/clinic/home') // 사이트 방문
  })

  it('에이전트 관리', () => {
    // 에이전트 관리
    cy.get('.w-56 > .flex-1 > :nth-child(2)').click() // 에이전트 관리 메뉴 클릭
    cy.contains('제휴 신청').click();  // 제휴 신청 탭 클릭
    cy.contains('김유진').get(':nth-child(6) > .p-4 > .space-x-4 > .gap-2').click();  // 메디모스 김유진 제휴신청
    cy.contains('제휴 요청 메시지').should('be.visible');
    cy.get('textarea#partnership-message').type('테스트 제휴 요청 메세지 테스트 테스트') // 제휴 요청 메세지 입력
    cy.get('input#commission-rate').type('10') // 제휴 수수료 입력
    cy.contains('제휴 신청 보내기').click() // 제휴 신청 버튼 클릭
    cy.reload() // 새로고침
    cy.contains('승인 대기중').should('be.visible');
  })
})

describe('EasyMedi 병원관리자 - 환자 관리 테스트', () => {
  it('환자 관리', () => {
    // 로그인
    cy.visit('https://easymedi.net/clinic/login') // 사이트 방문
    cy.get('input#username').type('dojagi01') // 아이디 입력
    cy.get('input#password').type('ehwkrl01!') // 비밀번호 입력
    cy.get('button[type="submit"]').click() // 로그인 버튼 클릭
  })

  beforeEach(() => {
    // 병원 홈 진입
    cy.visit('https://easymedi.net/clinic/home') // 사이트 방문
  })

  it('공지사항 확인', () => {
    cy.get('button#Eye').click() // 공지사항 상세 버튼 클릭
    cy.get('button#lucide-x').click() // 공지사항 닫기 버튼 클릭
  })

  it('환자 관리', () => {
    cy.get('.w-56 > .flex-1 > :nth-child(3)').click() // 환자 관리 메뉴 클릭
    cy.get('input#search').type('테스트') // 환자 검색
    cy.get('button#combobox#radix-:r1:').click() // 정렬 버튼 클릭
    cy.contains('오래된순').should('be.visible').click() // 오래된 순 버튼 클릭
    cy.get('button#combobox#radix-:r2:').click() // 국적 필터 버튼 클릭
    cy.contains('인도네시아').should('be.visible').click() // 인도네시아 버튼 클릭
    cy.get('button#combobox#radix-:r2:').click() // 국적 필터 버튼 클릭
    cy.contains('전체').should('be.visible').click() // 전체 버튼 클릭
    cy.get('button#dialog-trigger').click() // 사전상담서 조회 버튼 클릭
    cy.get('button#ring-offset#Close').click() // 사전상담서 닫기 버튼 클릭
    cy.get('button#data-slot').click() // 환자명 하이퍼링크 클릭해서 채팅상담으로 이동
  })

  it('채팅상담', () => {
    cy.get('.w-56 > .flex-1 > :nth-child(4)').click() // 채팅상담 메뉴 클릭

  })

  it('결제내역 관리', () => {
    cy.get('.w-56 > .flex-1 > :nth-child(5)').click() // 결제내역 관리 메뉴 클릭
  })
})
