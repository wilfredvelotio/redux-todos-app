/// <reference types="cypress" />
describe("Render Home Page", () => {
  it("Should render home page correctly", () => {
    cy.visit("http://localhost:3000");
    cy.getBySel("app-header").contains("Todos and Posts App");
  });
});
