let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}
let bigBangMode = false

updateScoreElement()

let isAutoPlaying = false
let intervalId

function autoPlay () {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove()
      playGame(playerMove)
    }, 1000)
    isAutoPlaying = true

    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing'
  } else {
    clearInterval(intervalId)
    isAutoPlaying = true

    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play'
  }
}

function addMoveListener () {
  document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('Rock')
  })

  document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('Paper')
  })

  document
    .querySelector('.js-scissors-button')
    .addEventListener('click', () => {
      playGame('Scissors')
    })

  if (bigBangMode) {
    document
      .querySelector('.js-lizard-button')
      .addEventListener('click', () => {
        playGame('Lizard')
      })

    document.querySelector('.js-spock-button').addEventListener('click', () => {
      playGame('Spock')
    })
  }
}

addMoveListener()

document.querySelector('.js-reset-button').addEventListener('click', () => {
  score.wins = 0
  score.losses = 0
  score.ties = 0
  localStorage.removeItem('score')
  updateScoreElement()
})

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay()
})

document.querySelector('.js-big-bang-button').addEventListener('click', () => {
  bigBangMode = !bigBangMode

  if (bigBangMode) {
    document.querySelector('.js-big-bang-button').innerHTML =
      'Big Bang Theory Mode: On'
  } else {
    document.querySelector('.js-big-bang-button').innerHTML =
      'Big Bang Theory Mode: Off'
  }

  if (bigBangMode) {
    document.getElementById('title').innerHTML = 'Rock Paper Scissors Lizard Spock'
    document.getElementById('choice-container').innerHTML += `
  <button class="move-button js-lizard-button">
      <img src="/static/images/lizard-emoji.png" class="move-icon" />
    </button>
    <button class="move-button js-spock-button">
      <img src="/static/images/spock-emoji.png" class="move-icon" />
    </button>
  `
  } else {
    document.getElementById('title').innerHTML = 'Rock Paper Scissors'
    document.querySelector('.js-lizard-button').remove()
    document.querySelector('.js-spock-button').remove()
  }
  addMoveListener()
})

document.body.addEventListener('keydown', event => {
  if (event.key === 'r') {
    playGame('Rock')
  } else if (event.key === 'p') {
    playGame('Paper')
  } else if (event.key === 's') {
    playGame('Scissors')
  } else if (event.key === 'a') {
    autoPlay()
  }
  if (event.key === 'b') {
    bigBangMode = !bigBangMode
    if (bigBangMode) {
      document.querySelector('.js-big-bang-button').innerHTML =
        'Big Bang Theory Mode: On'
    } else {
      document.querySelector('.js-big-bang-button').innerHTML =
        'Big Bang Theory Mode: Off'
    }
  }
  if (bigBangMode) {
    if (event.key === 'l') {
      playGame('Lizard')
    } else if (event.key === 's') {
      playGame('Spock')
    }
  }
})

function playGame (playerMove) {
  const computerMove = pickComputerMove()

  let result = ''

  if (playerMove === computerMove) {
    result = 'Tie!'
  } else if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You lose!'
    } else if (computerMove === 'Paper') {
      result = 'You win!'
    } else if (computerMove === 'Lizard') {
      result = 'You win!'
    } else if (computerMove === 'Spock') {
      result = 'You lose!'
    }
  } else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You win!'
    } else if (computerMove === 'Scissors') {
      result = 'You lose!'
    } else if (computerMove === 'Lizard') {
      result = 'You lose!'
    } else if (computerMove === 'Spock') {
      result = 'You win!'
    }
  } else if (playerMove === 'Rock') {
    if (computerMove === 'Paper') {
      result = 'You lose!'
    } else if (computerMove === 'Scissors') {
      result = 'You win!'
    } else if (computerMove === 'Lizard') {
      result = 'You win!'
    } else if (computerMove === 'Spock') {
      result = 'You lose!'
    }
  } else if (playerMove === 'Lizard') {
    if (computerMove === 'Rock') {
      result = 'You lose!'
    } else if (computerMove === 'Scissors') {
      result = 'You lose!'
    } else if (computerMove === 'Paper') {
      result = 'You win!'
    } else if (computerMove === 'Spock') {
      result = 'You win!'
    }
  } else if (playerMove === 'Spock') {
    if (computerMove === 'Rock') {
      result = 'You win!'
    } else if (computerMove === 'Scissors') {
      result = 'You win!'
    } else if (computerMove === 'Paper') {
      result = 'You lose!'
    } else if (computerMove === 'Lizard') {
      result = 'You lose!'
    }
  }

  if (result === 'You win!') {
    score.wins += 1
  } else if (result === 'You lose!') {
    score.losses += 1
  } else if (result === 'Tie!') {
    score.ties += 1
  }

  localStorage.setItem('score', JSON.stringify(score))

  updateScoreElement()

  document.querySelector('.js-result').innerHTML = result

  document.querySelector('.js-moves').innerHTML = `You 
    <img src="/static/images/${playerMove.toLowerCase()}-emoji.png" class="move-icon" />
    <img src="/static/images/${computerMove.toLowerCase()}-emoji.png" class="move-icon"> Computer`
}

function updateScoreElement () {
  document.querySelector(
    '.js-score'
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}

function pickComputerMove () {
  const randomNumber = Math.random()

  let computerMove = ''

  if (!bigBangMode) {
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'Rock'
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'Paper'
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'Scissors'
    }
  } else {
    if (randomNumber >= 0 && randomNumber < 1 / 5) {
      computerMove = 'Rock'
    } else if (randomNumber >= 1 / 5 && randomNumber < 2 / 5) {
      computerMove = 'Paper'
    } else if (randomNumber >= 2 / 5 && randomNumber < 3 / 5) {
      computerMove = 'Scissors'
    } else if (randomNumber >= 3 / 5 && randomNumber < 4 / 5) {
      computerMove = 'Lizard'
    } else if (randomNumber >= 4 / 5 && randomNumber < 1) {
      computerMove = 'Spock'
    }
  }

  return computerMove
}
