//Constant variables
const BOARD_SIZE = 8;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';

//no-Constant variables
let boardData;
let pieces = [];

class BoardData {
    constructor(pieces, firstPlayer) {
        this.pieces = pieces;
        this.currentPlayer = firstPlayer;
        this.winner = undefined;
        this.lastPiece = undefined;
        this.lastCell = undefined;
    }
    //Get piece class by row and col.
    getPiece(row, col) {
        for (const piece of this.pieces) {
            if (piece.row === row && piece.col === col) {
                return piece;
            }
        }
    }
    //Get index of the piece in pieces array.
    getindex(row, col) {
        let index = -1 ;
        for (const piece of this.pieces) {
            index++ ;
            if (piece.row === row && piece.col === col) {
                return index;
            }
        }

    }

    //Get 'true' if it your turn.
    getTurnMoves(piece) {
        if (this.currentPlayer == piece.player) {
            return true;
        } return false;
    }

    //Update array after movment.
    updatePiecesArray(pieces, index, row, col, type, player) {
        pieces[index] = new Piece(row, col, type, player);

        //get the Player for next turn
        if (this.currentPlayer === BLACK_PLAYER) {
            this.currentPlayer = WHITE_PLAYER;
        }
        else {
            this.currentPlayer = BLACK_PLAYER;
        }
    }

    //Get piece move, add image and update BoardData pieces array.
    getMove(row, col) {
        addImg(table.rows[row].cells[col], this.lastPiece.player, this.lastPiece.type);
        removeImg(this.lastCell);
        this.updatePiecesArray(boardData.pieces, boardData.getindex(this.lastPiece.row, this.lastPiece.col), row, col, this.lastPiece.type, this.lastPiece.player);

    }

}


class Piece {
    constructor(row, col, type, player) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
    }

    getPossibleMoves() {
        let moves = [];
        if (this.type === 'pawn') {
            moves = this.getPawnMoves(boardData);
        }
        else if (this.type === 'queen') {
            moves = this.getQueenMoves(boardData);
        }
    }
    getPawnMoves(boardData) {
        let result = [];
        // TO DO: need up ?
        const UP = -1;

        //black dirc
        if (this.player === BLACK_PLAYER) {
            result.push([this.row + 1, this.col + 1])
            result.push([this.row + 1, this.col - 1])
        }
        // whit dirc
        else {
            result.push([this.row - 1, this.col + 1])
            result.push([this.row - 1, this.col - 1])
        }
        return result;


    }

    getQueenMoves(boardData) {
        // TO DO: queen moves.
    }
}

//Decoration selected and possible moves, move piece and capture enemy- all by click.
function onCellClick(row, col) {
    const selectedPiece = boardData.getPiece(row, col);
    const selectedCell = table.rows[row].cells[col];
    
    //Check if this is the first move.
    if (boardData.lastCell !== undefined) {
        if (selectedCell.classList[1] === 'possible-move') {
            boardData.getMove(row, col);
        }

        ClearBoard();
    }

    //print possible moves for selceted piece
    // TO DO: put it in the if -  && boardData.getTurnMoves(selectedPiece)
    if (selectedPiece !== undefined && boardData.winner === undefined) {

        let possibleMoves = selectedPiece.getPawnMoves();
        for (let possibleMove of possibleMoves) {
            const CELL_ROW = possibleMove[0];
            const CELL_COL = possibleMove[1];
            const CELL = table.rows[CELL_ROW].cells[CELL_COL];

            if (boardData.getPiece(CELL_ROW, CELL_COL) === undefined && CELL !== undefined) {
                CELL.classList.add('possible-move');
            }
        }


    }

    // Show selected cell
    if (boardData.winner === undefined) {
        selectedCell.classList.add('selected-cell');
    }
    boardData.lastPiece = selectedPiece;
    boardData.lastCell = selectedCell;

}

//Clear board from all Decoration.
function ClearBoard() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            table.rows[i].cells[j].classList.remove('possible-move', 'selected-cell', 'capture-move');
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
function removeImg(cell){
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
    boardData = new BoardData(pieces, BLACK_PLAYER);
}
//By loaded the page the initial game will start.
window.addEventListener('load', getInitialgame);