describe('Clip', () => {
    it('should play clip', () => {
        // test to see if video player works for an individual clip
        cy.visit('/')
        cy.get('app-clips-list > .grid a:first').click()
        // start video
        cy.get('.video-js').click()
        cy.wait(3000)
        // pause video
        cy.get('.video-js').click()
        //invoke gets jquery methods and should comes from Chai
        cy.get('.vjs-play-progess').invoke('width').should('gte', 0)

    })
})