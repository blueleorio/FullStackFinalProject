import React from "react";

import {
  Box,
  Card,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

function HomePage() {
  return (
    <Container>
      <Grid container spacing={3}>
        <Typography variant="h3" component="h1" gutterBottom>
          Home Page
        </Typography>
      </Grid>
    </Container>
  );
}

export default HomePage;
