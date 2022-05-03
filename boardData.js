//Information on the board, the brain of the game.
class BoardData {
    constructor(pieces, firstPlayer) {
        this.pieces = pieces;
        this.currentPlayer = firstPlayer;
        this.winner = undefined;
        this.lastPiece = undefined;
        this.lastCell = undefined;
        this.whiteCounter = 0;
        this.blackCounter = 0;

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
        let index = -1;
        for (const piece of this.pieces) {
            index++;
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
        this.isNoMovement();
    }
    //Get capture piece remove, remove image and update BoardData pieces array.
    getremove(row, col) {
        boardData.pieces.splice(boardData.getindex(row, col), 1);
        table.rows[row].cells[col].getElementsByTagName("img")[0].remove();
        //check if all pieces captured.
        if (this.blackCounter === 12 || this.whiteCounter === 12) {
            if (this.currentPlayer === WHITE_PLAYER) {
                this.winner = BLACK_PLAYER;
            } else {
                this.winner = WHITE_PLAYER;
            }
            getNotifyWinner();
        }
    }
    //Get 'true' if Piece is not exist.
    isEmpty(row, col) {
        if (this.getPiece(row, col) === undefined && row < 8 && row > -1 && col > -1 && col < 8) {
            return true;
        }
        else
            return false;
    }
    //Get the the opponent player for the specific piece.
    getOpponentPlayer(row, col) {
        if (this.getPiece(row, col) !== undefined) {
            if (this.getPiece(row, col).player == WHITE_PLAYER) {
                return BLACK_PLAYER;
            }
            return WHITE_PLAYER;
        }
    }
    //Get 'true' if the piece is enemy.
    isEnemy(possibleRow, possibleCol, row, col) {
        if (possibleRow < 8 && possibleRow > -1 && possibleCol > -1 && possibleCol < 8 && this.getPiece(row, col) !== undefined) {
            if (this.getOpponentPlayer(possibleRow, possibleCol) === this.getPiece(row, col).player) {
                return true;
            }
        } return false;
    }
    //Get capture move.
    getCaptureMove(row, col) {
        const Options = [[1, 0], [1, -1], [1, 1], [0, -1], [0, 1], [-1, 0], [-1, 1], [-1, -1]];
        for (let Option of Options) {
            let cellRow = row + Option[0];
            let cellCol = col + Option[1];
            if (cellRow < 8 && cellRow > -1 && cellCol > -1 && cellCol < 8) {
                if (table.rows[cellRow].cells[cellCol].classList[1] === 'enemy') {
                    if (this.getPiece(cellRow, cellCol).player === BLACK_PLAYER) {
                        this.blackCounter++;
                    }
                    else {
                        this.whiteCounter++;
                    }
                    this.getremove(cellRow, cellCol);
                    this.capturHappen();
                }
            }
        }
    }
    //Show the potinatial players who can move foe the current player.
    getPotentialMovment() {
        for (let piece of this.pieces) {
            if (mustMakeJump === true && piece.canCapture === true && this.currentPlayer === piece.player) {
                table.rows[piece.row].cells[piece.col].classList.add('Potential-Movment');
            }
            else if (mustMakeJump === false && piece.getPossibleMoves(boardData).length !== 0 && this.currentPlayer === piece.player) {
                table.rows[piece.row].cells[piece.col].classList.add('Potential-Movment');
            }
        }
    }
    // Get game back to rgular, any jump available.
    capturHappen() {
        mustMakeJump = false;
        for (let piece of boardData.pieces) {
            if (piece.canCapture) {
                piece.canCapture = false;
            }
        }
    }
    // get game to only capture available.
    getOnlyJumpAvaialble(player) {
        mustMakeJump = true;
        for (let piece of boardData.pieces) {
            if (piece.player === player && piece.canCapture === true) {

            }
        }
    }
    //Get length of pieces from the same player.
    amountOfPiecePlayer(player) {
        let counter = 0;
        const currentPieces = boardData.pieces;
        for (let piece of currentPieces) {
            if (piece.player === player) {
                counter++
            }
        } return counter;
    }
    //Notify winner if the player cannot make another move.
    isNoMovement() {
        let counterB = 0;
        let counterW = 0;
        for (let piece of boardData.pieces) {
            if (piece.getPossibleMoves(boardData).length === 0 && piece.player === BLACK_PLAYER) {
                counterB++
            }
            else if (piece.getPossibleMoves(boardData).length === 0 && piece.player === WHITE_PLAYER) {
                counterW++
            }
        }
        if (counterB === this.amountOfPiecePlayer(BLACK_PLAYER)) {
            this.winner = WHITE_PLAYER;
            getNotifyWinner();
        }
        else if (counterW === this.amountOfPiecePlayer(WHITE_PLAYER)) {
            this.winner = BLACK_PLAYER;
            getNotifyWinner();
        }

    }

    getTrueCapture() {
        for (let piece of boardData.pieces) {
            if (piece.canCapture) {
                console.log(piece);
            }
        }
    }
}


// boardData.printPossibleMoves(possibleMoves, row, col)