import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
const ConfirmationDialog = ({
  open,
  handleClose,
  onConfirm,
  confirmMessage,
  confirmKeyword,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    if (inputValue === confirmKeyword) {
      onConfirm();
      handleClose();
    } else {
      alert(`Please type ${confirmKeyword} to confirm`);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirm Operation"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {confirmMessage.map((line, index) => (
            <Typography key={index} component="span">
              {line
                .split("Okie")
                .map((part, partIndex) =>
                  partIndex > 0
                    ? [<strong key={partIndex}>Okie</strong>, part]
                    : part
                )}
              <br />
            </Typography>
          ))}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Type Okie in this textfield"
          type="text"
          fullWidth
          variant="standard"
          value={inputValue}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
