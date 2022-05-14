'use strict';

/* Selecting Elements */
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player1El = document.querySelector('.player--1');
const player0El = document.querySelector('.player--0');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

const init = function(){
   scores = [0, 0];
   currentScore = 0;
   activePlayer = 0;
   playing = true;
  
  diceEl.classList.add('hidden');

  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
};

init();

/* Switch Player Function */
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}


/* Rolling Dice Function */

  btnRoll.addEventListener('click', function () {
    if (playing) {
    // 1. Generating Random Dice Number
    const dice = Math.trunc(Math.random() * 6 + 1);

    // 2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3.Check For Rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Swtich Player
      switchPlayer();
    }
  }
  });

/* BUTTON HOLD FUNCTION */

  btnHold.addEventListener('click', function () {
    if (playing) {
    // 1. Add Scores to Active Player Score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      // Finish Game
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      // 3. Swtich to the next player
      switchPlayer();
    }
    }
  });

// Resting The Game
btnNew.addEventListener('click', init);