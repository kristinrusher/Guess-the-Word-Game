//Targets the list with the player's guessed letters
const guessedLettersElement = document.querySelector(".guessed-letters");

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

const guessedLetters = [];


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

    message.innerText = "";

    const guess = letterInput.value;
    const goodGuess = inputValidation(guess);

    if (goodGuess) {
        makeGuess(guess);
    }

    letterInput.value = "";
});

//Validate player input
const inputValidation = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter"; 
    } else if (input.length > 1) {
        message.innerText = "Enter only 1 letter at a time";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Enter a letter from A to Z";
    } else {
        return input;
    }
};


const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Oops! You already guessed that letter. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    //Clear the list
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    //console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkIfWon();
};

const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word! Congrats!</p>`;
    }
};
