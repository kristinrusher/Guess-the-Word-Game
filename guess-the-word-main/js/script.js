//Targets the list with the player's guessed letters
const guessedLettersElement = document.querySelector(".guessed-letters");

//Targets the "Guess!" button
const guessButton = document.querySelector(".guess");

//Targets the text input where the player guesses a letter
const letterInput = document.querySelector(".letter");

//Targets the word in progress
const wordInProgress = document.querySelector(".word-in-progress");

//Targets the remaining guesses
const remainingGuessesElement = document.querySelector(".remaining");

//Targets the remaining guesses paragraph span
const remainingGuessesSpan = document.querySelector(".remaining span");

//Targets the empty paragraph where messages appear when a letter is guessed
const message = document.querySelector(".message");

//Targets the Play Again button
const playAgain = document.querySelector(".play-again");

//Test word 
let word = "magnolia";

const guessedLetters = [];

let remainingGuesses = 8;


const getWord = async function () {
    const response = await fetch (
        `https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`
    );
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

//Displays ● symbol for the word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

guessButton.addEventListener("click", function (e) {
    e.preventDefault();

    message.innerText = "";

    const guess = letterInput.value;
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

//Validate player input
const validateInput = function (input) {
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


const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = `Oops! You already guessed that letter. Try again.`;
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateGuessesRemaining(guess);
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

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word does not include the letter ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess!`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML= `Sorry, game over! The word was <span classs="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess left`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses left`;
    }
};


const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word! Congrats!</p>`;
    }
};

