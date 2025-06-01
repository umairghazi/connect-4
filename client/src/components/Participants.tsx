import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import type { UserDTO } from "../types/user";
import { stringAvatar } from "../utils/chatUtils";

interface ParticipantsProps {
  activeUsers: UserDTO[];
  handleSetChallengedPlayer: (players: UserDTO[]) => void;
  handleSetShowChallengeToast: (show: boolean) => void;
}

export const Participants = (props: ParticipantsProps) => {
  const { activeUsers, handleSetChallengedPlayer, handleSetShowChallengeToast } = props;
  const { user } = useAuth();
  const handleGame = useCallback((opponent: UserDTO) => {
    if (!user || user.id === opponent.id) return;
    handleSetChallengedPlayer([opponent]);
    handleSetShowChallengeToast(true);
  },
    [handleSetChallengedPlayer, handleSetShowChallengeToast, user]
  );

  return (
    <List dense disablePadding sx={{ width: "100%", bgcolor: "background.paper", cursor: "pointer" }}>
      {activeUsers
        .filter((u) => u.id !== user?.id)
        .map((u, index) => (
          <div key={u.id}>
            <ListItem
              key={u.id}
              onClick={() => handleGame(u)}
              sx={{ borderRadius: 2, paddingY: 1 }}
            >
              <ListItemAvatar>
                <Avatar {...stringAvatar(u.displayName)} />
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
          </div>
        ))}
    </List>
  );
};
