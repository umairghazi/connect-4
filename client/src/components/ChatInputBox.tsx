import { styled } from '@mui/material/styles';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { KeyboardReturn } from '@mui/icons-material';

export const StyledChatInputBox = styled(Box)(({ theme }) => ({
  padding: '16px 24px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.04)',
  position: 'sticky',
  bottom: 0,
  width: '100%',
  zIndex: 100,
}));

export interface ChatInputBoxProps {
  chatText: string;
  setChatText: (text: string) => void;
  sendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const ChatInputBox = (props: ChatInputBoxProps) => {
  const { chatText, setChatText, sendMessage, handleKeyDown } = props;
  return (
     <StyledChatInputBox>
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
      </StyledChatInputBox>
  )
}