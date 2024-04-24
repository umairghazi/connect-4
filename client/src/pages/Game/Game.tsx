import { useSubscription } from "@apollo/client";
import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { GET_CHAT_MESSAGES, MESSAGE_SUBSCRIPTION, useGetChatMessagesQuery, useGetGame, usePostLobbyChatMessageMutation } from "../../api";
import { ChatMessages, Header } from "../../components";

import "./Game.css";
import { deserializeBoard } from "../../utils/game.utils";

export const Game = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { id } = useParams();

  // const [postChatMessage, { loading: postChatMsgLoading, error: postChatMsgErr }] = usePostChatMessageMutation()
  // const { data: chatMessagesResp } = useGetChatMessagesQuery()
  const [getGame, { data: gameData }] = useGetGame();

  const board: string[][] = deserializeBoard(gameData?.getGame?.gameState ?? "") ?? [];
  console.log('board', board);
  
  const handleDropPiece = (col: number) => {
    const newBoard = [...board];
    for (let i = board.length - 1; i >= 0; i--) {
      if (!newBoard[i][col]) {
        newBoard[i][col] = 'R'; // Assume it's player 1's turn, so dropping a red circle
        break;
      }
    }
    // setBoard(newBoard);
  };

  // const serializedBoard = board.map(row => row.join('-')).join('|');

  useEffect(() => {
    if (!id) return;
    getGame({ variables: { gameId: id } });
  }, [getGame, id])

  console.log('gameData', gameData);


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

  const renderBoard = () => {
    return (
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="cell" onClick={() => handleDropPiece(colIndex)}>
                {cell === 'R' && <div className="red-piece" />}
                {cell === 'B' && <div className="blue-piece" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="wrapper">
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <div className="chat" ref={messagesEndRef}>
          <Typography variant="h4" gutterBottom>Game</Typography>
          <ChatMessages messages={[]} />
          <div className="game">
            {renderBoard()}
          </div>
        </div>
      </div>
    </div>
  );
};
