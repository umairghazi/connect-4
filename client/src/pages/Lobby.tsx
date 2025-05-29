import "./Lobby.css";
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
import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getMessages, postLobbyMessage } from "../api/message";
import { getGames, createGame, updateGameStatus } from "../api/game";
import { getActiveUsers } from "../api/user";
import { usePageTitle } from "../hooks/usePageTitle";
import { Header } from "../components/Header";
import { ChatMessages } from "../components/ChatMessages";
import { Participants } from "../components/Participants";
import { socket } from "../clients/socket";
import type { Message } from "../types/message";
import type { UserDTO } from "../types/user";
import type { Game } from "../types/game";

export const Lobby = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const [chatText, setChatText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeUsers, setActiveUsers] = useState<UserDTO[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  const [challengedPlayer, setChallengedPlayer] = useState<UserDTO | null>(null);
  const [showToast, setShowToast] = useState({
    existing: false,
    waiting: false,
    challenged: false,
    challengePrompt: false,
  });

  const messagesEndRef = useRef(null);
  usePageTitle("Lobby");

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    getMessages().then((messages) => {
      setMessages(messages);
      // if (messagesEndRef.current) {
      //   messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      // }
    });
    getActiveUsers().then((activeUsers) => {
      setActiveUsers(activeUsers);
    });
    if (user?.id) {
      getGames(user.id).then((games) => {
        setGames(games);
      });
    }

    const msgListener = (msg: Message) => setMessages((prev) => [...prev, msg]);
    const gameListener = (game: Game) => setGames((prev) => [...prev, game]);

    socket.on("new-message", msgListener);
    socket.on("new-game", gameListener);

    return () => {
      socket.off("new-message", msgListener);
      socket.off("new-game", gameListener);
    };
  }, [user?.id]);

  useEffect(() => {
    const intervalUsers = setInterval(() => getActiveUsers().then(setActiveUsers), 10000);
    const intervalGames = setInterval(() => {
      if (user?.id) getGames(user.id).then(setGames);
    }, 5000);
    return () => {
      clearInterval(intervalUsers);
      clearInterval(intervalGames);
    };
  }, [user?.id]);

  const game = games.find((g) => ["CHALLENGED", "IN_PROGRESS"].includes(g.gameStatus) && (g.player1Id === user?.id || g.player2Id === user?.id));

  const isInGame = game?.gameStatus === "IN_PROGRESS";
  const amIChallenged = game?.gameStatus === "CHALLENGED" && game.player2Id === user?.id;

  useEffect(() => {
    if (isInGame) setShowToast((t) => ({ ...t, existing: true }));
    if (amIChallenged) setShowToast((t) => ({ ...t, challenged: true }));
  }, [isInGame, amIChallenged]);

  useEffect(() => {
    if (showToast.waiting && game?.gameStatus === "IN_PROGRESS") {
      navigate(`/game/${game.id}`);
    }
  }, [game, showToast.waiting, navigate]);

  const handleChatTextChange = (e: ChangeEvent<HTMLInputElement>) => setChatText(e.target.value);

  const handleSubmit = async () => {
    if (!chatText.trim() || !user) return;
    await postLobbyMessage(user.id, chatText);
    setChatText("");
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter") await handleSubmit();
  };

  const handleCreateGame = async () => {
    if (!challengedPlayer || !user) return;
    await createGame(user.id, challengedPlayer.id);
    setChallengedPlayer(null);
    setShowToast((t) => ({ ...t, challengePrompt: false, waiting: true }));
  };

  const handleAcceptGame = async () => {
    if (!game || !user) return;
    await updateGameStatus(game.id, "IN_PROGRESS");
    navigate(`/game/${game.id}`);
  };

  const handleCancelGame = () => setShowToast({ existing: false, waiting: false, challenged: false, challengePrompt: false });

  if (!isLoggedIn) return null;

  return (
    <div className="wrapper">
      <div className="header"><Header /></div>
      <div className="content">
        <div className="chat" ref={messagesEndRef}>
          <Typography variant="h4" gutterBottom>Lobby</Typography>
          <ChatMessages messages={messages} />
        </div>
        <div className="participants" ref={messagesEndRef}>
          <Participants
            activeUsers={activeUsers}
            handleSetChallengedPlayer={setChallengedPlayer}
            handleSetShowChallengeToast={() => setShowToast((t) => ({ ...t, challengePrompt: true }))}
          />
        </div>
      </div>
      <div className="chat-input">
        <TextField
          fullWidth
          onChange={handleChatTextChange}
          value={chatText}
          label="Message"
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="submit" onClick={handleSubmit} edge="end">
                  <KeyboardReturn />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Snackbars */}
      <Snackbar
        open={showToast.challengePrompt}
        onClose={handleCancelGame}
        message={`Challenge ${challengedPlayer?.displayName}?`}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        action={[
          <Button key="challenge-yes" variant="contained" onClick={handleCreateGame}>Yes</Button>,
          <Button key="challenge-cancel" variant="outlined" onClick={handleCancelGame}>Cancel</Button>,
        ]}
      />
      <Snackbar
        open={showToast.existing}
        onClose={handleCancelGame}
        message="You have an existing game in progress."
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        action={[
          <Button key="go-to-game" variant="contained" onClick={() => navigate(`/game/${game?.id}`)}>Go to game</Button>,
          <Button key="dismiss" variant="outlined" onClick={handleCancelGame}>Dismiss</Button>,
        ]}
      />
      <Snackbar
        open={showToast.challenged}
        onClose={handleCancelGame}
        message={`You've been challenged by ${game?.player1Data?.displayName}.`}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        action={[
          <Button key="accept" variant="contained" onClick={handleAcceptGame}>Accept</Button>,
          <Button key="dismiss" variant="outlined" onClick={handleCancelGame}>Dismiss</Button>,
        ]}
      />
      <Snackbar
        open={showToast.waiting}
        onClose={() => setShowToast((t) => ({ ...t, waiting: false }))}
        message={`Waiting for ${game?.player2Data?.displayName ?? "opponent"} to accept`}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        action={<CircularProgress size={20} />}
      />
    </div>
  );
};
