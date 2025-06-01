import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
  padding: '16px 32px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  zIndex: 10,
  marginBottom: '16px',
}));

export const Content = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  gap: 24,
  padding: 24,
  overflowY: 'auto',
}));

export const GamePanel = styled(Paper)(() => ({
  flex: 2,
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  overflowY: 'auto',
}));

export const ChatPanel = styled(Paper)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

export const ChatMessagesBox = styled(Box)(() => ({
  flex: 1,
  overflowY: 'auto',
  paddingRight: 8,
}));

export const ChatInputWrapper = styled(Box)(() => ({
  marginTop: 8,
  // borderTop: '1px solid #ccc',
  paddingTop: 8,
}));

export const GameOverBox = styled(Box)(({ theme }) => ({
  padding: 16,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 8,
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
  textAlign: 'center',
}));
