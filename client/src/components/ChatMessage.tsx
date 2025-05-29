import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

interface ChatMessageProps {
  message: string;
  picture: string;
  username: string;
  timestamp: number;
}

function getTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const today = new Date();
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return ` at ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  return ` on ${date.toLocaleDateString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })} at ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export const ChatMessage = (props: ChatMessageProps) => {
  const { message, picture, username, timestamp } = props;

  return (
    <>
      <ListItem alignItems="flex-start" sx={{ paddingY: 2, paddingX: 1 }}>
        <ListItemAvatar>
          <Avatar alt={username} src={picture} />
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
