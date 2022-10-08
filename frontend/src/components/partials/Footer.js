import React from "react";
import { Stack, Typography, Paper } from "@mui/material";

const Footer = () => {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      component="footer"
      elevation={4}
    >
      <Stack alignItems="center" spacing={1} sx={{ mt: 2, mb: 2 }}>
        <Typography>Mern-kesäkurssi 2022, Savonia AMK</Typography>
        <Typography>© Tekijä: Heikki Anttonen</Typography>
      </Stack>
    </Paper>
  );
};
export default Footer;
