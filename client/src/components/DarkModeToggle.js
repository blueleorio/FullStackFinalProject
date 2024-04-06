import IconButton from "@mui/material/IconButton";
import EmojiObjectsTwoToneIcon from "@mui/icons-material/EmojiObjectsTwoTone";

function DarkModeToggle({ colorMode, Mode }) {
  return (
    <IconButton
      onClick={colorMode.toggleColorMode}
      color="inherit"
      sx={{
        "&:hover": {
          boxShadow: `0px 0px 107px 18px ${
            Mode === "light" ? "rgba(255,46,248,1)" : "rgba(45,255,196,1)"
          }`,
          transform: "scale(1.05)",
        },
        transition: "transform 0.3s ease-in-out", // Add transition for smooth animation
      }}
    >
      <EmojiObjectsTwoToneIcon fontSize="large" />
    </IconButton>
  );
}

export default DarkModeToggle;
