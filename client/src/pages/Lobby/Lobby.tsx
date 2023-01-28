import { useCallback, useContext, useEffect, useRef, useState } from "react"
import type { ChangeEvent, MouseEvent, KeyboardEvent } from 'react'
import { useNavigate } from "react-router-dom";
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { KeyboardReturn } from '@mui/icons-material';
import { useSubscription } from "@apollo/client";

import { usePostChatMessageMutation, useGetChatMessagesQuery, MESSAGE_SUBSCRIPTION, GET_CHAT_MESSAGES } from "../../api";
import { ChatMessages, Header, Participants } from "../../components"
import { LocalAuthContext } from "../../contexts";

import './Lobby.css'


export const Lobby = (): JSX.Element => {
  const { isLoggedIn, user } = useContext(LocalAuthContext)
  const navigate = useNavigate()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [chatText, setChatText] = useState("")

  const [postChatMessage, { loading: postChatMsgLoading, error: postChatMsgErr }] = usePostChatMessageMutation()
  const { data } = useGetChatMessagesQuery()
  const {error: subErr, data: subData, loading: subLoading} = useSubscription(MESSAGE_SUBSCRIPTION, {
    onData: ({ client, data: subData }) => {
      
      const cachedMessages = client.readQuery({
        query: GET_CHAT_MESSAGES
      });

      const updatedMessages = {
        ...cachedMessages,
        messages: [
          ...cachedMessages.messages,
          subData.data.message
        ]
      }

      client.writeQuery({
        query: GET_CHAT_MESSAGES,
        data: updatedMessages,
      })
    }
  });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const offsetBottom = messagesEndRef.current.offsetTop + messagesEndRef.current.offsetHeight;
      window.scrollTo({ top: offsetBottom });
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    scrollToBottom()
  }, [data])

  const chatMessages = data?.messages || []
  const { displayName, email, _id } = user || {}

  const handleChatTextChange = (evt: ChangeEvent<HTMLInputElement>) => setChatText(evt?.target?.value)

  const postChat = useCallback(async () => {
    await postChatMessage({
      variables: {
        username: displayName,
        userEmail: email,
        message: chatText,
        userId: _id
      }
    })
  }, [_id, chatText, displayName, email, postChatMessage])

  const handleSubmitClicked = async (evt: MouseEvent<HTMLButtonElement>) => {
    await postChat()
    !postChatMsgLoading && !postChatMsgErr && setChatText("")
  }

  const handleSubmit = async (evt: KeyboardEvent<HTMLDivElement>) => {
    if (evt.code === 'Enter') {
      await postChat()
      !postChatMsgLoading && !postChatMsgErr && setChatText("")
    }
  }

  if (!isLoggedIn) {
    return <></>
  }

  return (
    <div className="wrapper">
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <div className="chat" ref={messagesEndRef}>
          <ChatMessages messages={chatMessages} />
        </div>
        <div className="participants" ref={messagesEndRef}>
          <Participants />
        </div>
      </div>
      <div className="chat-input">
        <TextField
          fullWidth
          onChange={handleChatTextChange}
          value={chatText}
          label="Message"
          onKeyDown={handleSubmit}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="submit"
                  onClick={handleSubmitClicked}
                  edge="end"
                >
                  <KeyboardReturn />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  )
}