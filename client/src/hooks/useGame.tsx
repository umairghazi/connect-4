import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../clients/socket";
import { createGame, acceptGameChallenge } from "../api/game";
import type { UserDTO } from "../types/user";
import type { Game } from "../types/game";
import { useAuth } from "./useAuth";

export function useGame() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [games, setGames] = useState<Game[]>([]);
  const [challengedPlayers, setChallengedPlayers] = useState<UserDTO[]>([]);
  const [toast, setToast] = useState({
    existing: false,
    waiting: false,
    challenged: false,
    challengePrompt: false,
  });

  useEffect(() => {
    if (!user) return;

    const gameListener = (game: Game) => {

      setGames((prev) => {
        const exists = prev.some((g) => g.id === game.id);
        return exists ? prev : [...prev, game];
      });

      if (game.playerIds.includes(user.id)) {
        if (game.gameStatus === "CHALLENGED" && game.startedBy !== user.id) {
          setToast((t) => ({ ...t, challenged: true }));
        } else if (game.gameStatus === "IN_PROGRESS") {
          navigate(`/game/${game.id}`);
        }
      }
    };

    socket.on("new-game", gameListener);
    return () => {
      socket.off("new-game", gameListener);
    };
  }, [navigate, user]);

  const game = games.find((g) => ["CHALLENGED", "IN_PROGRESS"].includes(g.gameStatus) && g.playerIds?.includes(user?.id ?? ""));
  const isInGame = game?.gameStatus === "IN_PROGRESS";
  const amIChallenged = game?.gameStatus === "CHALLENGED" && game?.playerIds?.includes(user?.id ?? "") && game?.startedBy !== user?.id;

  useEffect(() => {
    if (isInGame) setToast((t) => ({ ...t, existing: true }));
    if (amIChallenged) setToast((t) => ({ ...t, challenged: true }));
  }, [isInGame, amIChallenged]);

  useEffect(() => {
    if (game?.gameStatus === "IN_PROGRESS") {
      navigate(`/game/${game.id}`);
    }
  }, [game?.gameStatus, game?.id, navigate]);

  const handleCreateGame = useCallback(async () => {
    if (!challengedPlayers.length || !user) return;

    const allPlayerIds = [user.id, ...challengedPlayers.map((p) => p.id)];
    await createGame(user.id, allPlayerIds);

    setChallengedPlayers([]);
    setToast((t) => ({ ...t, challengePrompt: false, waiting: true }));
  }, [challengedPlayers, user]);

  const handleAcceptGame = async () => {
    if (!game || !user) return;
    await acceptGameChallenge(game.id, game.playerIds);
    navigate(`/game/${game.id}`);
  };

  const handleCancelGame = () =>
    setToast({ existing: false, waiting: false, challenged: false, challengePrompt: false });

  return {
    game,
    toast,
    setToast,
    challengedPlayers,
    setChallengedPlayers,
    handleCreateGame,
    handleAcceptGame,
    handleCancelGame,
  };
}
