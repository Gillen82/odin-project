'use strict';

// set up game board
const Board = (() => {
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

	return { board };
})();

// set up player functionality
const Player = (() => {
	let activePlayer = 0;
	const playerOnePositions = [];
	const playerTwoPositions = [];
	const positions = [playerOnePositions, playerTwoPositions];
	// set active player
	let currentPlayer = document.querySelector(`.player--${activePlayer}`);
	currentPlayer.classList.add('active-player');
	// switch players
	const switchPlayers = () => {
		currentPlayer.classList.toggle('active-player');
		activePlayer = activePlayer == 0 ? 1 : 0;
		currentPlayer = document.querySelector(`.player--${activePlayer}`);
		currentPlayer.classList.toggle('active-player');
		return activePlayer;
	};

	return { activePlayer, positions, switchPlayers };
})();

// play game
const playGame = (() => {
	// store game state
	let isGameOver = false;
	// store player index
	let playerIndex = Player.activePlayer;
	// store active marker
	const Markers = ['X', 'O'];
	let currentMarker = Markers[Player.activePlayer];
	// winning patterns
	const winningPatterns = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	// add playermarker to the board and switch player
	Board.board.forEach((tile) => {
		tile.addEventListener('click', () => {
			if (!tile.innerText) {
				tile.innerText = currentMarker;
				Player.positions[playerIndex].push(Board.board.indexOf(tile));
				// check for winning combination
				winningPatterns.forEach((card) => {
					let result = card.every((num) => Player.positions[playerIndex].includes(num));
					if (result) {
						console.log('WINNER 🎊');
						isGameOver = true;
					}
				});
				if (!isGameOver) {
					console.log(Player.positions[playerIndex]);
					playerIndex = Player.switchPlayers();
					currentMarker = Markers[playerIndex];
				}
			}
		});
	});
})();
