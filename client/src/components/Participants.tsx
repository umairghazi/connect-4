import { useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import type { UserDTO } from "../types/user";

interface ParticipantsProps {
  activeUsers: UserDTO[];
  handleSetChallengedPlayer: (player: UserDTO) => void;
  handleSetShowChallengeToast: (show: boolean) => void;
}

export const Participants = (props: ParticipantsProps) => {
  const { activeUsers, handleSetChallengedPlayer, handleSetShowChallengeToast } = props;
  const { user } = useAuth();

  const handleGame = useCallback(
    (opponent: UserDTO) => {
      if (!user || user.id === opponent.id) return;
      handleSetChallengedPlayer(opponent);
      handleSetShowChallengeToast(true);
    },
    [handleSetChallengedPlayer, handleSetShowChallengeToast, user]
  );

  return (
    <div className="wrapper">
      {activeUsers
        .filter((u) => u.id !== user?.id)
        .map((u) => (
          <button
            key={u.id}
            type="button"
            onClick={() => handleGame(u)}
            className="participant-button"
          >
            {u.displayName}
          </button>
        ))}
    </div>
  );
};
