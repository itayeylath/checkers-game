//Constant variables
const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

//no-Constant variables
let boardData;
let pieces = [];

//Decoration selected and possible moves, move piece and capture enemy- all by click.
function onCellClick(row, col) {
    const selectedPiece = boardData.getPiece(row, col);
    const selectedCell = table.rows[row].cells[col];

    //Check if this is the first move.
    if (boardData.lastCell !== undefined) {
        if (selectedCell.classList[1] === 'possible-move') {
            boardData.getMove(row, col);
            if (document.getElementsByClassName("enemy")[0] !== undefined) {
                boardData.getCaptureMove(row, col);
            }
        }
        ClearBoard();
    }

    //Print possible moves for selceted piece and Take into account player turns.

    if (selectedPiece !== undefined && boardData.winner === undefined && boardData.getTurnMoves(selectedPiece)) {

        let possibleMoves = selectedPiece.getPossibleMoves(boardData);
        for (let possibleMove of possibleMoves) {
            const CELL_ROW = possibleMove[0];
            const CELL_COL = possibleMove[1];
            //TODO: chenge capitlal letter to cell.
            let CELL = undefined;
            if (CELL_ROW !== undefined && CELL_COL !== undefined) {
                CELL = table.rows[CELL_ROW].cells[CELL_COL];
            }

            if (CELL !== undefined) {

                if (boardData.getPiece(CELL_ROW, CELL_COL) === undefined) {
                    CELL.classList.add('possible-move');
                }
                else if (boardData.isEnemy(row, col, CELL_ROW, CELL_COL)) {
                    CELL.classList.add('enemy');
                    //TODO: func thet make only move to eat.
                }
            }
        }

        // Show selected cell
        if (boardData.winner === undefined) {
            selectedCell.classList.add('selected-cell');
        }
        boardData.lastPiece = selectedPiece;
        boardData.lastCell = selectedCell;

        boardData.getPotentialMovment();

        //TODO: ERASE? or take it later for make note for play wrong
        let bool = true;
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (table.rows[i].cells[j].classList[1] === 'possible-move') {
                    bool = false;
                }
            }
        }
        if (bool === true) {
            console.log("NO PLACE TO MOVE!")
        }
    }
}

//Clear board from all Decoration.
function ClearBoard() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            table.rows[i].cells[j].classList.remove('possible-move', 'selected-cell', 'enemy', 'Potential-Movment');
        }
    }
}

//Add image to cell.
function addImg(cell, player, name) {
    const img = document.createElement("img")
    img.src = 'images/' + player + '/' + name + '.png';
    img.draggable = false;
    cell.appendChild(img);
}

//Remove image from cell.
function removeImg(cell) {
    cell.getElementsByTagName("img")[0].remove();
}

// Create 24 pieces and images for new game.
function initialPieces(row, col, cell, counterPieces) {

    if (counterPieces < 12) {
        addImg(cell, BLACK_PLAYER, 'pawn');
        pieces.push(new Piece(row, col, 'pawn', BLACK_PLAYER));
    }
    else if (counterPieces > 19) {
        addImg(cell, WHITE_PLAYER, 'pawn');
        pieces.push(new Piece(row, col, 'pawn', WHITE_PLAYER));
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
                initialPieces(row, col, cell, counterPieces);
                counterPieces++;

            } // every click on cell 'onCellClick' func will start.
            cell.addEventListener('click', () => onCellClick(row, col));
        }
    }
}

function getInitialgame() {
    creatCheckersBoard();
    //TODO: chenge to white player
    boardData = new BoardData(pieces, WHITE_PLAYER);
}


//By loaded the page the initial game will start.
window.addEventListener('load', getInitialgame);

