import { Button } from "@mui/material";
const googleButton = ({ onClick }) => {
  return (
    <Button
      fullWidth
      size="large"
      onClick={onClick}
      sx={{
        backgroundColor: "#4285F4",
        color: "white",
        "&:hover": {
          backgroundColor: "#2F83CD",
          transform: "scale(1.05)", // Add scale transformation on hover
        },
        boxShadow: "0 2px 4px 0 rgba(0,0,0,.25)",
        transition: "transform 0.3s ease-in-out", // Add transition for smooth animation
      }}
    >
      Log In with Google
    </Button>
  );
};
export default googleButton;
