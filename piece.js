class Piece {
    constructor(row, col, type, player) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
    }

    getPossibleMoves(boardData) {
        let moves = [];
        if (this.type === 'pawn') {
            moves = this.getPawnMoves(boardData);
        }
        else if (this.type === 'queen') {
            moves = this.getQueenMoves(boardData);
        }
        return moves;
    }
    getPawnMoves(boardData) {
        let result = [];
        let opositions = [];
        let counter = 0;
        // TO DO: need up ?
        const UP = -1;

        //Black direction (down).
        if (this.player === BLACK_PLAYER) {

            //right empty
            if (boardData.isEmpty(this.row + 1, this.col + 1)) {
                result.push([this.row + 1, this.col + 1])
            }
            //left empty
            if (boardData.isEmpty(this.row + 1, this.col - 1)) {
                result.push([this.row + 1, this.col - 1])
            }
            //capture move right
            if (boardData.isEnemy(this.row + 1, this.col + 1, this.row, this.col) && boardData.isEmpty(this.row + 2, this.col + 2)) {
                result = [];
                result.push([this.row + 1, this.col + 1])
                result.push([this.row + 2, this.col + 2])
                //both sides
                if (boardData.isEnemy(this.row + 1, this.col - 1, this.row, this.col) && boardData.isEmpty(this.row + 2, this.col - 2)) {
                    result.push([this.row + 1, this.col - 1])
                    result.push([this.row + 2, this.col - 2])
                }
            }
            //capture move left
            else if (boardData.isEnemy(this.row + 1, this.col - 1, this.row, this.col) && boardData.isEmpty(this.row + 2, this.col - 2)) {
                result = [];
                result.push([this.row + 1, this.col - 1])
                result.push([this.row + 2, this.col - 2])
            }
            return result;
        }

        //White direction (up).
        else if (this.player === WHITE_PLAYER) {
            result = [];
            //right empty
            if (boardData.isEmpty(this.row - 1, this.col + 1)) {
                result.push([this.row - 1, this.col + 1])
            }
            //left empty
            if (boardData.isEmpty(this.row - 1, this.col - 1)) {
                result.push([this.row - 1, this.col - 1])
            }
            //capture move right
            if (boardData.isEnemy(this.row - 1, this.col + 1, this.row, this.col) && boardData.isEmpty(this.row - 2, this.col + 2)) {
                result = [];
                result.push([this.row - 1, this.col + 1])
                result.push([this.row - 2, this.col + 2])
                //both sides
                if (boardData.isEnemy(this.row - 1, this.col - 1, this.row, this.col) && boardData.isEmpty(this.row - 2, this.col - 2)) {
                    result.push([this.row - 1, this.col - 1])
                    result.push([this.row - 2, this.col - 2])
                }
            }
            //capture move left
            else if (boardData.isEnemy(this.row - 1, this.col - 1, this.row, this.col) && boardData.isEmpty(this.row - 2, this.col - 2)) {
                result = [];
                result.push([this.row - 1, this.col - 1])
                result.push([this.row - 2, this.col - 2])
            }
            return result;
        }
    }

    getQueenMoves(boardData) {
        // TO DO: queen moves.
    }

    //stop possible moves after other player
    getMovesInDirection(directionRow, directionCol, boardData) {
        let result = [];
        for (let i = 1; i < BOARD_SIZE; i++) {
            let row = this.row + directionRow * i;
            let col = this.col + directionCol * i;

            if (boardData.getPiece(row, col) === undefined) {
                result.push([row, col]);
            } else {
                result.push([row, col]);
                return result;
            }
        } return result;
    }
}