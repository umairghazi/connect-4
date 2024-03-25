import { useCallback, useContext, useEffect, useRef, useState } from "react"
import type { ChangeEvent, MouseEvent, KeyboardEvent } from 'react'
import { useNavigate } from "react-router-dom";
import { IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { KeyboardReturn } from '@mui/icons-material';
import { useSubscription } from "@apollo/client";

import { usePostChatMessageMutation, useGetChatMessagesQuery, MESSAGE_SUBSCRIPTION, GET_CHAT_MESSAGES, useGetActiveUsers } from "../../api";
import { ChatMessages, Header, Participants } from "../../components"
import { usePageTitle } from "../../hooks/usePageTitle";
import { useUserActivity } from "../../hooks/useUserActivity";
import { useCheckChallengeData } from "../../hooks/useCheckChallengeData";
import { LocalAuthContext } from "../../contexts";

import './Lobby.css'


export const Lobby = () => {
  const { isLoggedIn, user } = useContext(LocalAuthContext)
  const navigate = useNavigate()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [chatText, setChatText] = useState("")
  
  const [postChatMessage, { loading: postChatMsgLoading, error: postChatMsgErr }] = usePostChatMessageMutation()
  const [getActiveUsers, { data: activeUsersResp }] = useGetActiveUsers()
  const { data: chatMessagesResp } = useGetChatMessagesQuery()


  usePageTitle('Lobby')
  useUserActivity(user)
  
  const {isChallenged} = useCheckChallengeData(user);

  console.log({isChallenged});

  useSubscription(MESSAGE_SUBSCRIPTION, {
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
  }, [chatMessagesResp])

  useEffect(() => {
    const interval = setInterval(() => {
      getActiveUsers()
    }, 10000)
    return () => clearInterval(interval)
  }, [getActiveUsers])


  const chatMessages = chatMessagesResp?.messages || []
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
          <Typography variant="h4" gutterBottom>Lobby</Typography>
          <ChatMessages messages={chatMessages} />
        </div>
        <div className="participants" ref={messagesEndRef}>
          <Participants activeUsers={activeUsersResp?.getActiveUsers || []} />
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