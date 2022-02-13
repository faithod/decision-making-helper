import { AttributeElement } from "../interfaces/AttributeElement";
import { Action } from "../interfaces/Action";
import { ChoiceValuesElement } from "../interfaces/ChoiceValuesElement";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { Item } from "../Item";

export default function ChoiceCard(props: {
  choiceIndex: number;
  attributes: AttributeElement[];
  choice: ChoiceValuesElement;
  dispatch: React.Dispatch<Action>;
}) {
  return (
    <>
      <Grid item xs={4}>
        <Item sx={{ bgcolor: "#fce9ef", m: 1 }}>
          <h3>
            {typeof props.choice.choiceName === "string"
              ? props.choice.choiceName
              : ""}
          </h3>
          {props.attributes.map((el, i) => (
            <div key={i}>
              <label htmlFor="attribute-scores">
                {typeof el.attributeName === "string" ? el.attributeName : ""}
              </label>

              <FormControl>
                <Select
                  size="small"
                  sx={{ mt: 1 }}
                  id="attribute-scores"
                  onChange={(e) =>
                    props.dispatch({
                      type: "insertRating",
                      value: e.target.value,
                      index: props.choiceIndex,
                      attributeIndex: i,
                    })
                  }
                >
                  <MenuItem value="">select one</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                </Select>
              </FormControl>
            </div>
          ))}
          <p>Score: {props.choice.score}</p>
        </Item>
      </Grid>
    </>
  );
}
