describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "localhost:8001/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
   });

   afterEach(() => {
    cy.request("GET", "localhost:8001/api/debug/reset");
   });

  it("should book an interview", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click();

    cy.get('[alt=Add]')
      .first()
      .click();

    cy.get('[data-testid=student-name-input]')
      .type('Lydia Miller-Jones');

    cy.get("[alt='Sylvia Palmer']")
      .click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.contains("[data-testid=day]", "Monday")
      .click();

    cy.get('.appointment__card')
      .first()
      .click({ force: true })
      .get('[alt=Edit]')
      .click({ force: true });

    cy.get('[data-testid=student-name-input]')
      .type('{selectall}Lydia Miller-Jones');

    cy.get("[alt='Sylvia Palmer']")
      .click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
 

  it("should cancel an interview", () => {
    cy.contains("[data-testid=day]", "Monday")
      .click();

    cy.get('.appointment__card')
      .first()
      .get('[alt=Delete]')
      .click({ force: true });

    cy.contains("Confirm")
      .click();
    cy.contains(/DELETING/i);
    cy.contains(/DELETING/i).should('not.exist');
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should('not.exist');
  });
});