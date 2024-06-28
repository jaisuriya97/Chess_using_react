import React, { useEffect, useRef, useState } from 'react';
import validate from "./Rules";
import ChessTile from './ChessTile';

const initialBoard = [
    { img: "pieces-basic-svg/rook-w.svg",x: 0, y: 0 }, { img: "pieces-basic-svg/knight-w.svg", x: 0, y: 1 },
    { img: "pieces-basic-svg/bishop-w.svg", x: 0, y: 2 }, { img: "pieces-basic-svg/king-w.svg", x: 0, y: 3 },
    { img: "pieces-basic-svg/queen-w.svg", x: 0, y: 4 }, { img: "pieces-basic-svg/bishop-w.svg", x: 0, y: 5 },
    { img: "pieces-basic-svg/knight-w.svg", x: 0, y: 6 }, { img: "pieces-basic-svg/rook-w.svg", x: 0, y: 7 },
    ...Array(8).fill().map((_, i) => ({ img: "pieces-basic-svg/pawn-w.svg", x: 1, y: i })),
    ...Array(8).fill().map((_, i) => ({ img: "pieces-basic-svg/pawn-b.svg", x: 6, y: i })),
    { img: "pieces-basic-svg/rook-b.svg", x: 7, y: 0 }, { img: "pieces-basic-svg/knight-b.svg", x: 7, y: 1 },
    { img: "pieces-basic-svg/bishop-b.svg", x: 7, y: 2 }, { img: "pieces-basic-svg/king-b.svg", x: 7, y: 3 },
    { img: "pieces-basic-svg/queen-b.svg", x: 7, y: 4 }, { img: "pieces-basic-svg/bishop-b.svg", x: 7, y: 5 },
    { img: "pieces-basic-svg/knight-b.svg", x: 7, y: 6 }, { img: "pieces-basic-svg/rook-b.svg", x: 7, y: 7 },
];

function ChessBoard() {
    const [boardPiece, setboardPiece] = useState([]);
    const [activePiece, setActivePiece] = useState(null);
    const [currentPieceName,setCurrentPieceName] = useState(null);
    useEffect(() => {
        setboardPiece(initialBoard);
    }, []);

    const VerticalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const HorizontalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

    const ChessboardRef = useRef(null);

    const PieceGrab = (e) => {
        const board = ChessboardRef.current;
        if (e.target.classList.contains("tile-piece") && board) {
            const GridX = Math.abs(Math.floor((e.clientY - board.offsetTop) / 100) - 7);
            const GridY = Math.floor((e.clientX - board.offsetLeft) / 100);
            setActivePiece({ element: e.target, gridX: GridX, gridY: GridY });

            e.target.style.position = "absolute";
        }
    };

    const MovePiece = (e) => {
        if (activePiece) {
            const board = ChessboardRef.current;
            const minX = board.offsetLeft - 25;
            const minY = board.offsetTop - 25;
            const maxX = board.offsetLeft + board.clientWidth - 75;
            const maxY = board.offsetTop + board.clientHeight - 90;
            const x_axis = e.clientX - 50;
            const y_axis = e.clientY - 50;

            activePiece.element.style.left = `${Math.max(minX, Math.min(x_axis, maxX))}px`;
            activePiece.element.style.top = `${Math.max(minY, Math.min(y_axis, maxY))}px`;
        }
    };

    const DropPiece = (e) => {
        if (activePiece) {
            const board = ChessboardRef.current;
            const x_axis = Math.abs(Math.floor((e.clientY - board.offsetTop) / 100) - 7);
            const y_axis = Math.floor((e.clientX - board.offsetLeft) / 100);
            const regex = /background-image: url\("pieces-basic-svg\/([^"]+)\.svg"\);/;
            const match = activePiece.element.attributes.style.nodeValue.match(regex);
            if (match) {
                const pieceName = match[1];
                setCurrentPieceName(pieceName);
                const result = validate(pieceName);
                console.log(result);
            }
            setboardPiece((values) => {
                const pieces = values.map((p) => {
                    if (p.x === activePiece.gridX && p.y === activePiece.gridY) {
                        return { ...p, x: x_axis, y: y_axis };
                    }
                    return p;
                });
                return pieces;
            });

            activePiece.element.style.position = "absolute";
            activePiece.element.style.left = "";
            activePiece.element.style.top = "";
            setActivePiece(null);
        }
    };

    const tiles = [];
    for (let j = VerticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < HorizontalAxis.length; i++) {
            const number = i + j + 2;
            let image = undefined;
            let name = undefined;
            boardPiece.forEach((p) => {
                if (p.x === j && p.y === i) {
                    image = p.img;
                    name=p.name;
                }
            });
            tiles.push(<ChessTile key={`${i}-${j}`} num={number} img={image} name={name}/>);
        }
    }

    return (
        <div className='chess-board'
            ref={ChessboardRef}
            onMouseDown={PieceGrab}
            onMouseMove={MovePiece}
            onMouseUp={DropPiece}>
            {tiles}
        </div>
    );
}

export default ChessBoard;
