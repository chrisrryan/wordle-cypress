class PageActions {
  constructor(solver) {
    this.solver = solver;
    this.result = [];
  }

  addLetterResult = (word, letters, index) => {
    let tile = cy
      .get(`game-row[letters='${word}']`)
      .shadow()
      .find(`game-tile[letter='${letters[index]}']:nth-child(${index + 1})`);

    return tile.invoke("attr", "evaluation").then((evaluation) => {
      this.result.push({
        letter: letters[index],
        index,
        evaluation,
      });
    });
  };

  removeLetterFromAll(letter) {
    this.solver.viableLetters.forEach((pattern, index) => {
      this.solver.viableLetters[index] = pattern.replace(letter, "");
    });
  }

  setLetterAsFound(letter, index) {
    this.solver.viableLetters[index] = letter;
  }

  removeLetterFromColumn(letter, index) {
    this.solver.viableLetters[index] = this.solver.viableLetters[index].replace(
      letter,
      ""
    );
  }

  clickLetters = (letters) => {
    for (let i = 0; i < 5; i++) {
      cy.clickLetter(letters[i]);
    }
    cy.clickLetter("↵");
    return cy.wait(3000);
  };

  enterWord = () => {
    var word = this.solver.getWord();
    var letters = word.split("");
    this.result = [];
    this.clickLetters(letters)
      .then(() => this.addLetterResult(word, letters, 0))
      .then(() => this.addLetterResult(word, letters, 1))
      .then(() => this.addLetterResult(word, letters, 2))
      .then(() => this.addLetterResult(word, letters, 3))
      .then(() => this.addLetterResult(word, letters, 4))
      .then(() => {
        if (this.result.every(({ evaluation }) => evaluation === "correct")) {
          assert.isOk("solved", word);
          return;
        } else if (this.solver.attempts > 6) {
          throw new Error("Unable to solve");
        }

        this.result.forEach(({ letter, index, evaluation }) => {
          switch (evaluation) {
            case "absent":
              if (
                this.result.some(
                  (s) => s.letter === letter && s.evaluation !== "absent"
                )
              ) {
                this.removeLetterFromColumn(letter, index);
              } else {
                this.removeLetterFromAll(letter);
              }
              break;
            case "correct":
              this.setLetterAsFound(letter, index);
              break;
            case "present":
              this.solver.mustHaveLetters.push(letter);
              this.removeLetterFromColumn(letter, index);
              break;
          }
        });
        this.enterWord();
      });
  };
}

export default PageActions;
