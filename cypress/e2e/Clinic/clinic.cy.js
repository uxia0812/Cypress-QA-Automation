describe("EasyMedi 병원관리자 - 에이전트 제휴 신청 테스트", () => {
  it("에이전트 로그인", () => {
    cy.visit("https://easymedi.net/clinic/login"); // 사이트 방문
    cy.get("input#username").type("dojagi01"); // 아이디 입력
    cy.get("input#password").type("ehwkrl01!"); // 비밀번호 입력
    cy.get('button[type="submit"]').click(); // 로그인 버튼 클릭
  });

  beforeEach(() => {
    // 에이전트 홈 진입
    cy.visit("https://easymedi.net/clinic/home"); // 사이트 방문
  });

  it("상단바 테스트", () => {
    cy.get(".space-x-4 > .border").should("be.visible").click();
    cy.get(".space-x-4 > .inline-flex");
    cy.get(".space-x-4 > .p-2").should("be.visible").click();
  });

  it("병원 프로필 재설정", () => {
    cy.get('[data-testid="clinic-account-id-input"]'); // 병원 ID 조회
    cy.get('[data-testid="clinic-new-password-input"]')
      .click()
      .type("ehwkrl01!"); // 새 비밀번호 입력
    cy.get('[data-testid="clinic-confirm-password-input"]')
      .click()
      .type("ehwkrl01!"); // 새 비밀번호 확인 입력
    cy.get('button[data-testid="clinic-pw-editing-btn"]')
      .contains("비밀번호 변경")
      .click(); // 비밀번호 변경 버튼 클릭
    cy.contains("비밀번호가 성공적으로 변경되었습니다.").should("be.visible"); // 변경 완료 메시지 확인
  });

  it("에이전트 관리 > 제휴 신청 테스트", () => {
    cy.get(".w-56 > .flex-1 > :nth-child(2)").click(); // 에이전트 관리 메뉴 클릭
    cy.contains("제휴 신청").click(); // 제휴 신청 탭 클릭
    cy.contains(/사업체|개인/).should("be.visible"); // '사업체' 또는 '개인' 워딩 확인 - 목록이 떴는 지 확인

    // '제휴 신청' 텍스트 포함하는 버튼 클릭
    cy.get(".gap-2")
      .contains("button", "제휴 신청")
      .click()
      .then(() => {
        cy.log("제휴 신청 버튼 클릭 성공");

        // // 랜덤 제휴 신청
        // cy.get('.gap-2').then(($buttons) => {
        //     const buttonCount = $buttons.length;
        //     if (buttonCount > 0) {
        //         const randomIndex = Math.floor(Math.random() * buttonCount);
        //         cy.wrap($buttons).eq(randomIndex).contains('제휴 신청').click();
        //     } else {
        //         throw new Error('제휴신청 버튼을 찾을 수 없습니다.');
        //     }
        // });

        cy.contains("제휴 요청 메시지").should("be.visible");
        cy.get("textarea#partnership-message").type(
          "테스트 제휴 요청 메세지 테스트 테스트"
        ); // 제휴 요청 메세지 입력
        cy.get("input#commission-rate").type("10"); // 제휴 수수료 입력
        cy.contains("제휴 신청 보내기").click(); // 제휴 신청 버튼 클릭
        cy.reload(); // 새로고침
        cy.contains("제휴 신청").click(); // 제휴 신청 탭 클릭
        cy.contains("승인 대기중").should("be.visible");
      });

    it("에이전트 관리 > 제휴 병원 관리 테스트", () => {
      cy.visit("https://easymedi.net/clinic/agents"); // 사이트 방문

      cy.get("input#username").type("test01"); // 아이디 입력
      cy.get("input#password").type("test01!!"); // 비밀번호 입력
      cy.get('button[type="submit"]').click(); // 로그인 버튼 클릭

      cy.contains("대시보드").should("be.visible"); // 로그인 완료 확인
      cy.get(".w-56 > .flex-1 > :nth-child(2)").click(); // 에이전트 관리 메뉴 클릭
      cy.contains("제휴 에이전트 관리").click(); // 제휴 에이전트 관리 탭 클릭

      cy.get("svg.lucide.lucide-ellipsis") // SVG 아이콘을 찾고
        .parents("button") // 그 SVG를 감싸는 'button' 태그의 부모를 찾은 다음
        .eq(0)
        .click(); // 첫 번째 제휴 병원 관리 버튼 클릭

      cy.contains("상세 정보").click(); // 상세 정보 버튼 클릭
      cy.get(".space-y-3 > :nth-child(2) > .space-x-2 > .flex")
        .clear()
        .type("10"); // 수수료 요율 변경
      cy.contains("button", "저장").click(); // 저장 버튼 클릭
      cy.get(".min-h-[60px]").type("테스트 메모"); // 메모 입력
      cy.get(
        'textarea[placeholder="에이전트에 대한 메모를 작성하세요..."]'
      ).type("테스트 메모");
      cy.contains("메모 저장").click(); // 메모 저장 버튼 클릭
      cy.get("button#inline-flex").contains("저장").click(); // 저장 버튼 클릭
    });

    it("환자 관리 메뉴 테스트", () => {
      // 로그인
      cy.visit("https://easymedi.net/clinic/consumer"); // 사이트 방문
      // cy.get('input#username').type('dojagi01') // 아이디 입력
      // cy.get('input#password').type('ehwkrl01!') // 비밀번호 입력
      // cy.get('button[type="submit"]').click() // 로그인 버튼 클릭
    });

    it("공지사항 확인", () => {
      cy.get("button#Eye").click(); // 공지사항 상세 버튼 클릭
      cy.get("button#lucide-x").click(); // 공지사항 닫기 버튼 클릭
    });

    it("환자 관리", () => {
      cy.visit("https://easymedi.net/clinic/chat-monitoring");
      cy.get(".w-56 > .flex-1 > :nth-child(3)").click(); // 환자 관리 메뉴 클릭
      cy.get("input#search").type("테스트"); // 환자 검색
      cy.get("button#combobox#radix-:r1:").click(); // 정렬 버튼 클릭
      cy.contains("오래된순").should("be.visible").click(); // 오래된 순 버튼 클릭
      cy.get("button#combobox#radix-:r2:").click(); // 국적 필터 버튼 클릭
      cy.contains("인도네시아").should("be.visible").click(); // 인도네시아 버튼 클릭
      cy.get("button#combobox#radix-:r2:").click(); // 국적 필터 버튼 클릭
      cy.contains("전체").should("be.visible").click(); // 전체 버튼 클릭
      cy.get("button#dialog-trigger").click(); // 사전상담서 조회 버튼 클릭
      cy.get("button#ring-offset#Close").click(); // 사전상담서 닫기 버튼 클릭
      cy.get("button#data-slot").click(); // 환자명 하이퍼링크 클릭해서 채팅상담으로 이동
    });

    it("채팅상담", () => {
      cy.get(".w-56 > .flex-1 > :nth-child(4)").click(); // 채팅상담 메뉴 클릭
    });

    it("결제내역 관리", () => {
      cy.visit("https://easymedi.net/clinic/payment-schedule");
      cy.get(".w-56 > .flex-1 > :nth-child(5)").click(); // 결제내역 관리 메뉴 클릭
    });
  });
});
