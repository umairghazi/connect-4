import { Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Cell, useGetGameLazyQuery, useUpdateGameMutation } from "../../api";
import { ChatMessages, Header } from "../../components";
import { LocalAuthContext } from "../../contexts";
import { usePageTitle } from "../../hooks/usePageTitle";

import "./Game.css";

const BOARD_HEIGHT = 8;
const BOARD_WIDTH = 8;

export const Game = () => {
  const { isLoggedIn, user } = useContext(LocalAuthContext)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { id } = useParams();
  const navigate = useNavigate()

  const [boardState, setBoardState] = useState<Cell[][]>([]);

  const [getGame, { data: gameDataResp }] = useGetGameLazyQuery();
  const [updateGame] = useUpdateGameMutation()

  const { id: userId } = user || {};

  const { player1Id, player2Id, whoseTurn, gameStatus, boardData, player1Data, player2Data, winnerId } = gameDataResp?.getGame[0] || {};

  const isPlayersTurn = userId === whoseTurn;

  const colorForPlayer = userId === player1Id ? 'R' : 'B';

  const isGameOver = gameStatus === 'COMPLETED';

  const winner = winnerId === player1Id ? player1Data?.displayName : player2Data?.displayName;

  usePageTitle('Game')

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    function initBoard() {
      const cell: Cell[][] = [];

      for (let i = 0; i < BOARD_HEIGHT; i++) {
        const row = [];
        for (let j = 0; j < BOARD_WIDTH; j++) {
          row.push({
            row: i,
            col: j,
            id: `${i}-${j}`,
            value: null,
            isOccupied: false,
          });
        }
        cell.push(row);
      }
      return cell;
    }

    const newBoard = deserializeGameState(boardData);
    setBoardState(newBoard?.length ? newBoard : initBoard());
  }, [boardData])


  useEffect(() => {
    if (!id) return;

    getGame({
      variables: { id },
      onCompleted: (data) => {
        if (!data.getGame.length) {
          navigate('/lobby');
        }
      }
    });
  }, [getGame, id, navigate])

  useEffect(() => {
    const interval = setInterval(() => {
      getGame({ variables: { id } });
    }, 500);
    return () => clearInterval(interval);
  }, [getGame, id])


  const serializeGameState = (boardState: Cell[][]) => {
    return boardState.map((row) => row.map(({ value }) => value).join('-')).join('|');
  }

  const deserializeGameState = (boardData?: string) => {
    if (!boardData) return;
    return boardData.split('|').map((row, rowIndex) => row.split('-').map((value, colIndex) => ({
      row: rowIndex,
      col: colIndex,
      id: `${rowIndex}-${colIndex}`,
      value,
      isOccupied: !!value,
    })));
  }

  const handleDropPiece = (cell: Cell) => {
    if (!isPlayersTurn) return;
    const { col } = cell;

    let currentRow = BOARD_HEIGHT - 1;

    while (currentRow >= 0 && boardState[currentRow][col].isOccupied) {
      currentRow--;
    }

    if (currentRow < 0) return;

    const newBoardState = boardState.map((row) => row.map((cell) => ({ ...cell })));

    newBoardState[currentRow][col].value = colorForPlayer;
    newBoardState[currentRow][col].isOccupied = true;

    setBoardState(newBoardState);

    updateGame({
      variables: {
        id,
        whoseTurn: userId === player1Id ? player2Id : player1Id,
        boardData: serializeGameState(newBoardState),
      }
    })

  };

  const renderBoard = () => {
    return (
      <div className="board">
        {boardState.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className={`cell ${isPlayersTurn ? "pointer" : ""}`} onClick={() => !isGameOver && handleDropPiece(cell)}>
                {cell.value === 'R' && <div className="red-piece" />}
                {cell.value === 'B' && <div className="blue-piece" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="wrapper">
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <div className="chat" ref={messagesEndRef}>
          <Typography variant="h4" gutterBottom>
            Game - {whoseTurn === player1Id ? player1Data?.displayName : player2Data?.displayName}'s Turn
          </Typography>
          <ChatMessages messages={[]} />
          <div className="game">
            {renderBoard()}
            {isGameOver && (
              <div className="game-over">
                <Typography variant="h4" gutterBottom>
                  Game Over
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Winner: {winner}
                </Typography>
              </div>
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
};
