describe('레이아웃 테스트', () => {
  beforeEach(() => {
    cy.visit('https://easymedi.net/clinic/home') // 사이트 방문
  })
    
  it('EasyMedi View', () => {
    cy.get('.space-x-4 > .border').should('be.visible').click()
  })

  it('Alert', () => {
    cy.get('.space-x-4 > .inline-flex')
  })

  it('Guide', () => {
    cy.get('.space-x-4 > .p-2').should('be.visible').click()
  })
})