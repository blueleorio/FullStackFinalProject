import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTag, fetchTags } from "./tagSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function TagModal({ open, handleClose, title, description }) {
  const [tagName, setTagName] = React.useState("");
  const tags = useSelector((state) => state.tag.tags);
  console.log("🚀 ~ TagModal ~ tags:", tags);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchTags());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (tagName) {
      dispatch(createTag({ name: tagName }));
      setTagName("");
      handleClose();
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="tagName"
            label="Tag Name"
            type="text"
            fullWidth
            variant="standard"
            value={tagName}
            onChange={(event) => setTagName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Tag</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
