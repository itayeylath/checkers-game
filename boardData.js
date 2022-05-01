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

    }

    //Get capture piece remove, remove image and update BoardData pieces array.
    getremove(row, col) {
        //TODO: add winner note.

        boardData.pieces.splice(boardData.getindex(row, col), 1);
        table.rows[row].cells[col].getElementsByTagName("img")[0].remove();

        if (this.blackCounter === 12 || this.whiteCounter === 12) {
            if (this.currentPlayer === WHITE_PLAYER) {
                //TODO: more simple who the winner! and func for winner!
                this.winner = BLACK_PLAYER;
            } else {
                this.winner = WHITE_PLAYER;
            }
            const WIneerPop = document.createElement("div");
            WIneerPop.textContent = "the winner by eat ALL pieces is " + this.winner;
            WIneerPop.className = 'winner';
            table.appendChild(WIneerPop);
        }
    }

    //Get 'true' if Piece exist.
    isEmpty(row, col) {
        if (this.getPiece(row, col) === undefined && row < 8 && row > -1 && col > -1 && col < 8) {
            return true;
        }
        else
            return false;
    }

    getOpponentPlayer(row, col) {
        if (this.getPiece(row, col) !== undefined) {
            if (this.getPiece(row, col).player == WHITE_PLAYER) {
                return BLACK_PLAYER;
            }
            return WHITE_PLAYER;
        }
    }

    isEnemy(possibleRow, possibleCol, row, col) {
        if (possibleRow < 8 && possibleRow > -1 && possibleCol > -1 && possibleCol < 8 && this.getPiece(row, col) !== undefined) {
            if (this.getOpponentPlayer(possibleRow, possibleCol) === this.getPiece(row, col).player) {
                return true;
            }
        }
        return false;
    }

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
                }
            }
        }
    }

    getPotentialMovment() {
        let counter = 0;
        for (let piece of this.pieces) {

            // for (let move of piece.getPossibleMoves(boardData)) {
            //     let cellRow = move[0];
            //     let cellCol = move[1];
            //     if (table.rows[cellRow].cells[cellCol].classList[1] === 'enemy') {
            //          table.rows[piece.row].cells[piece.col].classList.add('Potential-Movment');
            //     }
            // }

            if (piece.getPossibleMoves(boardData).length !== 0 && this.currentPlayer === piece.player) {
                table.rows[piece.row].cells[piece.col].classList.add('Potential-Movment');
            }
            else if (piece.getPossibleMoves(boardData).length == 0 && this.currentPlayer !== piece.player) {
                counter++;
            }

        }
        if (counter === 1) {
            this.winner = this.currentPlayer;
            const WIneerPop = document.createElement("div");
            WIneerPop.textContent = "the winner by NO movment is " + this.winner;
            WIneerPop.className = 'winner';
            table.appendChild(WIneerPop);
        }
    }
}