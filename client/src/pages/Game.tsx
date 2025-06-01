import "./Game.css";
import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGames } from "../api/game";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";
import { ChatMessages } from "../components/ChatMessages";
import { Header } from "../components/Header";
import type { Cell } from "../types/game";

const BOARD_HEIGHT = 8;
const BOARD_WIDTH = 8;

export const Game = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, user } = useAuth();
  const userId = user?.id;

  const [boardState, setBoardState] = useState<Cell[][]>([]);
  const [game, setGame] = useState<any>(null);

  usePageTitle("Game");

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!id) return;

    const fetchGame = async () => {
      const games = await getGames("", "");
      const found = games.find((g) => g.id === id);
      if (!found) navigate("/lobby");
      else setGame(found);
    };

    fetchGame();
    const interval = setInterval(fetchGame, 1000);
    return () => clearInterval(interval);
  }, [id, navigate]);

  useEffect(() => {
    const initBoard = (): Cell[][] => {
      return Array.from({ length: BOARD_HEIGHT }, (_, i) =>
        Array.from({ length: BOARD_WIDTH }, (_, j) => ({
          row: i,
          col: j,
          id: `${i}-${j}`,
          value: null,
          isOccupied: false,
        }))
      );
    };

    const newBoard = deserializeGameState(game?.boardData);
    setBoardState(newBoard?.length ? newBoard : initBoard());
  }, [game?.boardData]);

  const serializeGameState = (state: Cell[][]) =>
    state.map((row) => row.map(({ value }) => value || "").join("-")).join("|");

  const deserializeGameState = (data?: string): Cell[][] => {
    if (!data) return [];
    return data.split("|").map((row, i) =>
      row.split("-").map((value, j) => ({
        row: i,
        col: j,
        id: `${i}-${j}`,
        value: value || null,
        isOccupied: !!value,
      }))
    );
  };

  const isPlayersTurn = userId === game?.whoseTurn;
  const isGameOver = game?.gameStatus === "COMPLETED";
  const colorForPlayer = userId === game?.player1Id ? "R" : "B";
  const winner =
    game?.winnerId === game?.player1Id
      ? game?.player1Data?.displayName
      : game?.player2Data?.displayName;

  const handleDropPiece = (cell: Cell) => {
    if (!isPlayersTurn || isGameOver) return;

    const col = cell.col;
    let row = BOARD_HEIGHT - 1;
    while (row >= 0 && boardState[row][col].isOccupied) row--;
    if (row < 0) return;

    const newBoard = boardState.map((r) => r.map((c) => ({ ...c })));
    newBoard[row][col].value = colorForPlayer;
    newBoard[row][col].isOccupied = true;
    setBoardState(newBoard);

    // updateGameStatus(game.id, {
    //   whoseTurn: userId === game.player1Id ? game.player2Id : game.player1Id,
    //   boardData: serializeGameState(newBoard),
    // });
  };

  const handleCellClick = (cell: Cell) => {
    if (!isGameOver && isPlayersTurn) handleDropPiece(cell);
  };

  const handleCellKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    cell: Cell
  ) => {
    if ((e.key === "Enter" || e.key === " ") && !isGameOver && isPlayersTurn) {
      e.preventDefault();
      handleDropPiece(cell);
    }
  };

  const renderBoard = () => (
    <div className="board">
      {boardState.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((cell) => (
            <button
              key={cell.id}
              className={`cell ${isPlayersTurn ? "pointer" : ""}`}
              onClick={() => handleCellClick(cell)}
              onKeyDown={(e) => handleCellKeyDown(e, cell)}
              tabIndex={0}
              disabled={isGameOver || !isPlayersTurn}
              aria-label={`Drop piece in column ${cell.col + 1}`}
            >
              {cell.value === "R" && <div className="red-piece" />}
              {cell.value === "B" && <div className="blue-piece" />}
            </button>
          ))}
        </div>
      ))}
    </div>
  );

  if (!isLoggedIn || !game) return null;

  return (
    <div className="wrapper">
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <div className="chat" ref={messagesEndRef}>
          <Typography variant="h4" gutterBottom>
            Game -{" "}
            {game?.whoseTurn === game?.player1Id
              ? game?.player1Data?.displayName
              : game?.player2Data?.displayName}
            's Turn
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
