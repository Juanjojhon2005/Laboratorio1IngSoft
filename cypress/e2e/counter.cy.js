describe('Contador', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.wait(600); 
  });

  it('muestra el valor inicial', () => {
    cy.contains(/valor actual/i).should('exist');
    cy.wait(600);
  });

  it('incrementa el contador en 1', () => {
    cy.contains('+1').click();
    cy.wait(600);
    cy.contains('Valor actual: 1').should('exist');
  });

  it('decrementa el contador en 1', () => {
    cy.contains('-1').click();
    cy.wait(600);
    cy.contains('Valor actual: -1').should('exist');
  });

  it('incrementa con valor personalizado usando +N', () => {
    cy.get('input[placeholder="Valor personalizado"]').type('5');
    cy.wait(600);
    cy.contains('+N').click();
    cy.wait(600);
    cy.contains('Valor actual: 5').should('exist');
  });

  it('decrementa con valor personalizado usando -N', () => {
    cy.get('input[placeholder="Valor personalizado"]').clear().type('3');
    cy.wait(600);
    cy.contains('-N').click();
    cy.wait(600);
    cy.contains('Valor actual: -3').should('exist');
  });

  it('reset con valor inicial ingresado', () => {
    cy.get('input[placeholder="Valor inicial"]').type('10');
    cy.wait(600);
    cy.contains('Resetear').click();
    cy.wait(600);
    cy.contains('Valor actual: 10').should('exist');
  });

  it('reset con valor negativo', () => {
    cy.get('input[placeholder="Valor inicial"]').type('-7');
    cy.wait(600);
    cy.contains('Resetear').click();
    cy.wait(600);
    cy.contains('Valor actual: -7').should('exist');
  });



  it('ignora texto inválido en valor inicial', () => {
    cy.get('input[placeholder="Valor inicial"]').type('xyz');
    cy.wait(600);
    cy.contains('Resetear').click();
    cy.wait(600);
    cy.contains('Valor actual: 0').should('exist');
  });

  it('parsea correctamente número con espacios y resetea', () => {
    cy.get('input[placeholder="Valor inicial"]').type(' 8 ');
    cy.wait(600);
    cy.contains('Resetear').click();
    cy.wait(600);
    cy.contains('Valor actual: 8').should('exist');
  });
});
