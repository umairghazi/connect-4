import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { KeyboardReturn } from "@mui/icons-material";
import { useAuth } from "../hooks/useAuth";
import { useChat } from "../hooks/useChat";
import { useGameLobby } from "../hooks/useGame";
import { useActiveUsers } from "../hooks/useActiveUsers";
import { usePageTitle } from "../hooks/usePageTitle";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { ChatMessages } from "../components/ChatMessages";
import { Participants } from "../components/Participants";
import {
  ChatInputBox,
  ChatPanel,
  Content,
  HeaderBox,
  ParticipantsPanel,
  Wrapper,
} from "./Lobby.styled";
import { useEffect } from "react";

export const Lobby = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  const { messages, chatText, setChatText, sendMessage } = useChat(user?.id);

  const {
    toast,
    setToast,
    game,
    challengedPlayer,
    setChallengedPlayer,
    handleCreateGame,
    handleAcceptGame,
    handleCancelGame,
  } = useGameLobby(user);

  const activeUsers = useActiveUsers();

  usePageTitle("Lobby");

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter") sendMessage();
  };

  return (
    <Wrapper>
      <HeaderBox>
        <Header />
      </HeaderBox>

      <Content>
        <ChatPanel>
          <Typography variant="h4" gutterBottom>
            Lobby
          </Typography>
          <ChatMessages messages={messages} />
        </ChatPanel>

        <ParticipantsPanel>
          <Typography variant="h4" gutterBottom>
            Online Players
          </Typography>
          <Participants
            activeUsers={activeUsers}
            handleSetChallengedPlayer={setChallengedPlayer}
            handleSetShowChallengeToast={() =>
              setToast((t) => ({ ...t, challengePrompt: true }))
            }
          />
        </ParticipantsPanel>
      </Content>

      <ChatInputBox>
        <TextField
          fullWidth
          onChange={(e) => setChatText(e.target.value)}
          value={chatText}
          label="Message"
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="submit"
                  onClick={sendMessage}
                  edge="end"
                >
                  <KeyboardReturn />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </ChatInputBox>

      {/* Snackbars */}
      <Snackbar
        open={toast.challengePrompt}
        onClose={handleCancelGame}
        message={`Challenge ${challengedPlayer?.displayName}?`}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        action={[
          <Button key="yes" variant="contained" onClick={handleCreateGame}>
            Yes
          </Button>,
          <Button key="cancel" variant="outlined" onClick={handleCancelGame}>
            Cancel
          </Button>,
        ]}
      />

      <Snackbar
        open={toast.existing}
        onClose={handleCancelGame}
        message="You have an existing game in progress."
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        action={[
          <Button
            key="go"
            variant="contained"
            onClick={() => navigate(`/game/${game?.id}`)}
          >
            Go to game
          </Button>,
          <Button key="dismiss" variant="outlined" onClick={handleCancelGame}>
            Dismiss
          </Button>,
        ]}
      />

      <Snackbar
        open={toast.challenged}
        onClose={handleCancelGame}
        message={`You've been challenged by ${game?.player1Data?.displayName}.`}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        action={[
          <Button key="accept" variant="contained" onClick={handleAcceptGame}>
            Accept
          </Button>,
          <Button key="reject" variant="outlined" onClick={handleCancelGame}>
            Dismiss
          </Button>,
        ]}
      />

      <Snackbar
        open={toast.waiting}
        onClose={() => setToast((t) => ({ ...t, waiting: false }))}
        message={`Waiting for ${
          game?.player2Data?.displayName ?? "opponent"
        } to accept`}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        action={<CircularProgress size={20} />}
      />
    </Wrapper>
  );
};
