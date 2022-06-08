import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const theme = createTheme({
   palette: {
       primary: {
           main: "#e5f2e4",
           contrastText: "#FFFFFF"
       },
       secondary: {
           main: "#c8d6c4",
           contrastText: "#FFFFFF"
       },
       background: {
           default: "#c5d6c4"
       },
       type: "dark"
   }
});

const App = (props) => {
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>

              {props.children}

      </ThemeProvider>
  );
}

export default App;
