import React from "react";

import { Box, Grid, Typography } from "@mui/material";

function HomePage() {
  return (
    <Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident
          similique sunt quod consequuntur quis omnis quisquam sed eum impedit
          soluta sint laborum, deleniti praesentium! Nobis iusto eligendi a
          quas? Assumenda?
        </Typography>
      </Grid>
    </Box>
  );
}

export default HomePage;
