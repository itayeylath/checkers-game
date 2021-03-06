//Constant variables.
const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';
const MAN = 'man';
const KING = 'king';

//no-Constant variables.
let boardData;
let pieces = [];
let mustMakeJump = false;

//Notify the winner when the game end.
function getNotifyWinner() {
    const notify = document.createElement("div");
    notify.textContent = "the winner is " + boardData.winner;
    notify.className = 'winner';
    table.appendChild(notify);
}
//Clear board from all Decoration.
function ClearBoard() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            table.rows[i].cells[j].classList.remove('possible-move', 'selected-cell', 'enemy', 'Potential-Movment');
        }
    }
}
//Remove image from cell.
function removeImg(cell) {
    cell.getElementsByTagName("img")[0].remove();
}
//decoration possible moves for selceted piece.
function printPossibleMoves(possibleMoves, row, col) {
    for (let possibleMove of possibleMoves) {
        const cellRow = possibleMove[0];
        const cellCol = possibleMove[1];
        let cell = undefined;
        if (cellRow !== undefined && cellCol !== undefined) {
            if (cellRow < 8 && cellRow > -1 && cellCol < 8 && cellCol > -1) {

                cell = table.rows[cellRow].cells[cellCol];
            }
        }

        if (cell !== undefined) {
            if (boardData.isEnemy(row, col, cellRow, cellCol)) {
                cell.classList.add('enemy');
            }
            else if (boardData.getPiece(cellRow, cellCol) === undefined) {
                cell.classList.add('possible-move');
            }
        }
    }
}
//Decoration selected and possible moves, move piece and capture enemy- all by click.
function onCellClick(row, col) {
    const selectedPiece = boardData.getPiece(row, col);
    const seleceteCell = table.rows[row].cells[col];
    //Check if this is the first move for making regular move or capture move.
    if (boardData.lastCell !== undefined) {
        if (seleceteCell.classList[1] === 'possible-move') {
            boardData.getMove(row, col);
            //Check if this is the capture move.
            if (document.getElementsByClassName("enemy")[0] !== undefined) {
                boardData.getCaptureMove(row, col);
            }
        }
        boardData.getPotentialMovment();
        ClearBoard();

        boardData.getPotentialMovment();
    }
    //Show the possible moves for selceted piece and Take into account player turns and capture move.
    if (selectedPiece !== undefined && boardData.winner === undefined && boardData.getTurnMoves(selectedPiece)) {
        const possibleMoves = selectedPiece.getPossibleMoves(boardData);
        if (mustMakeJump === true) {
            if (selectedPiece.canCapture) {
                printPossibleMoves(possibleMoves, row, col)
            }
        }
        else {
            printPossibleMoves(possibleMoves, row, col)
        }
        //Show selected cell.
        seleceteCell.classList.add('selected-cell');
        boardData.lastPiece = selectedPiece;
        boardData.lastCell = seleceteCell;
    }
}
//Add image to cell.
function addImg(cell, player, type) {
    const img = document.createElement("img")
    img.src = 'images/' + player + '/' + type + '.png';
    img.draggable = false;
    cell.appendChild(img);
}
// Create array of 24 pieces clases and images for new game.
function initialPieces(row, col, cell, counterPieces) {
    //12 black pieces.
    if (counterPieces < 12) {
        addImg(cell, BLACK_PLAYER, MAN);
        pieces.push(new Piece(row, col, MAN, BLACK_PLAYER));
    } //12 white pieces.
    else if (counterPieces > 19) {
        addImg(cell, WHITE_PLAYER, MAN);
        pieces.push(new Piece(row, col, MAN, WHITE_PLAYER));
    }
}
//Create a checkers board 8X8 and 24 pieces.
function creatCheckersBoard() {
    table = document.createElement('table');
    document.body.appendChild(table);
    let counterPieces = 0;
    for (let row = 0; row < BOARD_SIZE; row++) {
        const rowElemnt = table.insertRow();
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = rowElemnt.insertCell();
            if ((row + col) % 2 === 0) {
                cell.className = 'light-cell';
            } else {
                cell.className = 'dark-cell';
                //Creat piece.
                initialPieces(row, col, cell, counterPieces);
                counterPieces++;

            } // every click on cell 'onCellClick' func will start.
            cell.addEventListener('click', () => onCellClick(row, col));
        }
    }
}
//operate 'creatCheckersBoard' func and create new BordData.
function getInitialgame() {
    creatCheckersBoard();
    //Push initail pieces array and first player turn (white).
    boardData = new BoardData(pieces, WHITE_PLAYER);
    boardData.getPotentialMovment();
}
//By loaded the page the initial game will start.
window.addEventListener('load', getInitialgame);