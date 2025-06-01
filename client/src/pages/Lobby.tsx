import {
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatMessages } from "../components/ChatMessages";
import { Header } from "../components/Header";
import { Participants } from "../components/Participants";
import { useActiveUsers } from "../hooks/useActiveUsers";
import { useAuth } from "../hooks/useAuth";
import { useChat } from "../hooks/useChat";
import { useGame } from "../hooks/useGame";
import { usePageTitle } from "../hooks/usePageTitle";
import {
  ChatPanel,
  Content,
  HeaderBox,
  ParticipantsPanel,
  Wrapper,
} from "./Lobby.styled";
import { ChatInputBox } from "../components/ChatInputBox";

export const Lobby = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  const { messages, chatText, setChatText, sendMessage, handleKeyDown } = useChat(user?.id);

  const {
    toast,
    setToast,
    game,
    challengedPlayers,
    setChallengedPlayers,
    handleCreateGame,
    handleAcceptGame,
    handleCancelGame,
  } = useGame();

  const activeUsers = useActiveUsers();

  usePageTitle("Lobby");

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
            handleSetChallengedPlayer={setChallengedPlayers}
            handleSetShowChallengeToast={() =>
              setToast((t) => ({ ...t, challengePrompt: true }))
            }
          />
        </ParticipantsPanel>
      </Content>

      <ChatInputBox
        chatText={chatText}
        setChatText={setChatText}
        sendMessage={sendMessage}
        handleKeyDown={handleKeyDown}
      />

      {/* Snackbars */}
      <Snackbar
        open={toast.challengePrompt}
        onClose={handleCancelGame}
        message={`Challenge ${challengedPlayers?.[0]?.displayName}?`}
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
        message={`You've been challenged by ${game?.playerData?.[0]?.displayName}.`}
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
        message={`Waiting for ${game?.playerData?.[0]?.displayName ?? "opponent"
          } to accept`}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        action={<CircularProgress size={20} />}
      />
    </Wrapper>
  );
};
