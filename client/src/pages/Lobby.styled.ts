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

export const ChatPanel = styled(Paper)(() => ({
  flex: 2,
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
}));

export const ParticipantsPanel = styled(Paper)(() => ({
  flex: 1,
  padding: 24,
  overflowY: 'auto',
}));

export const ToastPaperStyles = {
  backgroundColor: 'background.paper',
  color: 'text.primary',
  borderRadius: 2,
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
};
