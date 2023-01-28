import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider } from "@mui/material"

interface ChatMessageProps {
  message: string
  picture: string
  username: string
}

export const ChatMessage = (props: ChatMessageProps) => {
  const { message, picture, username } = props

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="User name" src={picture}/>
        </ListItemAvatar>
        <ListItemText
          primary={<Typography component="span" variant="body1">{message}</Typography>}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="caption"
                color="text.primary"
              >
                {username}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="hr" />
    </>
  )
}