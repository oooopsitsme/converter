describe('Currency Converter', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
	})

	it('converts from EUR to GBP when clicking Convert', () => {
		cy.contains('Currency Converter')

		cy.get('[name="amount"]').clear().type('10')
		cy.get('[data-testid="convert-button"]').click()

		cy.get('[name="convertedAmount"]', { timeout: 5000 })
			.should('be.visible')
			.invoke('val')
			.then(val => {
				const num = parseFloat(val as string)
				expect(num).to.be.greaterThan(0)
			})
	})

	it('swaps currencies after conversion', () => {
		cy.get('[name="amount"]').clear().type('10')
		cy.get('[data-testid="convert-button"]').click()
		cy.get('[name="convertedAmount"]', { timeout: 5000 }).should('exist')

		cy.get('[data-testid="swap-button"]').click()
		cy.wait(600)

		cy.get('[name="amount"]').invoke('val').should('exist')
		cy.get('[name="convertedAmount"]').invoke('val').should('exist')
	})

	it('swaps currencies again after data has loaded', () => {
		cy.get('[name="amount"]').clear().type('10')
		cy.get('[data-testid="convert-button"]').click()
		cy.get('[name="convertedAmount"]', { timeout: 5000 }).should('exist')

		// First swap
		cy.get('[data-testid="swap-button"]').click()
		cy.wait(600)

		// Second swap
		cy.get('[data-testid="swap-button"]').click()
		cy.wait(600)

		cy.get('[name="amount"]').invoke('val').should('exist')
		cy.get('[name="convertedAmount"]').invoke('val').should('exist')
	})
})
