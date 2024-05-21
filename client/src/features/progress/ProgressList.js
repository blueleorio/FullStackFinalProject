import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

function ProgressList({ progresses }) {
  return (
    <List>
      {progresses.map((progress) => (
        <ListItem key={progress._id}>
          <ListItemText
            primary={`Date: ${new Date(progress.date).toLocaleDateString()}`}
            secondary={`Status: ${progress.status}`}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default ProgressList;
