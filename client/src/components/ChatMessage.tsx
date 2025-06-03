import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { getTimestamp, stringAvatar } from "../utils/chatUtils";

interface ChatMessageProps {
  message: string;
  username: string;
  timestamp: number;
}

export const ChatMessage = (props: ChatMessageProps) => {
  const { message, username, timestamp } = props;

  return (
    <>
      <ListItem alignItems="flex-start" sx={{ paddingY: 2, paddingX: 1 }}>
        <ListItemAvatar>
          <Avatar {...stringAvatar(username)} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              component="span"
              variant="body1"
              sx={{ fontWeight: 500, color: "text.primary" }}
            >
              {message}
            </Typography>
          }
          secondary={
            <Typography
              component="div"
              variant="caption"
              sx={{ color: "text.secondary" }}
            >
              {username + getTimestamp(timestamp)}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" sx={{ marginLeft: 9 }} />
    </>
  );
};
