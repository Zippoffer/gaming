const socket = io()

socket.on('connect', ()=> console.log(`socket connected ${socket.id}`))

socket.on('disconnect', ()=> console.log(`socket disconnected ${socket.id}`))

const status = document.querySelector('.status')


const board = [
['','',''],
['','',''],
['','',''],

]

let nextPlayer = 'X'
const	drawBoard = (boardState) => {
document.querySelector('#board').innerHTML = `
<table>
		<tr>
			<td>${boardState[0][0]}</td>
			<td>${boardState[0][1]}</td>
			<td>${boardState[0][2]}</td>
		</tr>
		<tr>
			<td>${boardState[1][0]}</td>
			<td>${boardState[1][1]}</td>
			<td>${boardState[1][2]}</td>
		</tr>
		<tr>
			<td>${boardState[2][0]}</td>
			<td>${boardState[2][1]}</td>
			<td>${boardState[2][2]}</td>
		</tr>
	</table>
	`
	// status.innerText = (`${nextPlayer}'s turn`)
	status.innerText = `${nextPlayer}'s Turn`

}

const winner = b => {
  // Rows
  if (b[0][0] && b[0][0] === b[0][1] && b[0][1] === b[0][2]) {
    return b[0][0]
  }

  if (b[1][0] && b[1][0] === b[1][1] && b[1][1] === b[1][2]) {
    return b[1][0]
  }

  if (b[2][0] && b[2][0] === b[2][1] && b[2][1] === b[2][2]) {
    return b[2][0]
  }

  // Cols
  if (b[0][0] && b[0][0] === b[1][0] && b[1][0] === b[2][0]) {
    return b[0][0]
  }

  if (b[0][1] && b[0][1] === b[1][1] && b[1][1] === b[2][1]) {
    return b[0][1]
  }

  if (b[0][2] && b[0][2] === b[1][2] && b[1][2] === b[2][2]) {
    return b[0][2]
  }

  // Diags
  if (b[0][0] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
    return b[0][0]
  }

  if (b[0][2] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
    return b[0][2]
  }

  // Tie or In-Progress
  else {
    return null
  }
}


drawBoard(board)
const table = document.querySelector('table')
table.addEventListener('click', evt => {
	
	const col = evt.target.cellIndex
	const row = evt.target.closest('tr').rowIndex

	// if(board[row][col]) {
	// 	return console.log('yep')
	// }
 	if (board[row][col]) {
    return console.log('Cannot move there')
  }

	 if (winner(board)) {
    return console.log('Game is over!')
  }

	board[row][col] = nextPlayer

	drawBoard(board)

 	if (winner(board)) {
    return status.innerText = `${nextPlayer} WON!`
  }

	nextPlayer = nextPlayer === 'X' ? 'O' : 'X'
	 status.innerText = `${nextPlayer}'s Turn`
	// board[row][col]='o'

	// evt.target.innerText = 'o'
	// console.log(`you clicked on : ${col, row}`)
})
