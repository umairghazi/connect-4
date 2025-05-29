import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
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
    <List dense disablePadding>
      {activeUsers
        .filter((u) => u.id !== user?.id)
        .map((u, index) => (
          <>
            <ListItem
              key={u.id}
              onClick={() => handleGame(u)}
              sx={{ borderRadius: 2, paddingY: 1 }}
            >
              <ListItemAvatar>
                <Avatar alt={u.displayName} src={u.avatar || undefined} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight={500}>
                    {u.displayName}
                  </Typography>
                }
              />
            </ListItem>
            {index !== activeUsers.length - 1 && <Divider variant="inset" component="li" />}
          </>
        ))}
    </List>
  );
};
