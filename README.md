# Wordle Solver with Cypress

**Wordle was taking so much time!** _So, I've written my own automation to play it for me with Cypress, JavaScript and a list of 2,315 words. Here's the results._

Yes, the world is playing it so I've succumbed. I've been playing Wordle. It's irresistible and you only get one word a day, all part of the magic.

But it's also an irritating distraction, so the solution is automation. As Abraham Maslow said, 'when all you have is a hammer, everything looks like a nail'. Well said, and it does indeed look like a nail.

So, I've fired up VS Code; together with some Javascript, Cypress and the list of 2,315 words Wordle uses for its answers. Here's the result.

## Details with video

[Solving Wordle with Cypress](https://chrisryan.xyz/posts/wordle-with-cypress/)

## The Approach

Cypress is a great tool with good documentation, and I wanted to experiment with it. I structured the code into two classes:

**_PageActions class_**
This handles the page interaction; button clicks, reads and records the response from Wordle. The shadow DOM on the Wordle page allows extraction of the score for each attempt: Green (correct), Yellow (present) and Grey (absent).

**_Solver class_**
The Solver class uses the list of 2,315 words that Wordle uses for its answers. It loads these into an array and as the responses come back it eliminates words from this array to narrow down to the correct solution. As starting point, it uses _STARE_ as its first word, a reasonable first guess I feel. I've read some analysis that other words might be better, _ADIEU_ for example but I'll perhaps experiment with others later. Using the feedback from PageActions these word array is pruned; when a letter is correct then eliminate all words that letter(s) aren't in that position, where is present remove all word that don't contain it and that have that leter in that position and where a letter is absent then remove all words containing it. When making a guess if possible use a word with no repeat letters as that maximises our elimination or confirmation of letters.

This approach works well enough usually solving with four attempts which I feel is par for the puzzle. It could be improved using Information as Theory explained in the excellent [3Blue1Brown Solving Wordle using information theory](https://youtu.be/v68zYyaEmEA) but that's for another day.

## Usage

```bash
git clone https://github.com/chrisrryan/wordle-cypress.git
cd wordle-cypress
npm install
npx cypress open
```

Then, click wordle_spec.js when the Cypress test runner starts.
