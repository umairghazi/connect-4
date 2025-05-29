import { List } from "@mui/material"
import { ChatMessage } from "./ChatMessage"
import type { Message } from "../types/message"

interface ChatMessagesProps {
  messages: Message[]
}

export const ChatMessages = (props: ChatMessagesProps) => {
  const { messages } = props
  
  return (
    <List>
      {(messages).map((message) => {
        return (
          <ChatMessage key={message.id} message={message.message} picture={message?.user?.avatar} username={message?.user?.displayName} />
        )
      })}
    </List>
  )
}