import DecisionMaker from "./components/DecisionMaker";
import CssBaseline from "@mui/material/CssBaseline"; //might remove
import { Container, ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";

function App(): JSX.Element {
  const theme = createTheme({
    typography: {
      h3: {
        fontFamily: '"Segoe UI Symbol"',
      },
    },
  });

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ textAlign: "center", mt: "3rem" }}>
          <Typography variant="h3" component="h1">
            Decision Making Helper
          </Typography>
          <DecisionMaker />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
