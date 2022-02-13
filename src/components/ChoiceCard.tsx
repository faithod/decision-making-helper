import { AttributeElement } from "../interfaces/AttributeElement";
import { Action } from "../interfaces/Action";
import { ChoiceValuesElement } from "../interfaces/ChoiceValuesElement";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { StyledComponent } from "@emotion/styled";
import { PaperClasses, SxProps } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function ChoiceCard(props: {
  choiceIndex: number;
  attributes: AttributeElement[];
  choice: ChoiceValuesElement;
  dispatch: React.Dispatch<Action>;
  Item: StyledComponent<{
    children?: React.ReactNode;
    classes?: Partial<PaperClasses> | undefined;
    elevation?: number | undefined;
    square?: boolean | undefined;
    sx?: SxProps<any> | undefined;
  }>;
}) {
  return (
    <>
      <Grid item xs={4}>
        <props.Item sx={{ bgcolor: "#f3e5f5", m: 1 }}>
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
        </props.Item>
      </Grid>
    </>
  );
}
