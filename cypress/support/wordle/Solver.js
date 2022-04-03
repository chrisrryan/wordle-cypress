class Solver {
  constructor(words) {
    this.words = words;
    this.attempts = 0;
    this.mustHaveLetters = [];
    this.viableLetters = [
      "abcdefghijklmnopqrstuvwxyz",
      "abcdefghijklmnopqrstuvwxyz",
      "abcdefghijklmnopqrstuvwxyz",
      "abcdefghijklmnopqrstuvwxyz",
      "abcdefghijklmnopqrstuvwxyz",
    ];
  }

  getViableLetters = (columnIndex) => {
    return this.viableLetters[columnIndex];
  };

  getWord() {
    this.attempts++;
    console.log("attempts " + this.attempts);
    switch (this.attempts) {
      case 1:
        return "adieu";
      default:
        const viablePattern =
          `[${this.viableLetters[0]}]` +
          `[${this.viableLetters[1]}]` +
          `[${this.viableLetters[2]}]` +
          `[${this.viableLetters[3]}]` +
          `[${this.viableLetters[4]}]`;

        const viableRegEx = new RegExp(viablePattern);
        this.words = this.words.filter((word) => viableRegEx.test(word));

        if (this.mustHaveLetters.length > 0) {
          var mustHavePattern = "";
          this.mustHaveLetters.forEach((letter) => {
            mustHavePattern += `(?=.*${letter})`;
          });
          const mustHaveRegEx = new RegExp(mustHavePattern);
          this.words = this.words.filter((word) => mustHaveRegEx.test(word));
        }

        console.log("length2: " + this.words.length);
        const distinctLettersPattern = /^(?:([a-z])(?!.*\1))*$/;
        const distinctLettersRegEx = new RegExp(distinctLettersPattern);
        const distinctWordsList = this.words.filter((word) =>
          distinctLettersRegEx.test(word)
        );

        if (distinctWordsList.length > 0) {
          const word =
            distinctWordsList[
              Cypress._.random(0, distinctWordsList.length - 1)
            ];
          console.log(word);
          return word;
        } else {
          return this.words[Cypress._.random(0, this.words.length - 1)];
        }
    }
  }
}

export default Solver;
