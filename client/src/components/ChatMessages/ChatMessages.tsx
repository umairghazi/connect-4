import { List } from "@mui/material"
import { ChatMessage } from "./ChatMessage"

interface Message {
  _id: string
  date: string
  message: string
  picture: string
  username: string
}

interface ChatMessagesProps {
  messages: Message[]
}

export const ChatMessages = (props: ChatMessagesProps) => {
  const { messages } = props
  
  return (
    <List>
      {(messages).map((message) => {
        return (
          <ChatMessage key={Math.random()} message={message.message} picture={message.picture} username={message.username} />
        )
      })}
    </List>
  )
}