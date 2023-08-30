// generating keyboard buttons dynamically

// selecting the keyboard div
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");

const getRandomWord = () => {
  // object destructuring
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(word);
  document.querySelector(".hint-text b").innerText = hint;
  // split(): converts a string to an array.
  // join(): converts an array to a string.
  wordDisplay.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
};


const initGame = (button, clickedLetter) => {

}


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