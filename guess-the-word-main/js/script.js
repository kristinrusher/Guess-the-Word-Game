//Targets the list with the player's guessed letters
const guessedLetters = document.querySelector(".guessed-letters");

//Targets the "Guess!" button
const guessButton = document.querySelector(".guess");

//Targets the text input where the player guesses a letter
const letterInput = document.querySelector(".letter");

//Targets the word in progress
const wordInProgress = document.querySelector(".word-in-progress");

//Targets the remaining guesses
const remainingGuesses = document.querySelector(".remaining");

//Targets the remaining guesses paragraph span
const remainingGuessesSpan = document.querySelector(".remaining span");

//Targets the empty paragraph where messages appear when a letter is guessed
const message = document.querySelector(".message");

//Targets the Play Again button
const playAgain = document.querySelector(".play-again");

//Test word 
const word = "magnolia";

//Displays ● symbol for the word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});

