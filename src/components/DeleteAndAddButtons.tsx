import { IconButton } from "@mui/material";
import { Action } from "../interfaces/Action";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

export default function DeleteAndAddButtons(props: {
  type: string;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <>
      <IconButton
        sx={{ color: "#212121" }}
        onClick={(e) => {
          e.preventDefault();
          props.dispatch({ type: "delete" + props.type });
        }}
      >
        <RemoveCircleOutlineIcon />
      </IconButton>
      <IconButton
        sx={{ color: "#212121" }}
        onClick={(e) => {
          e.preventDefault();
          props.dispatch({ type: "add" + props.type });
        }}
      >
        <AddCircleOutlineRoundedIcon />
      </IconButton>
    </>
  );
}
