import { List } from "@mui/material"
import { ChatMessage } from "./ChatMessage"
import { Message } from "../../api"

interface ChatMessagesProps {
  messages: Message[]
}

export const ChatMessages = (props: ChatMessagesProps) => {
  const { messages } = props
  
  return (
    <List>
      {(messages).map((message) => {
        return (
          <ChatMessage key={Math.random()} message={message.message} picture={message?.user?.avatar} username={message?.user?.displayName} />
        )
      })}
    </List>
  )
}