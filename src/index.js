



import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);


















































// switch (pieceName) {
//     case 'pawn-b':
//     case 'pawn-w':
//         return validatePawnMove(dropPosition.x, dropPosition.y);
//     case 'rook-b':
//     case 'rook-w':
//         return validateRookMove(dropPosition.x, dropPosition.y);
//     case 'knight-b':
//     case 'knight-w':
//         return validateKnightMove(dropPosition.x, dropPosition.y);
//     case 'bishop-b':
//     case 'bishop-w':
//         return validateBishopMove(dropPosition.x, dropPosition.y);
//     case 'queen-b':
//     case 'queen-w':
//         return validateQueenMove(dropPosition.x, dropPosition.y);
//     case 'king-b':
//     case 'king-w':
//         return validateKingMove(dropPosition.x, dropPosition.y);
//     default:
//         return false;
// }


// const validateRookMove = (x, y) => {
//     if (x !== activePiece.gridX && y !== activePiece.gridY) return false;
//     const xDir = Math.sign(x - activePiece.gridX);
//     const yDir = Math.sign(y - activePiece.gridY);
//     let i = activePiece.gridX + xDir;
//     let j = activePiece.gridY + yDir;

//     while (i !== x || j !== y) {
//         if (isSquareOccupied(i, j)) return false;
//         i += xDir;
//         j += yDir;
//     }
//     return true;
// };

// const validateKnightMove = (x, y) => {
//     const dx = Math.abs(x - activePiece.gridX);
//     const dy = Math.abs(y - activePiece.gridY);
//     return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
// };

// const validateBishopMove = (x, y) => {
//     if (Math.abs(x - activePiece.gridX) !== Math.abs(y - activePiece.gridY)) return false;

//     const xDir = Math.sign(x - activePiece.gridX);
//     const yDir = Math.sign(y - activePiece.gridY);
//     let i = activePiece.gridX + xDir;
//     let j = activePiece.gridY + yDir;

//     while (i !== x || j !== y) {
//         if (isSquareOccupied(i, j)) return false;
//         i += xDir;
//         j += yDir;
//     }
//     return true;
// };

// const validateQueenMove = (x, y) => {
//     return validateRookMove(x, y) || validateBishopMove(x, y);
// };

// const validateKingMove = (x, y) => {
//     const dx = Math.abs(x - activePiece.gridX);
//     const dy = Math.abs(y - activePiece.gridY);
//     return dx <= 1 && dy <= 1;
// };