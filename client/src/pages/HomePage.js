import React, { useState } from "react";

import { Container, Grid, Typography, Tab, Tabs } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";

function HomePage() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Home Page
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab icon={<PhoneIcon />} label="SLACKER" />
          <Tab icon={<FavoriteIcon />} label="DOER" />
          <Tab icon={<PersonPinIcon />} label="HARDER" />
        </Tabs>
      </Grid>
    </Container>
  );
}

export default HomePage;
