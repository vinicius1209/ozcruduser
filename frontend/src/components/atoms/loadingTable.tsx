import { Box, Skeleton } from "@mui/material";

export function LoadingTable() {
  return (
    <Box sx={{ width: "100%" }}>
      <Skeleton animation="wave" variant="rectangular" sx={{ mb: 2 }} />
      <Skeleton animation="wave" variant="rectangular" sx={{ mb: 2 }}/>
      <Skeleton animation="wave" variant="rectangular" sx={{ mb: 2 }}/>
    </Box>
  );
}
