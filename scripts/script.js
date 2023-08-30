// generating keyboard buttons dynamically

// selecting the keyboard div
const hangmanImage = document.querySelector(".hangman-box img");
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");

let currentWord,
  correctLetters = [],
  wrongGuessCount = 0;
maxGuesses = 6;

const getRandomWord = () => {
  // object destructuring
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint-text b").innerText = hint;
  // split(): converts a string to an array.
  // join(): converts an array to a string.
  wordDisplay.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory ? `You found the word:` : `The correct word was:`;
    gameModal.querySelector("img").src = `images/${isVictory ? "victory" : "lost"}.gif`;
    gameModal.querySelector("h4").innerText = `${isVictory ? "Congrats!" : "Game Over!"}`;
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  // checking if the clicked letter exists in the...
  // current word.
  if (currentWord.includes(clickedLetter)) {
    // this works the same way as split("")
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        document.querySelectorAll("li")[index].innerText = letter;
        document.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  //  disable the clicked button
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  //   call gameover function when ever any of these conditions are met.
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

for (let i = 97; i <= 122; i++) {
  // create a button element
  const button = document.createElement("button");
  // String.fromCharCode() is used in converting
  // unicode values to characters
  button.innerText = String.fromCharCode(i);
  // append the button tag inside the keyboard div
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

// creating a word list

getRandomWord();
