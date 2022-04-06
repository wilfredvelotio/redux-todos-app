/// <reference types="cypress" />
describe("Render Users Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should render 6 elements on first page load", () => {
    cy.getBySel("user-card").should("have.length", 6);
  });

  it("should render 10 elements on scroll 500px to bottom", () => {
    cy.scrollTo(0, 500);
    cy.getBySel("user-card").should("have.length", 10);
  });

  it("should render 10 elements after reaching bottom of screen", () => {
    cy.getBySel("user-card").should("have.length", 10);
    cy.scrollTo("bottom");
    cy.getBySel("user-card").should("have.length", 10);
  });
});

describe.only("Renders Form on Card Menu click", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should be able to open form on click of Menu Icon", () => {
    cy.getBySel("form-display").should("not.be.visible");
    cy.getBySel("form-user").eq(0).click();
    cy.getBySel("form-display").should("be.visible");
    cy.get("[role=presentation]").click("topLeft");
  });

  it("should not be able to submit incorrect values", () => {
    cy.getBySel("form-display").should("not.be.visible");
    cy.getBySel("form-user").eq(0).click();
    cy.getBySel("form-display").should("be.visible");
    cy.get("input[id=name]").clear().type("12213123183dddihidw");
    cy.get("input[id=username]").clear().type("Wilfred  ");
    cy.get("input[id=email]").clear().type("User name");
    cy.get("input[id=phone]").clear().type("User name");
    cy.get("input[id=website]").clear().type("User name");
    cy.get("button[id=submit-form-button]").click();
    cy.get("[id$=-helper-text]").each(($el, index) => {
      cy.wrap($el).contains("Note:").should("have.length", 1);
    });
    cy.pause();
  });
});

describe("Renders Post Page on Card Click", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should be able to open post route on click on user card", () => {
    cy.getBySel("post-route").eq(0).click();
    cy.url().should("include", "/posts/1");
  });
});
