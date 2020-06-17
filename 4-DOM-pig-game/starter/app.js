/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let roundScore, scores, activePlayer;

roundScore = 0;
scores = [0, 0];
activePlayer = 0;

// document.querySelector(`#current-${activePlayer}`).textContent = dice;
const diceDOM = document.querySelector(".dice");
const player0 = document.querySelector(".player-0-panel");
const player1 = document.querySelector(".player-1-panel");

diceDOM.style.display = "none";

document.querySelector(".btn-roll").addEventListener("click", function () {
	let diceValue = Math.floor(Math.random() * 6) + 1;

	if (diceValue !== 1) {
		diceDOM.src = `dice-${diceValue}.png`;
		diceDOM.style.display = "block";
		roundScore += diceValue;
		document.getElementById(
			`current-${activePlayer}`
		).textContent = roundScore;
	} else {
		nextPlayer();
	}
});

document.querySelector(".btn-hold").addEventListener("click", function () {
	scores[activePlayer] += roundScore;
	document.getElementById(`score-${activePlayer}`).textContent =
		scores[activePlayer];
	if (scores[activePlayer] >= 20) {
		document.getElementById(`current-${activePlayer}`).textContent = 0;
		document.getElementById(`name-${activePlayer}`).textContent =
			"Winner !!!";
		document
			.querySelector(`.player-${activePlayer}-panel`)
			.classList.remove("active");
		document
			.querySelector(`.player-${activePlayer}-panel`)
			.classList.add("winner");
		diceDOM.style.display = "none";
	} else {
		nextPlayer();
	}
});

function nextPlayer() {
	roundScore = 0;
	document.getElementById(
		`current-${activePlayer}`
	).textContent = roundScore;
	diceDOM.style.display = "none";
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	player0.classList.toggle("active");
	player1.classList.toggle("active");
}
