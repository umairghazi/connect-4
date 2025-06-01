import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../clients/socket";
import { createGame, updateGameStatus } from "../api/game";
import type { UserDTO } from "../types/user";
import type { Game } from "../types/game";

export function useGameLobby(user?: UserDTO | null) {
  const [games, setGames] = useState<Game[]>([]);
  const [challengedPlayer, setChallengedPlayer] = useState<UserDTO | null>(null);
  const [toast, setToast] = useState({
    existing: false,
    waiting: false,
    challenged: false,
    challengePrompt: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const gameListener = (game: Game) => setGames((prev) => [...prev, game]);
    socket.on("new-game", gameListener);
    return () => {
      socket.off("new-game", gameListener);
    };
  }, []);

  const game = games.find(
    (g) => ["CHALLENGED", "IN_PROGRESS"].includes(g.gameStatus) &&
      (g.player1Id === user?.id || g.player2Id === user?.id)
  );

  const isInGame = game?.gameStatus === "IN_PROGRESS";
  const amIChallenged = game?.gameStatus === "CHALLENGED" && game?.player2Id === user?.id;

  useEffect(() => {
    if (isInGame) setToast((t) => ({ ...t, existing: true }));
    if (amIChallenged) setToast((t) => ({ ...t, challenged: true }));
  }, [isInGame, amIChallenged]);

  useEffect(() => {
    if (toast.waiting && game?.gameStatus === "IN_PROGRESS") {
      navigate(`/game/${game.id}`);
    }
  }, [toast.waiting, game?.gameStatus, game?.id, navigate]);

  const handleCreateGame = useCallback(async () => {
    if (!challengedPlayer || !user) return;
    await createGame(user.id, challengedPlayer.id);
    setChallengedPlayer(null);
    setToast((t) => ({ ...t, challengePrompt: false, waiting: true }));
  }, [challengedPlayer, user]);

  const handleAcceptGame = async () => {
    if (!game || !user) return;
    await updateGameStatus(game.id, "IN_PROGRESS");
    navigate(`/game/${game.id}`);
  };

  const handleCancelGame = () =>
    setToast({ existing: false, waiting: false, challenged: false, challengePrompt: false });

  return {
    game,
    toast,
    setToast,
    challengedPlayer,
    setChallengedPlayer,
    handleCreateGame,
    handleAcceptGame,
    handleCancelGame,
  };
}
