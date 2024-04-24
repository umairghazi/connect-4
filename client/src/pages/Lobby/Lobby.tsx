import { useSubscription } from "@apollo/client";
import { KeyboardReturn } from '@mui/icons-material';
import { IconButton, InputAdornment, Snackbar, TextField, Typography } from "@mui/material";
import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GET_CHAT_MESSAGES, MESSAGE_SUBSCRIPTION, useGetActiveUsers, useGetChatMessagesQuery, usePostLobbyChatMessageMutation } from "../../api";
import { ChatMessages, Header, Participants } from "../../components";
import { LocalAuthContext } from "../../contexts";
import { usePageTitle } from "../../hooks/usePageTitle";

import './Lobby.css';


export const Lobby = () => {
  const { isLoggedIn, user } = useContext(LocalAuthContext)
  
  const navigate = useNavigate()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const [chatText, setChatText] = useState("")
  const [showToast, setShowToast] = useState(false)

  const [postChatMessage, { loading: postChatMsgLoading, error: postChatMsgErr }] = usePostLobbyChatMessageMutation()
  const [getActiveUsers, { data: activeUsersResp }] = useGetActiveUsers()
  // const [getGame, { data: gameResp }] = useGetGame()
  const { data: chatMessagesResp } = useGetChatMessagesQuery()

  usePageTitle('Lobby')

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


  useEffect(() => {
    const interval = setInterval(() => {
      
    }, 10000)
    return () => clearInterval(interval)
  },[])

  const chatMessages = chatMessagesResp?.messages ?? []

  const handleChatTextChange = (evt: ChangeEvent<HTMLInputElement>) => setChatText(evt?.target?.value)

  const postChat = useCallback(async () => {
    await postChatMessage({
      variables: {
        message: chatText,
        userId: user?.id
      }
    })
  }, [postChatMessage, chatText, user?.id])

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
      <Snackbar
        className="existing-game-toast"
        open={showToast}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
        message="There's an existing game in progress."
        // action={<Button onClick={() => navigate(`/game/${gameData?.getGame?.gameId}`)}>Go to game</Button>}
      />
    </div>
  )
}