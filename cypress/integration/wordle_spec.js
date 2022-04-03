import PageActions from "../support/wordle/PageActions";
import Solver from "../support/wordle/Solver";

describe("Solve Wordle", function () {
  before(() => {
    cy.gotoWordle();
    //Load the word list and instantiate processing classes
    cy.fixture("wordleWords").then((words) => {
      this.words = words.split("\n").map((word) => word.trim());
      this.solver = new Solver(this.words);
      this.page = new PageActions(this.solver);
    });
  });

  it("Should find today's word", () => {
    cy.get("game-modal")
      .shadow()
      .then((modal) => {
        modal.find(".close-icon").click();
        this.page.enterWord();
      });
  });
});
