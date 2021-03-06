import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold",
    },
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold",
      },
    },
  },
  palette: {
    primary: { main: "#3A8DFF", hover: "#1C69D4" },
    secondary: { main: "#B0B0B0" },
    scrollBar: {
      track: "#F5F5F5",
      thumb: "#CCC",
      thumbHover: "#999",
    },
  },
});
