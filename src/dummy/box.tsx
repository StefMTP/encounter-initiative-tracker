import { Grid, Paper } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material";
import { Box } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const darkTheme = createTheme({ palette: { mode: "dark" } });

const BoxDummy = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid spacing={2}>
        <Grid item md={"auto"}>
          <ThemeProvider theme={darkTheme}>
            <Box
              sx={{
                p: 2,
                bgcolor: "background.default",
                display: "grid",
                gap: 3,
              }}
            >
              <Item elevation={1}>Character 1</Item>
              <Item elevation={4}>Character 2</Item>
              <Item elevation={8}>Character 3</Item>
            </Box>
          </ThemeProvider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BoxDummy;
