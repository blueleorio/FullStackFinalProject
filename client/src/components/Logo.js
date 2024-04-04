import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import logoImgLight from "../logo-light.png";
import logoImgDark from "../logo-dark.png";
import { useTheme } from "@mui/material/styles";

function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();
  let Mode = theme.palette.mode;
  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img
        src={Mode === "light" ? logoImgLight : logoImgDark}
        alt="logo"
        width="100%"
      />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
