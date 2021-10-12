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

$('.empty').on('click', function (event) {
	event.preventDefault;
	board.forEach((tile) => {
		if ($(this).hasClass(`${tile}`)) {
			$(this).toggleClass('empty');
			tileNum = tile[1];
			board[tileNum - 1] = 'x';
			$(this).find('>:first-child').toggleClass('hide');
			if (checkWinCond(tileNum)) {
				$('.player').toggleClass('hide');
			} else {
				compMoveTile = `t${Math.ceil(Math.random() * 9)}`;
				console.log(compMoveTile);
				while (
					compMoveTile === tile ||
					!$(`.${compMoveTile}`).hasClass('empty')
				) {
					compMoveTile = `t${Math.ceil(Math.random() * 9)}`;
				}
				$(`.${compMoveTile}`).toggleClass('empty');
				$(`.${compMoveTile}`).find('>:last-child').toggleClass('hide');
				board[compMoveTile[1] - 1] = 'o';
				if (checkWinCond(compMoveTile[1])) {
					$('.computer').toggleClass('hide');
				}
			}
		}
	});
});

$('.reset-button').on('click', function (event) {
	event.preventDefault;
    $('div').addClass('empty');
    $('i').addClass('hide');
    $('article>p').addClass('hide');
    for (let i = 0; i < board.length; i++){
        board[i] = `t${i+1}`;
    }
});
