//Basic Information and possible move for piece.
class Piece {
    constructor(row, col, type, player) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.player = player;
        this.canMove = true;
        this.canCapture = false;
    }
    // Get moves for the specific piece in posintion.
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
    //Get regular piece moves.
    getPawnMoves(boardData) {
        let result = [];

        //Black direction (down).
        if (this.player === BLACK_PLAYER) {
            //right empty
            if (boardData.isEmpty(this.row + 1, this.col + 1)) {
                result.push([this.row + 1, this.col + 1]);
            }   //left empty
            if (boardData.isEmpty(this.row + 1, this.col - 1)) {
                result.push([this.row + 1, this.col - 1]);
            }   //capture move right
            if (boardData.isEnemy(this.row + 1, this.col + 1, this.row, this.col) && boardData.isEmpty(this.row + 2, this.col + 2)) {
                result = [];
                result.push([this.row + 1, this.col + 1]);
                result.push([this.row + 2, this.col + 2]);
                //both sides
                if (boardData.isEnemy(this.row + 1, this.col - 1, this.row, this.col) && boardData.isEmpty(this.row + 2, this.col - 2)) {
                    result.push([this.row + 1, this.col - 1]);
                    result.push([this.row + 2, this.col - 2]);
                }
                this.canCapture = true;
                boardData.getOnlyJumpAvaialble(this.player)
            }   //capture move left
            else if (boardData.isEnemy(this.row + 1, this.col - 1, this.row, this.col) && boardData.isEmpty(this.row + 2, this.col - 2)) {
                result = [];
                result.push([this.row + 1, this.col - 1]);
                result.push([this.row + 2, this.col - 2]);
                this.canCapture = true;
                boardData.getOnlyJumpAvaialble(this.player)
            } return result;
        }
        //White direction (up).
        else {
            //right empty
            if (boardData.isEmpty(this.row - 1, this.col + 1)) {
                result.push([this.row - 1, this.col + 1]);
            }    //left empty
            if (boardData.isEmpty(this.row - 1, this.col - 1)) {
                result.push([this.row - 1, this.col - 1]);
            }     //capture move right
            if (boardData.isEnemy(this.row - 1, this.col + 1, this.row, this.col) && boardData.isEmpty(this.row - 2, this.col + 2)) {
                result = [];
                result.push([this.row - 1, this.col + 1]);
                result.push([this.row - 2, this.col + 2]);
                //both sides
                if (boardData.isEnemy(this.row - 1, this.col - 1, this.row, this.col) && boardData.isEmpty(this.row - 2, this.col - 2)) {
                    result.push([this.row - 1, this.col - 1]);
                    result.push([this.row - 2, this.col - 2]);
                }
                this.canCapture = true;
                boardData.getOnlyJumpAvaialble(this.player)
            }   //capture move left
            else if (boardData.isEnemy(this.row - 1, this.col - 1, this.row, this.col) && boardData.isEmpty(this.row - 2, this.col - 2)) {
                result = [];
                result.push([this.row - 1, this.col - 1]);
                result.push([this.row - 2, this.col - 2]);
                this.canCapture = true;
                boardData.getOnlyJumpAvaialble(this.player)
            } return result;
        }
    }
    // TO DO: queen moves.
    getQueenMoves(boardData) {
    }
    //// TO DO: make it for queen moves.
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