'use strict';

const CreateBoard = (() => {
	// initial settings
	const board = [];
	const rows = 3;
	const cols = 3;
	// get game board element
	const gameBoard = document.querySelector('.game-board');
	// create tile elements
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const tileEl = document.createElement('div');
			tileEl.classList.add('tile');
			board.push(tileEl);
		}
	}
	// display board tiles
	board.forEach((tile) => {
		gameBoard.appendChild(tile);
	});
})();

const CreatePlayer = (() => {
	let activePlayer = 0;
	const markers = ['X', 'O'];
	// set active player
	let currentPlayer = document.querySelector(`.player--${activePlayer}`);
	currentPlayer.classList.add('active-player');
	// switch players
	const switchPlayers = () => {
		currentPlayer.classList.toggle('active-player');
		activePlayer = activePlayer == 1 ? 0 : 1;
		currentPlayer = document.querySelector(`.player--${activePlayer}`);
		currentPlayer.classList.toggle('active-player');
	};

	return { switchPlayers };
})();
