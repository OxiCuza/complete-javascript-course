/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let roundScore, scores, activePlayer;
const diceDOM = document.querySelector(".dice");
const player0 = document.querySelector(".player-0-panel");
const player1 = document.querySelector(".player-1-panel");
const name0 = document.getElementById("name-0");
const name1 = document.getElementById("name-1");
const current0 = document.getElementById("current-0");
const current1 = document.getElementById("current-1");
const score0 = document.getElementById("score-0");
const score1 = document.getElementById("score-1");

init();

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

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
	roundScore = 0;
	scores = [0, 0];
	activePlayer = 0;

	player0.classList.remove("winner");
	player1.classList.remove("winner");
	player0.classList.add("active");
	name0.classList.remove("active");
	name1.classList.remove("active");
	name0.textContent = "Player 1";
	name1.textContent = "Player 2";
	score0.textContent = "0";
	score1.textContent = "0";
	current0.textContent = "0";
	current1.textContent = "0";
	diceDOM.style.display = "none";
}

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
