Cypress.Commands.add("gotoWordle", () => {
  cy.visit("/");
  cy.get("#pz-gdpr-btn-accept").click();
});

Cypress.Commands.add("clickLetter", (key) => {
  cy.get("game-keyboard")
    .shadow()
    .find(`button[data-key='${key}']`)
    .click({ force: true });
});
