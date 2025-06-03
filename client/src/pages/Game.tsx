import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { getGame, updateGame } from "../api/game";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";
import { ChatMessages } from "../components/ChatMessages";
import { Header } from "../components/Header";
import {
  Wrapper,
  HeaderBox,
  Content,
  GamePanel,
  ChatPanel,
  GameOverBox,
  ChatMessagesBox,
  ChatInputWrapper,
} from "./Game.styled";
import type { Cell, Game } from "../types/game";
import { socket, SOCKET_EVENTS } from "../clients/socket";
import { ChatInputBox } from "../components/ChatInputBox";
import { useChat } from "../hooks/useChat";

const BOARD_HEIGHT = 8;
const BOARD_WIDTH = 8;
const COLORS = ["R", "B", "G", "Y", "P", "O"]; // match with backend logic

export const GamePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, isLoggedIn } = useAuth();
  const userId = user?.id;
  const [game, setGame] = useState<Game>();
  const [board, setBoard] = useState<Cell[][]>([]);

  const { messages, chatText, setChatText, sendMessage, handleKeyDown } = useChat({
    userId,
    gameId: id,
    chatType: "game",
  });

  usePageTitle("Game");

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (id && socket) {
      socket.emit(SOCKET_EVENTS.GAME_JOIN, id);

      const onGameUpdated = (updatedGame: Game) => {
        setGame(updatedGame);
      };

      socket.on("game-updated", onGameUpdated);

      return () => {
        socket.off("game-updated", onGameUpdated);
        socket.emit("leave-game", id);
      };
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchGame = async () => {
      try {
        const game = await getGame(id);
        if (!game) navigate("/lobby");
        else setGame(game);
      }
      catch (error) {
        console.error("Failed to fetch game:", error);
        navigate("/lobby");
      }
    };

    fetchGame();
  }, [id, navigate]);

  useEffect(() => {
    const initBoard = (): Cell[][] =>
      Array.from({ length: BOARD_HEIGHT }, (_, i) =>
        Array.from({ length: BOARD_WIDTH }, (_, j) => ({
          row: i,
          col: j,
          id: `${i}-${j}`,
          value: null,
          isOccupied: false,
        }))
      );

    if (!game) return;

    const boardFromData = game.boardData?.length
      ? game.boardData.map((row, i) =>
        row.map((value, j) => ({
          row: i,
          col: j,
          id: `${i}-${j}`,
          value,
          isOccupied: !!value,
        }))
      )
      : initBoard();

    setBoard(boardFromData);
  }, [game]);

  const myIndex = game?.playerIds?.indexOf(userId ?? "") ?? -1;
  const myColor = myIndex >= 0 ? COLORS[myIndex] : "X";

  const currentTurnIndex = game?.currentTurnIndex ?? 0;
  const currentPlayerId = game?.playerIds?.[currentTurnIndex] ?? "";
  const currentPlayerIndex = game?.playerIds?.indexOf(currentPlayerId) ?? -1;
  const currentPlayer = currentPlayerIndex >= 0 ? game?.playerData?.[currentPlayerIndex] : null;

  const winnerIndex = game?.playerIds?.indexOf(game?.winnerId ?? "") ?? -1;
  const winner = winnerIndex >= 0 ? game?.playerData?.[winnerIndex] : null;

  const isPlayersTurn = currentPlayerId === userId;
  const isGameOver = game?.gameStatus === "FINISHED";

  const currentTurnDisplayName = currentPlayer?.displayName ?? "Unknown";

  const dropPiece = async (cell: Cell) => {
    if (!isPlayersTurn || isGameOver) return;

    const col = cell.col;
    // Check if column is valid
    let row = BOARD_HEIGHT - 1;
    // Find the lowest empty cell in the column
    while (row >= 0 && board[row][col].isOccupied) row--;
    // If no empty cell found, return
    if (row < 0) return;

    // Clone and update local board state
    const newBoard = board.map((r) => r.map((c) => ({ ...c })));
    newBoard[row][col].value = myColor;
    newBoard[row][col].isOccupied = true;
    setBoard(newBoard);

    try {
      // Calculate next turn index
      const nextTurnIndex = ((game?.currentTurnIndex ?? 0) + 1) % (game?.playerIds?.length ?? 1);


      const updatedGame = await updateGame(game!.id, {
        id: game!.id,
        boardData: newBoard.map(row => row.map(cell => cell.value ?? "")),
        currentTurnIndex: nextTurnIndex,
        colorToCheck: myColor,
        playerIds: game!.playerIds,
      });

      // Update game state with response from backend
      setGame(updatedGame);
    } catch (error) {
      console.error("Failed to update game:", error);
      // Optionally: revert local board or show error message
    }
  };

  const renderBoard = () => (
    <div style={{ display: "grid", gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)` }}>
      {board.map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: "flex" }}>
          {row.map((cell) => (
            <button
              key={cell.id}
              onClick={() => dropPiece(cell)}
              disabled={!isPlayersTurn || isGameOver}
              style={{
                width: 40,
                height: 40,
                margin: 2,
                borderRadius: "50%",
                border: "1px solid #ccc",
                backgroundColor:
                  cell.value === "R" ? "red" :
                    cell.value === "B" ? "blue" :
                      cell.value === "G" ? "green" :
                        cell.value === "Y" ? "gold" :
                          cell.value === "P" ? "purple" :
                            cell.value === "O" ? "orange" :
                              "#f0f0f0",
              }}
              aria-label={`Cell ${cell.row},${cell.col}`}
            />
          ))}
        </div>
      ))}
    </div>
  );

  if (!isLoggedIn || !game) return null;

  return (
    <Wrapper>
      <HeaderBox>
        <Header />
      </HeaderBox>

      <Content>
        <GamePanel>
          <Typography variant="h4" gutterBottom>
            Game {game.playerData?.map(p => p.displayName).join(" vs ")}
          </Typography>
          <Typography
            component="span"
            variant="body1"
            sx={{ fontWeight: 500, color: "text.primary" }}
          >{isGameOver ? "Game Over" : `Turn: ${currentTurnDisplayName}`}</Typography>
          {renderBoard()}
          {isGameOver && (
            <GameOverBox>
              <Typography variant="h6">🏁 Game Over</Typography>
              <Typography variant="body1">
                Winner: {winner?.displayName ?? "Unknown"}
              </Typography>
            </GameOverBox>
          )}
        </GamePanel>

        <ChatPanel>
          <ChatMessagesBox>
            <ChatMessages messages={messages} />
          </ChatMessagesBox>
          <ChatInputWrapper>
            <ChatInputBox
              chatText={chatText}
              setChatText={setChatText}
              sendMessage={sendMessage}
              handleKeyDown={handleKeyDown}
            />
          </ChatInputWrapper>
        </ChatPanel>
      </Content>
    </Wrapper>
  );
};