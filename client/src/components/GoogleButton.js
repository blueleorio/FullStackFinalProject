import { Button } from "@mui/material";
import gLogo from "../g-logo.png";
const googleButton = ({ onClick }) => {
  return (
    <Button
      fullWidth
      size="large"
      onClick={onClick}
      variant="outlined"
      sx={{
        "&:hover": {
          cursor: "pointer",
          transform: "scale(1.05)",
        },
        boxShadow: "0 2px 4px 0 rgba(0,0,0,.25)",
        transition: "transform 0.3s ease-in-out",
      }}
      startIcon={<img src={gLogo} alt="Google logo" width="24" height="24" />}
    >
      Log In with Google
    </Button>
  );
};
export default googleButton;
