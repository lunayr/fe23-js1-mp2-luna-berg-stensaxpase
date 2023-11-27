const inputName = document.getElementById("input-name");
const btnEnter = document.getElementById("btn-enter");
const sectionGame = document.getElementById("section-game");
const welcomeName = document.getElementById("welcome-name");
const btnRestart = document.getElementById("btn-restart");
const nameLog = document.getElementById("name-log");
const winnerLog = document.getElementById("winner-log");
const sectionStart = document.getElementById("section-start");
const choiceLog = document.getElementById("choice-log");
const omgångLog = document.getElementById("omgång-log");

function startGame() {
  // If the player tries to start the game without writing their name or if they only write a number, return false so the game doesn't start
  inputName.value;
  if (inputName === "" || !isNaN(inputName.value)) {
    alert("Enter ditt namn för att starta spelet");
    return false;
  }
  return true;
}

//////////////////////////////////////
// Gameplay

// Get the images from html
let rock = document.getElementById("Rock");
let scissors = document.getElementById("Scissors");
let paper = document.getElementById("Paper");

// Set the scores
let playerPoints = 0;
let computerPoints = 0;

// Choices of the player
function playGame(event) {
  // choosing the clicked image from its ID
  let choiceOfPlayer = event.target.id;
  const playerChoices = ["Rock", "Scissors", "Paper"];

  // How to generate the choice for computer? Randomly
  const computerChoice =
    playerChoices[Math.floor(Math.random() * playerChoices.length)];

  // Log the choices and points to the screen (increase the points)
  const result = whoWinner(choiceOfPlayer, computerChoice);
  omgångLog.innerText = result;

  if (result === `${inputName.value} vann`) {
    playerPoints++;
  } else if (result === "Dator vann") {
    computerPoints++;
  }

  choiceLog.innerText = ` ${choiceOfPlayer}  vs  ${computerChoice}`;
  nameLog.innerText = `${inputName.value} : ${playerPoints},    Dator : ${computerPoints}`;

  // how to determine if the game ends?
  if (playerPoints > 2 || computerPoints > 2) {
    // if the game ends, restart button should appear
    btnRestart.classList.remove("hidden");

    // when the game ends, player can click on restart button to RESET the game:
    btnRestart.addEventListener("click", reset);

    // Log who is the winner at the end of the game
    const theWinner = playerPoints === 3 ? `${inputName.value}` : "Dator";
    winnerLog.innerText = `${theWinner} vinner spelet!`;

    // Remove eventlisteners; so player can't click on the images without restarting the game
    rock.removeEventListener("click", playGame);
    scissors.removeEventListener("click", playGame);
    paper.removeEventListener("click", playGame);
  }
}

// Resetting the game
function reset() {
  // Remove restart button
  btnRestart.classList.add("hidden");

  // Remove all the log information
  nameLog.innerText = "";
  choiceLog.innerText = "";
  winnerLog.innerText = "";
  omgångLog.innerText = "";

  // Reset Points
  playerPoints = 0;
  computerPoints = 0;

  // Adding events back, so player can click on the images
  rock.addEventListener("click", playGame);
  scissors.addEventListener("click", playGame);
  paper.addEventListener("click", playGame);
}

// How to determine the winner?
function whoWinner(player, computer) {
  if (player === computer) {
    return "Det är tie";
  } else if (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Scissors" && computer === "Paper") ||
    (player === "Paper" && computer === "Rock")
  ) {
    return `${inputName.value} vann`;
  } else if (
    (player === "Rock" && computer === "Paper") ||
    (player === "Scissors" && computer === "Rock") ||
    (player === "Paper" && computer === "Scissors")
  ) {
    return "Dator vann";
  }
}

// Start the game
btnEnter.addEventListener("click", function () {
  // Start the game if the function returns TRUE:
  if (startGame()) {
    // Remove the start-page by adding hidden class
    sectionStart.classList.add("hidden");

    // Adding the game-page by removing its hidden class
    sectionGame.classList.remove("hidden");

    // Welcome the player-name
    welcomeName.innerText = `Welcome ${inputName.value}!`;
  }
});

// calling the reset function, putting back the event listeners
reset();
