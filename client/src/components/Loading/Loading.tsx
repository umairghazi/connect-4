import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export const Loading = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}