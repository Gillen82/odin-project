'use strict';

const CreateBoard = (() => {
	// get game board element
	const gameBoard = document.querySelector('.game-board');
	// initial settings
	const board = [];
	const rows = 3;
	const cols = 3;
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
