import { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react";
import type { ChangeEvent, MouseEvent, KeyboardEvent } from 'react'
import { Box, IconButton, InputAdornment, TextField } from "@mui/material"
import { KeyboardReturn } from '@mui/icons-material';

import { Layout } from "../../components"
import { usePostChatMessageMutation } from "../../api/useMutation/usePostChatMessage.hook";
import { useGetChatMessagesQuery } from "../../api/useQuery/useGetChatMessages.hook";
import { MESSAGE_SUBSCRIPTION, useMessageSubscription } from "../../api/useSubscription/useChatMessage.hook";

export const Lobby = (): JSX.Element => {
  const [chatText, setChatText] = useState("")
  const { user } = useAuth0()
  const [postChatMessage, { loading: postChatMsgLoading, error: postChatMsgErr }] = usePostChatMessageMutation()
  const { data: chatMessages, loading: chatMsgsLoading, error: chatMsgsError, subscribeToMore } = useGetChatMessagesQuery()
  const {data: postedMsg, loading: postedMsgLoading, error: postMsgError} = useMessageSubscription()

  // subscribeToMore({
  //   document: MESSAGE_SUBSCRIPTION,
  //   updateQuery: (prev,)
  // })

  const handleSubmit = async (evt: KeyboardEvent<HTMLDivElement>) => {
    if (evt.code === 'Enter') {
      await postChatMessage({
        variables: {
          userId: user?.email,
          message: chatText
        }
      })

      !postChatMsgLoading && !postChatMsgErr && setChatText("")
    }
  }

  const handleChatTextChange = (evt: ChangeEvent<HTMLInputElement>) => setChatText(evt?.target?.value)

  const handleSubmitClicked = async (evt: MouseEvent<HTMLButtonElement>) => {
    await postChatMessage({
      variables: {
        userId: user?.email,
        message: chatText
      }
    })

    !postChatMsgLoading && !postChatMsgErr && setChatText("")
  }

  return (
    <Layout>
      <Box
        sx={{

        }}
      >

      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%"
        }}
      >
        <TextField
          className="chat-input"
          fullWidth
          onChange={handleChatTextChange}
          value={chatText}
          label="Message"
          id="chat-message"
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
      </Box>
    </Layout>
  )
}