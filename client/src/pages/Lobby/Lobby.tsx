import { useSubscription } from "@apollo/client";
import { KeyboardReturn } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, InputAdornment, Snackbar, TextField, Typography } from "@mui/material";
import type { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GET_CHAT_MESSAGES,
  GET_GAME,
  MESSAGE_SUBSCRIPTION,
  NEW_GAME_SUB,
  IUser,
  useCreateGameMutation,
  useGetActiveUsersLazyQuery,
  useGetChatMessagesQuery,
  usePostLobbyChatMessageMutation,
  useUpdateGameMutation,
  useGetGameLazyQuery
} from "../../api";
import { ChatMessages, Header, Participants } from "../../components";
import { LocalAuthContext } from "../../contexts";
import { usePageTitle } from "../../hooks/usePageTitle";

import './Lobby.css';


export const Lobby = () => {
  const { isLoggedIn, user } = useContext(LocalAuthContext)

  const navigate = useNavigate()

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [chatText, setChatText] = useState("")
  const [showExistingGameToast, setShowExistingGameToast] = useState(false)
  const [showSendChallengeToast, setShowSendChallengeToast] = useState(false)
  const [showWaitingToast, setShowWaitingToast] = useState(false)
  const [showGotChallengedToast, setShowGotChallengedToast] = useState(false)
  const [challengedPlayer, setChallengedPlayer] = useState<IUser>()

  const [postChatMessage, { loading: postChatMsgLoading, error: postChatMsgErr }] = usePostLobbyChatMessageMutation()
  const [createGame] = useCreateGameMutation()
  const [updateGame] = useUpdateGameMutation()
  const [getActiveUsers, { data: activeUsersResp }] = useGetActiveUsersLazyQuery()
  const { data: chatMessagesResp } = useGetChatMessagesQuery()
  const [getGame, { data: gameDataResp }] = useGetGameLazyQuery()

  const isExistingGame = !!gameDataResp?.getGame.length && (gameDataResp?.getGame?.[0]?.gameStatus === 'IN_PROGRESS');

  const amIChallenged = !!gameDataResp?.getGame.length && gameDataResp?.getGame?.[0]?.gameStatus === 'CHALLENGED' && gameDataResp?.getGame?.[0]?.player2Id === user?.id;
  const existingGame = isExistingGame ? gameDataResp?.getGame[0] : null;
  console.log('existingGame', existingGame);
  console.log('gameDataResp', gameDataResp);
  

  const chatMessages = chatMessagesResp?.messages ?? []

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

  useSubscription(NEW_GAME_SUB, {
    onData: ({ client, data: subData }) => {
      const cachedGames = client.readQuery({
        query: GET_GAME
      });

      const updatedGames = {
        ...cachedGames,
        getGame: [
          ...cachedGames.getGame ?? [],
          subData.data.newGame
        ]
      }

      client.writeQuery({
        query: GET_GAME,
        data: updatedGames,
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
    if (isExistingGame) {
      setShowExistingGameToast(true)
    }
  }, [gameDataResp, isExistingGame])

  useEffect(() => {
    const interval = setInterval(() => {
      getActiveUsers()
    }, 10000)
    return () => clearInterval(interval)
  }, [getActiveUsers])

  useEffect(() => {
    const interval = setInterval(() => {
      getGame({ variables: { player1Id: user?.id } })
    }, 2000)
    return () => clearInterval(interval)
  }, [getGame, user?.id])

  useEffect(() => {
    if (amIChallenged) {
      setShowGotChallengedToast(true)
    }
  }, [amIChallenged])


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

  const handleCreateGame = useCallback(async () => {
    createGame({
      variables: { player1Id: user.id, player2Id: challengedPlayer?.id },
      onCompleted: (game: any) => {
        setShowSendChallengeToast(false)
        setChallengedPlayer(undefined)
        setShowWaitingToast(true)
      }
    })
  }, [challengedPlayer?.id, createGame, user.id])

  const handleCancelGame = async () => {
    // TODO: Implement cancel game
  }

  const handleAcceptGame = async () => {
    await updateGame({ variables: { id: gameDataResp?.getGame?.[0]?.id, gameStatus: 'ACCEPTED' } })
    await getGame({ variables: { id: gameDataResp?.getGame?.[0]?.id } });
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
          <Participants
            activeUsers={activeUsersResp?.getActiveUsers || []}
            handleSetChallengedPlayer={setChallengedPlayer}
            handleSetShowChallengeToast={setShowSendChallengeToast}
          />
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
        className="game-toast"
        open={showSendChallengeToast}
        onClose={() => setShowSendChallengeToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={`Do you want to challenge ${challengedPlayer?.displayName} to the game?`}
        action={
          <>
            <Button variant="contained" onClick={handleCreateGame}>Yes</Button>
            <Button variant="outlined" onClick={() => handleCancelGame()}>Cancel</Button>
          </>
        }
      />
      <Snackbar
        className="game-toast"
        open={showExistingGameToast}
        onClose={() => setShowExistingGameToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message="There's an existing game in progress."
        action={
          <>
            <Button variant="contained" onClick={() => navigate(`/game/${existingGame?.id}`)}>Go to game</Button>
            <Button variant="outlined" onClick={() => handleCancelGame()}>Dismiss</Button>
          </>
        }
      />
      <Snackbar
        className="game-toast"
        open={showGotChallengedToast}
        onClose={() => setShowGotChallengedToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={`You have been challenged by ${gameDataResp?.getGame?.[0]?.player1Data?.displayName} to a game.`}
        action={
          <>
            <Button variant="contained" onClick={() => handleAcceptGame()}>Accept</Button>
            <Button variant="outlined" onClick={() => handleCancelGame()}>Dismiss</Button>
          </>
        }
      />
      <Snackbar
        className="game-toast"
        open={showWaitingToast}
        onClose={() => setShowWaitingToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={`Waiting for ${gameDataResp?.getGame?.[0]?.player2Data?.displayName ?? "opponent"} to accept the game`}
        action={
          <>
            <CircularProgress />
          </>
        }
      />
    </div>
  )
}