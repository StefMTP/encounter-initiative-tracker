import {
  Dialog,
  DialogTitle,
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";

const BulkRemoveDialog = ({
  open,
  openSetter,
  closeHandler,
  contextClearer,
  dialogMessage,
}: {
  open: boolean;
  openSetter: React.Dispatch<React.SetStateAction<boolean>>;
  closeHandler: () => void;
  contextClearer: () => void;
  dialogMessage: string;
}) => {
  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>WARNING!</DialogTitle>
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "background.paper",
          p: 3,
        }}
      >
        <Typography variant="h6" textAlign="center">
          {dialogMessage}
        </Typography>
        <Grid container sx={{ mt: 3 }} justifyContent="space-evenly">
          <Grid item>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                contextClearer();
              }}
            >
              Yes
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="info"
              onClick={() => openSetter(false)}
            >
              No
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default BulkRemoveDialog;
