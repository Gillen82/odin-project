'use strict';

// create gameboard
const Gameboard = (function () {
	const rows = 3;
	const cols = 3;
	const gameArea = [];

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			gameArea.push('[]');
		}
	}

	return { rows, cols, gameArea };
})();

// create players
const Players = (function () {
	const playerOne = [['X'], []];
	const playerTwo = [['O'], []];
	const players = [playerOne, playerTwo];

	return { players };
})();

// display UI
const displayUI = (function () {
	// set tile index
	let tileIndex = 0;
	const gameBoardEl = document.querySelector('.game-board');
	// display tiles
	const displayTiles = function () {
		Gameboard.gameArea.forEach((tile) => {
			// create tile element
			tile = document.createElement('div');
			tile.classList.add('tile');
			tile.setAttribute('data-index', tileIndex);
			gameBoardEl.appendChild(tile);
			tileIndex++;
		});
		return gameBoardEl;
	};
	return { displayTiles };
})();

// game control
const Game = function () {
	let playerIndex = 0;
	let currentPlayer = Players.players[playerIndex];
	const gb = displayUI.displayTiles();

	// switch players
	const switchPlayer = function () {
		playerIndex = playerIndex == 0 ? 1 : 0;
		currentPlayer = Players.players[playerIndex];
	};

	// check for game result
	const gameResult = function (positions) {
		// convert player poistions to ints
		positions = positions.map((n) => parseInt(n));

		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		winningCombinations.forEach((combi) => {
			let result = combi.every((n) => positions.includes(n));
			console.log(result);
		});
	};
	// add click event to tiles
	gb.addEventListener('click', (e) => {
		e.target.innerText = currentPlayer[0];
		currentPlayer[1].push(e.target.getAttribute('data-index'));
		gameResult(currentPlayer[1]);

		switchPlayer();
	});
};

Game();
