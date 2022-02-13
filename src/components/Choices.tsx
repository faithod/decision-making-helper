import { Action } from "../interfaces/Action";
import { ChoiceValuesElement } from "../interfaces/ChoiceValuesElement";
import DeleteAndAddButtons from "./DeleteAndAddButtons";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";

export default function Choices(props: {
  choices: ChoiceValuesElement[];
  dispatch: React.Dispatch<Action>;
  Item: any;
}) {
  return (
    <Grid item xs={12}>
      <props.Item sx={{ bgcolor: "#f3e5f5" }}>
        <form>
          <fieldset>
            <legend>choices:</legend>
            {props.choices.map((el: ChoiceValuesElement, i: number) => (
              <input
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
              ></input>
            ))}
            <DeleteAndAddButtons type={"Choice"} dispatch={props.dispatch} />
          </fieldset>
        </form>
      </props.Item>
    </Grid>
  );
}
