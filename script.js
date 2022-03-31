'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRollTheDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnReset = document.querySelector('.btn--new');
const constCurrent0El = document.getElementById('current--0');
const constCurrent1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//Starting conditions

let totalScores = [0, 0];
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnHold.addEventListener('click', function () {
  if (playing) {
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    if (totalScores[activePlayer] >= 100) {
      //finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    switchPlayer();
  }
});

//Rolling the dice action

btnRollTheDice.addEventListener('click', function () {
  if (playing) {
    const number = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${number}.png`;

    if (number !== 1) {
      //add dice to score
      currentScore += number;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnReset.addEventListener('click', function () {
  totalScores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  constCurrent0El.textContent = 0;
  constCurrent1El.textContent = 0;
  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');
});
