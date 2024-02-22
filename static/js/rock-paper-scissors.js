let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    losses: 0,
    ties: 0,
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;

        document.querySelector(".js-auto-play-button").innerHTML =
            "Stop Playing";
    } else {
        clearInterval(intervalId);
        isAutoPlaying = true;

        document.querySelector(".js-auto-play-button").innerHTML =
            "Auto Play";
    }
}

document
    .querySelector(".js-rock-button")
    .addEventListener("click", () => {
        playGame("Rock");
    });

document
    .querySelector(".js-paper-button")
    .addEventListener("click", () => {
        playGame("Paper");
    });

document
    .querySelector(".js-scissors-button")
    .addEventListener("click", () => {
        playGame("Scissors");
    });

document
    .querySelector(".js-reset-button")
    .addEventListener("click", () => {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem("score");
        updateScoreElement();
    });

document
    .querySelector(".js-auto-play-button")
    .addEventListener("click", () => {
        autoPlay();
    });

document.body.addEventListener("keydown", (event) => {
    if (event.key === "r") {
        playGame("Rock");
    } else if (event.key === "p") {
        playGame("Paper");
    } else if (event.key === "s") {
        playGame("Scissors");
    } else if (event.key === "a") {
        autoPlay();
    }
});

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = "";

    if (playerMove === "Scissors") {
        if (computerMove === "Rock") {
            result = "You lose!";
        } else if (computerMove === "Paper") {
            result = "You win!";
        } else if (computerMove === "Scissors") {
            result = "Tie!";
        }
    } else if (playerMove === "Paper") {
        if (computerMove === "Rock") {
            result = "You win!";
        } else if (computerMove === "Paper") {
            result = "Tie!";
        } else if (computerMove === "Scissors") {
            result = "You lose!";
        }
    } else if (playerMove === "Rock") {
        if (computerMove === "Rock") {
            result = "Tie!";
        } else if (computerMove === "Paper") {
            result = "You lose!";
        } else if (computerMove === "Scissors") {
            result = "You win!";
        }
    }

    if (result === "You win!") {
        score.wins += 1;
    } else if (result === "You lose!") {
        score.losses += 1;
    } else if (result === "Tie!") {
        score.ties += 1;
    }

    localStorage.setItem("score", JSON.stringify(score));

    updateScoreElement();

    document.querySelector(".js-result").innerHTML = result;

    document.querySelector(".js-moves").innerHTML = `You 
    <img src="/static/images/${playerMove.toLowerCase()}-emoji.png" class="move-icon" />
    <img src="/static/images/${computerMove.toLowerCase()}-emoji.png" class="move-icon"> Computer`;
}

function updateScoreElement() {
    document.querySelector(
        ".js-score"
    ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = "";

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = "Rock";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = "Paper";
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = "Scissors";
    }

    return computerMove;
}