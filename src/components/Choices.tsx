import { Action } from "../interfaces/Action";
import { ChoiceValuesElement } from "../interfaces/ChoiceValuesElement";
import DeleteAndAddButtons from "./DeleteAndAddButtons";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Item } from "../Item";

export default function Choices(props: {
  choices: ChoiceValuesElement[];
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <Grid item xs={12}>
      <Item sx={{ bgcolor: "#ede7f6" }}>
        <form>
          <fieldset>
            <legend>choices:</legend>
            {props.choices.map((el: ChoiceValuesElement, i: number) => (
              <>
                <TextField
                  size="small"
                  sx={{ m: 1 }}
                  key={i}
                  type="text"
                  value={typeof el.choiceName === "string" ? el.choiceName : ""}
                  onChange={(e) =>
                    props.dispatch({
                      type: "insertChoice",
                      value: e.target.value,
                      index: i,
                    })
                  }
                ></TextField>
              </>
            ))}
            <DeleteAndAddButtons type={"Choice"} dispatch={props.dispatch} />
          </fieldset>
        </form>
      </Item>
    </Grid>
  );
}
