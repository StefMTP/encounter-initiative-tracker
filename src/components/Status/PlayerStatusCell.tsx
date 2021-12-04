import { TableCell, TextField, IconButton } from "@mui/material";

const PlayerStatusCell = ({
  fieldFill,
  fieldInput,
  playerStatusId,
  playerStatusField,
  playerStatusFieldEditHandler,
  setFieldFillHandler,
  setFieldInputHandler,
  icon,
}: {
  fieldFill: boolean;
  fieldInput: string;
  playerStatusId: string;
  playerStatusField: string;
  playerStatusFieldEditHandler: (
    playerStatusId: string,
    fieldInput: string
  ) => void;
  setFieldFillHandler: React.Dispatch<React.SetStateAction<boolean>>
  setFieldInputHandler: React.Dispatch<React.SetStateAction<string>>
  icon: React.ReactNode;
}) => {
  return (
    <TableCell>
      {fieldFill ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            playerStatusFieldEditHandler(playerStatusId, fieldInput);
            setFieldFillHandler(false);
          }}
        >
          <TextField
            type="text"
            variant="standard"
            size="small"
            onChange={(e) => {
                setFieldInputHandler(e.target.value);
            }}
          />
        </form>
      ) : (
        <>
          {playerStatusField}
          <IconButton size="small" onClick={() => setFieldFillHandler(!fieldFill)}>
            {icon}
          </IconButton>
        </>
      )}
    </TableCell>
  );
};

export default PlayerStatusCell;
