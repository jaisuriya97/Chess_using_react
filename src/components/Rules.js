const validate = (pieceName, boardPiece, dropPosition, activePiece) => {
    // console.log(pieceName, boardPiece, dropPosition, activePiece);
    const isSquareOccupied = (x, y) => {
        return boardPiece.some(p => p.x === x && p.y === y);
    };
    const isCaptureMove = (x, y, pieceColor) => {
        const capturePiece = boardPiece.find(p => p.x === x && p.y === y && p.name.split('-')[1] !== pieceColor);
        if (capturePiece) {
            const swap = boardPiece.find(p => p.x === activePiece.gridX && p.y === activePiece.gridY);
            swap.x = capturePiece.x;
            swap.y = capturePiece.y
            capturePiece.x = '';
            capturePiece.y = '';
            return true;
        }
        return false;
    };

    const pieceColor = pieceName.split('-')[1];
    const validatePawnMove = (x, y) => {
        if (pieceColor === 'b') {
            if (x === activePiece.gridX - 1 && y === activePiece.gridY && !isSquareOccupied(x, y)) {
                return true;
            }
            if (x === activePiece.gridX - 2 && y === activePiece.gridY && activePiece.gridX === 6 && !isSquareOccupied(x, y) && !isSquareOccupied(activePiece.gridX - 1, activePiece.gridY)) {
                return true;
            }
            if (x === activePiece.gridX - 1 && Math.abs(y - activePiece.gridY) === 1 && isCaptureMove(x, y, pieceColor)) {
                return true;
            }
        } else {
            if (x === activePiece.gridX + 1 && y === activePiece.gridY && !isSquareOccupied(x, y)) {
                return true;
            }
            if (x === activePiece.gridX + 2 && y === activePiece.gridY && activePiece.gridX === 1 && !isSquareOccupied(x, y) && !isSquareOccupied(activePiece.gridX + 1, activePiece.gridY)) {
                return true;
            }
            if (x === activePiece.gridX + 1 && Math.abs(y - activePiece.gridY) === 1 && isCaptureMove(x, y, pieceColor)) {
                return boardPiece;
            }
        }
        return false;
    };
    const validateKnightMove = (x, y) => {
        const dx = Math.abs(x - activePiece.gridX);
        const dy = Math.abs(y - activePiece.gridY);
        if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) {
            if (isSquareOccupied(x, y)) {
                return isCaptureMove(x, y, pieceColor);
            }
            return true;
        }
        return false;
    };

    const validateRookMove = (x, y) => {
        if (x !== activePiece.gridX && y !== activePiece.gridY) return false;
        const xDir = Math.sign(x - activePiece.gridX);
        const yDir = Math.sign(y - activePiece.gridY);
        let i = activePiece.gridX + xDir;
        let j = activePiece.gridY + yDir;
        while (i !== x || j !== y) {
            if (isSquareOccupied(i, j)) return false;
            i += xDir;
            j += yDir;
        }
        if (isSquareOccupied(x, y)) {
            return isCaptureMove(x, y, pieceColor);
        }
        return true;
    };
    const validateBishopMove = (x, y) => {
        if (Math.abs(x - activePiece.gridX) !== Math.abs(y - activePiece.gridY)) return false;
        const xDir = Math.sign(x - activePiece.gridX);
        const yDir = Math.sign(y - activePiece.gridY);
        let i = activePiece.gridX + xDir;
        let j = activePiece.gridY + yDir;
        while (i !== x || j !== y) {
            if (isSquareOccupied(i, j)) return false;
            i += xDir;
            j += yDir;
        }
        if (isSquareOccupied(x, y)) {
            return isCaptureMove(x, y, pieceColor);
        }
        return true;
    };
    const validateQueenMove = (x, y) => {
        return validateRookMove(x, y) || validateBishopMove(x, y);
    };

    const validateKingMove = (x, y) => {
        const dx = Math.abs(x - activePiece.gridX);
        const dy = Math.abs(y - activePiece.gridY);
        if (dx <= 1 && dy <= 1) {
            if (isSquareOccupied(x, y)) {
                return isCaptureMove(x, y, pieceColor);
            }
            return true;
        }
        return false;
    };

    
    switch (pieceName) {
        case 'pawn-b':
        case 'pawn-w':
            return validatePawnMove(dropPosition.x, dropPosition.y);
        case 'knight-b':
        case 'knight-w':
            return validateKnightMove(dropPosition.x, dropPosition.y);
        case 'rook-b':
        case 'rook-w':
            return validateRookMove(dropPosition.x, dropPosition.y);
        case 'bishop-b':
        case 'bishop-w':
            return validateBishopMove(dropPosition.x, dropPosition.y);
        case 'queen-b':
        case 'queen-w':
            return validateQueenMove(dropPosition.x, dropPosition.y);
        case 'king-b':
        case 'king-w':
            return validateKingMove(dropPosition.x, dropPosition.y);
        default:
            return false;
    }
};

export default validate;
