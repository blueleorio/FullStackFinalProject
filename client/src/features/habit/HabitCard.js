import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const HabitCard = ({ habit }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {habit.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {habit.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HabitCard;
