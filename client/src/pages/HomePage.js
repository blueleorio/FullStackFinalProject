import React from "react";
import useAuth from "../hooks/useAuth";

import { Box, Grid, Typography, Card, Container } from "@mui/material";

function HomePage() {
  const { user } = useAuth();

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6">About Me</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                fringilla, augue nec dapibus tincidunt, magna felis ultricies
                tortor, et scelerisque felis nunc sit amet erat. Sed nec
                scelerisque purus. Donec quis urna ut sapien ultricies
                sollicitudin. Nullam nec sapien at turpis ultricies ultrices.
                Nullam nec sapien at turpis ultricies ultrices.
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
