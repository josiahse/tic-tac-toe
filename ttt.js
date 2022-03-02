const board = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9'];
const winCombos = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7],
];

let checkWinCond = (tile) => {
	tile = parseInt(tile);

	for (combo of winCombos) {
		for (num of combo) {
			if (num === tile) {
				if (
					board[combo[0] - 1] === board[combo[1] - 1] &&
					board[combo[0] - 1] === board[combo[2] - 1]
				) {
					return true;
				}
			}
		}
	}
};

const checkEmpty = (index) => {
	return board[index] !== 'x' && board[index] !== 'o';
};

const computerMove = () => {
	let compIndex = Math.floor(Math.random() * 9);
	while (!checkEmpty(compIndex)) {
		console.log('checking tile');
		compIndex = Math.floor(Math.random() * 9);
	}

	compMoveTile = `t${compIndex + 1}`;
	// console.log(compMoveTile);

	$(`.${compMoveTile}`).toggleClass('empty');
	$(`.${compMoveTile}`).find('>:last-child').toggleClass('hide');
	board[compMoveTile[1] - 1] = 'o';
	console.log(`c: ${board}`);
	if (checkWinCond(compMoveTile[1])) {
		$('.computer').toggleClass('hide');
	}
};

$('.empty').on('click', function (event) {
	if ($(this).hasClass('empty')) {
		let tileNum = 0;
		event.preventDefault;
		$(this).toggleClass('empty');
		board.forEach((tile) => {
			if ($(this).hasClass(`${tile}`)) {
				tileNum = tile[1];
				board[tileNum - 1] = 'x';
				console.log(`p: ${board}`);
			}
		});
		$(this).find('>:first-child').toggleClass('hide');

		if (checkWinCond(tileNum)) {
			$('.player').toggleClass('hide');
		} else {
			computerMove();
		}
	}
});

$('.reset-button').on('click', function (event) {
	event.preventDefault;
	$('div').addClass('empty');
	$('i').addClass('hide');
	$('article>p').addClass('hide');
	for (let i = 0; i < board.length; i++) {
		board[i] = `t${i + 1}`;
	}
});
