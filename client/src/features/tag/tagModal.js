import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTag, fetchTags, deleteTag } from "./tagSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";


export default function TagModal({ open, handleClose, title, onNewTag }) {
  const [tagName, setTagName] = React.useState("");
  const tags = useSelector((state) => state.tag.tags);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteTag(id));
    dispatch(fetchTags());
  };

  const handleOnClick = (tagName) => {
    setTagName(tagName);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const existingTag = tags.find(tag => tag.name === tagName);
    if (existingTag) {
      onNewTag(existingTag); // Call the callback function with the existing tag
      setTagName("");
      handleClose();
    } else {
      const newTag = { name: tagName };
      dispatch(createTag(newTag))
        .then((response) => {
          const update = response.payload
          onNewTag(update); // Call the callback function with the new tag
          setTagName("");
          handleClose();
        })
        .catch(error => {
          console.error("Failed to create tag:", error);
        });
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
        <Box display="flex" flexWrap="wrap" gap={1} p={1} m={1}>
          {tags.map((tag) => (
            <Chip key={tag._id} label={tag.name} color="primary" onDelete={() => handleDelete(tag._id)} onClick={() => handleOnClick(tag.name)} />
          ))}
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Tag</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
