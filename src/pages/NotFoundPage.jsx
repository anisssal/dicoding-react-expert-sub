import {Icon} from "@iconify/react";
import {Box, Typography} from "@mui/material";

function NotFoundPage() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
        <Icon icon="tabler:error-404" width="15%" height="15%"/>
      <Typography variant="body1">
          Oops - Halaman tidak ditemukan
      </Typography>
    </Box>
  );
}

export default NotFoundPage;
